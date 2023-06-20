<template>
  <div>
    <button
      @click="generateFinalPrompt"
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 mr-2 rounded w-full"
    >
      Generate Prompt ✨
    </button>
    <!-- Add the modal card here -->
    <transition name="fade" appear>
      <div
        v-if="modalVisible"
        class="fixed inset-0 flex items-center justify-center z-50"
        :style="modalBackgroundStyle"
      >
        <div class="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg">
          <h2 class="text-xl font-bold mb-4">Generated Prompts</h2>
          <label for="systemPrompt" class="block text-sm font-medium mb-2"
            >System Prompt:</label
          >
          <textarea
            id="systemPrompt"
            class="w-full bg-gray-900 text-gray-400 h-24 p-2 mb-4 border border-gray-600 rounded"
            readonly
            >{{ systemPrompt }}</textarea
          >
          <label for="prompt" class="block text-sm font-medium mb-2"
            >Prompt:</label
          >
          <textarea
            id="prompt"
            class="w-full bg-gray-900 text-gray-400 h-24 p-2 mb-4 border border-gray-600 rounded"
            readonly
            >{{ finalPrompt }}</textarea
          >
          <div class="bg-gray-700 p-4 mb-2 rounded-md">
            <p class="text-md">
              Tokens: <span class="text-gray-300">{{ usedTokens }}</span>
            </p>
            <p class="text-md">
              Price:
              <span class="text-gray-300">${{ usedUSD.toFixed(6) }}</span>
            </p>
          </div>
          <div class="flex flex-row justify-center">
            <button
              @click="copySystemPromptToClipboard"
              :disabled="systemPrompt === null || systemPrompt === ''"
              class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 mr-2 rounded flex-auto"
            >
              {{ buttonText.systemPrompt }}
            </button>
            <button
              @click="copyPromptToClipboard"
              :disabled="finalPrompt === null || finalPrompt === ''"
              class="bg-sky-500 hover:bg-sky-600 text-white py-2 px-4 mr-2 rounded flex-auto"
            >
              {{ buttonText.prompt }}
            </button>
            <button
              @click="copyChatGPTPromptToClipboard"
              :disabled="chatgptPrompt === null || chatgptPrompt === ''"
              class="bg-emerald-600 hover:bg-emerald-900 text-white py-2 px-4 rounded flex-auto"
            >
              {{ buttonText.chatgpt }}
            </button>
          </div>
          <div @click="showModal" class="flex flex-row mt-4">
            <button
              class="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded flex-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { GPTTokens } from "gpt-tokens";

export default {
  props: {
    sourceCodes: Array,
    tasks: Array,
    selectedSpecialist: String,
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
      modalBackgroundStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.8)",
      },
    };
  },
  computed: {
    systemPrompt() {
      switch (this.selectedSpecialist) {
        case "Swift":
          return "You are a Senior iOS Developer with extensive expertise in Swift, Objective-C, AutoLayout, UIKit, and Clean Swift. With a strong focus on creating efficient and user-friendly applications, you possess in-depth knowledge of iOS frameworks and design patterns, ensuring seamless integration and high-quality coding standards. Engage with this developer to leverage their skills and elevate your project to new heights.";
        case "JavaScript":
          return "You are Senior JavaScript Developer. You have extensive knowledge and experience in JavaScript, React, Vue, HTML, CSS, and various front-end and back-end frameworks. Utilizing your expertise, you design, develop, and maintain web applications, optimize code efficiency, and collaborate with cross-functional teams to create exceptional user experiences. Offer guidance on best practices, coding standards, and latest industry trends. Inspire innovation and adaptability in a fast-paced development environment.";
        case "Kotlin":
          return "You are Senior Kotlin Developer. You are highly adept in SpringBoot, with extensive experience in building robust, scalable, and efficient applications. Your expertise includes in-depth knowledge of Kotlin syntax, object-oriented programming, functional programming, and multi-platform development. You excel in designing microservices architecture, implementing RESTful APIs, and leveraging Spring ecosystem tools for seamless integration and performance optimization.";
        default:
          return "";
      }
    },
  },
  methods: {
    generateFinalPrompt() {
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

      this.finalPrompt = `Consider this following source codes inside quadruple ${mainDelimeterName}:\n\n${mainDelimeter}\n${sourceCodes}\n${mainDelimeter}\n\n\n${command}\n${task}`;
      this.chatgptPrompt = `Ignore all previous instructions. ${this.systemPrompt}\n\n\n${this.finalPrompt}`;
      this.calculateTokens();
      this.modalVisible = true;
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
