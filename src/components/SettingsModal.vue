<template>
  <transition name="fade" appear>
    <div
      v-if="modalVisible"
      class="fixed inset-0 flex items-center justify-center z-50"
      :style="modalBackgroundStyle"
    >
      <div class="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Settings</h2>
        <label for="title" class="block text-sm font-medium mb-2"
          >OpenAI API Key:</label
        >
        <input
          id="title"
          v-model="apiToken"
          class="w-full bg-gray-900 text-gray-400 p-2 mb-4 border border-gray-600 rounded"
        />

        <div class="flex flex-row mt-4">
          <button
            @click="cancel"
            class="bg-red-800 hover:bg-red-900 text-white py-2 px-4 rounded flex-auto mr-2"
          >
            Cancel
          </button>
          <button
            @click="confirm"
            class="bg-green-800 hover:bg-green-900 text-white py-2 px-4 rounded flex-auto ml-2"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      modalVisible: false,
      modalBackgroundStyle: {
        background: "rgba(0, 0, 0, 0.5)",
      },
      apiToken: "",
    };
  },
  methods: {
    showModal() {
      this.apiToken = localStorage.getItem("api_token") || "";
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
    },
    confirm() {
      this.$emit("save-settings", this.apiToken);
      this.hideModal();
    },
    cancel() {
      this.hideModal();
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
