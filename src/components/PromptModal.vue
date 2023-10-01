<template>
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
</template>

<script>
export default {
  props: {
    modalVisible: Boolean,
    modalBackgroundStyle: Object,
    systemPrompt: String,
    finalPrompt: String,
    chatgptPrompt: String,
    usedTokens: Number,
    usedUSD: Number,
    buttonText: Object,
  },
  methods: {
    showModal() {
      this.$emit("toggle-modal");
    },
    copySystemPromptToClipboard() {
      this.$emit("copy-system-prompt");
    },
    copyPromptToClipboard() {
      this.$emit("copy-prompt");
    },
    copyChatGPTPromptToClipboard() {
      this.$emit("copy-chatgpt-prompt");
    },
  },
  mounted() {
    window.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && this.modalVisible) {
        this.showModal();
      }
    });
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.showModal);
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
