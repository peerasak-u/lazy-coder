<template>
  <div>
    <!-- Generate Prompt -->
    <button
      @click="generateFinalPrompt"
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mr-2 rounded w-full"
    >
      Generate Prompt ✨
    </button>
    <PromptModal
      :modalVisible="modalVisible"
      :modalBackgroundStyle="modalBackgroundStyle"
      :systemPrompt="systemPrompt"
      :finalPrompt="finalPrompt"
      :chatgptPrompt="chatgptPrompt"
      :usedTokens="usedTokens"
      :usedUSD="usedUSD"
      :buttonText="buttonText"
      @toggle-modal="showModal"
      @copy-system-prompt="copySystemPromptToClipboard"
      @copy-prompt="copyPromptToClipboard"
      @copy-chatgpt-prompt="copyChatGPTPromptToClipboard"
    />
    <!-- End Generate Prompt -->
    <button
      v-if="showGetAnswerButton"
      @click="getAnswer"
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mr-2 mt-4 rounded w-full"
    >
      Get Answer ✨
    </button>
    <AnswerModal
      :modalVisible="answerModalVisible"
      :modalBackgroundStyle="modalBackgroundStyle"
      :systemPrompt="systemPrompt"
      :prompt="finalPrompt"
      @toggle-modal="showAnswerModal"
    />
  </div>
</template>

<script>
import PromptModal from "./PromptModal.vue";
import AnswerModal from "./AnswerModal.vue";
import { systemPrompt } from "./SystemPrompt.js";
import { GPTTokens } from "gpt-tokens";

export default {
  props: {
    sourceCodes: Array,
    tasks: Array,
    selectedSpecialist: String,
  },
  components: {
    PromptModal,
    AnswerModal,
  },
  data() {
    return {
      finalPrompt: "",
      chatgptPrompt: "",

      usedTokens: 0,
      usedUSD: 0,
      buttonText: {
        systemPrompt: "System Prompt",
        prompt: "Prompt",
        chatgpt: "ChatGPT",
      },
      modalVisible: false,
      answerModalVisible: false,
      modalBackgroundStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    };
  },
  computed: {
    systemPrompt() {
      return systemPrompt(this.selectedSpecialist);
    },
    showGetAnswerButton() {
      return localStorage.getItem("api_token") !== null;
    },
  },
  methods: {
    generateFinalPrompt() {
      this.updatePrompt();
      this.modalVisible = true;
    },
    getAnswer() {
      this.updatePrompt();
      this.answerModalVisible = true;
    },
    updatePrompt() {
      const mainDelimeter = "####";
      const mainDelimeterName = "hashtag";
      const codeDelimiter = "```";
      const sourceCodes = this.sourceCodes
        .map(
          (code) =>
            `${code.title}:\n${codeDelimiter}\n${code.content}\n${codeDelimiter}`
        )
        .join("\n\n\n");

      const command = "Form the source code above, do the following tasks:";
      const task = this.tasks.map((task) => `- ${task}`).join("\n");
      const note =
        'Note: don\'t forget to write a code block with the specified language name at the beginning every block, e.g. for Swift:\n ```swift\nprint("Hello World")\n```';

      this.finalPrompt = `Consider this following source codes inside quadruple ${mainDelimeterName}:\n\n${mainDelimeter}\n${sourceCodes}\n${mainDelimeter}\n\n\n${command}\n${task}\n\n\n${note}`;
      this.chatgptPrompt = `Ignore all previous instructions. ${this.systemPrompt}\n\n\n${this.finalPrompt}`;
      this.calculateTokens();
    },
    calculateTokens() {
      const usageInfo = new GPTTokens({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: this.systemPrompt,
          },
          {
            role: "user",
            content: this.finalPrompt,
          },
        ],
      });

      this.usedTokens = usageInfo.usedTokens;
      this.usedUSD = usageInfo.usedUSD;
    },
    showModal() {
      this.modalVisible = !this.modalVisible;
    },
    showAnswerModal() {
      this.answerModalVisible = !this.answerModalVisible;
    },
    async copySystemPromptToClipboard() {
      try {
        await navigator.clipboard.writeText(this.systemPrompt);
        this.showCopySuccess("systemPrompt");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
    async copyPromptToClipboard() {
      try {
        await navigator.clipboard.writeText(this.finalPrompt);
        this.showCopySuccess("prompt");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
    async copyChatGPTPromptToClipboard() {
      try {
        await navigator.clipboard.writeText(this.chatgptPrompt);
        window.open(
          "https://chat.openai.com/?model=gpt-4-code-interpreter",
          "_blank"
        );
        this.showCopySuccess("chatgpt");
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    },
    async showCopySuccess(buttonType) {
      const oldText = this.buttonText[buttonType];
      this.buttonText[buttonType] = "Prompt Copied";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.buttonText[buttonType] = oldText;
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
