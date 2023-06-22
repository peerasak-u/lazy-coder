<template>
  <div v-if="modalVisible" class="flex items-center justify-center z-50">
    <div class="mt-4 w-full">
      <h2 class="text-xl font-bold mb-4">Answer</h2>

      <div class="w-full text-slate-300">
        <div v-html="streamedTextHtml"></div>
      </div>

      <div class="flex flex-row mt-4">
        <button
          v-if="stream"
          @click="stopStreaming"
          class="bg-blue-800 hover:bg-blue-900 text-white py-2 px-4 rounded flex-auto mr-2"
        >
          Stop Streaming
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import MarkdownIt from "markdown-it";
import MarkdownItPrism from "markdown-it-prism";
import "prismjs/themes/prism-tomorrow.css";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
}).use(MarkdownItPrism);

export default {
  props: {
    modalVisible: Boolean,
    modalBackgroundStyle: Object,
    systemPrompt: String,
    prompt: String,
  },
  data() {
    return {
      streamedText: "",
      stream: null,
    };
  },
  computed: {
    streamedTextHtml() {
      return md.render(this.streamedText);
    },
  },
  watch: {
    modalVisible(newVal) {
      if (newVal) {
        this.startStreaming();
      } else {
        this.stopStreaming();
      }
    },
  },
  methods: {
    showModal() {
      this.$emit("toggle-modal");
    },
    async startStreaming() {
      const apiToken = localStorage.getItem("api_token");
      const model = localStorage.getItem("model");
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiToken}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [
              { role: "system", content: this.systemPrompt },
              { role: "user", content: this.prompt },
            ],
            temperature: 0,
            stream: true,
          }),
        }
      );

      if (!response.ok) {
        console.error("Error: failed to fetch data");
        return;
      }

      const reader = response.body?.getReader();
      if (!reader) {
        console.error("Error: failed to read data from response");
        return;
      }

      this.stream = reader;

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        const textDecoder = new TextDecoder("utf-8");
        const chunk = textDecoder.decode(value);

        let deltaText = "";
        for (const line of chunk.split("\n")) {
          const trimmedLine = line.trim();
          if (!trimmedLine || trimmedLine === "data: [DONE]") {
            continue;
          }

          const json = trimmedLine.replace("data: ", "");
          const obj = JSON.parse(json);

          if (obj.choices[0].finish_reason === "stop") {
            this.stopStreaming();
            console.log("Stream finished");
            console.log("Streamed text:", this.streamedText);
            return;
          }

          const content = obj.choices[0].delta.content;
          deltaText = deltaText.concat(content);
        }

        this.streamedText += deltaText;
      }
    },
    stopStreaming() {
      if (this.stream) {
        this.stream.cancel();
        this.stream = null;
      }
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
