<template>
  <div class="mt-8">
    <h2 class="text-xl font-bold mb-4">Final Prompt</h2>
    <div class="bg-gray-100 p-4 mt-4 rounded-md">
      <p class="text-md">
        Tokens: <span class="font-bold text-gray-700">{{ usedTokens }}</span>
      </p>
      <p class="text-md">
        Price USD:
        <span class="font-bold text-gray-700">{{ usedUSD.toFixed(6) }}</span>
      </p>
    </div>
    <div class="mt-4">
      <button
        @click="copySystemPromptToClipboard"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
      >
        {{ buttonText.systemPrompt }}
      </button>
      <button
        @click="copyPromptToClipboard"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mr-2 rounded"
      >
        {{ buttonText.prompt }}
      </button>
      <button
        @click="copyChatGPTPromptToClipboard"
        class="bg-emerald-600 hover:bg-emerald-900 text-white font-bold py-2 px-4 rounded"
      >
        {{ buttonText.chatgpt }}
      </button>
    </div>
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
          return "You are ChatGPT, a large language model trained by OpenAI. Follow the user's instructions carefully. Respond using markdown.";
      }
    },
  },
  watch: {
    sourceCodes: {
      handler() {
        this.generateFinalPrompt();
      },
      deep: true,
    },
    tasks: {
      handler() {
        this.generateFinalPrompt();
      },
      deep: true,
    },
    selectedSpecialist: {
      handler() {
        this.generateFinalPrompt();
      },
      deep: true,
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
      this.buttonText[buttonType] = "Prompt Copied";
      await new Promise((resolve) => setTimeout(resolve, 2000));
      this.buttonText[buttonType] =
        buttonType === "systemPrompt" ? "System Prompt" : "Prompt";
    },
  },
};
</script>
