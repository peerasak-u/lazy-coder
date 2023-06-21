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
        'Note: every code block should define language type. e.g. ```swift\nprint("Hello World")\n``` if it vue should be use "javascript"\n\n\n';

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
