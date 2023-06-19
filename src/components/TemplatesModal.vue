<template>
  <transition name="fade" appear>
    <div
      v-if="modalVisible"
      class="fixed inset-0 flex items-center justify-center z-50 max-h-screen"
      :style="modalBackgroundStyle"
    >
      <div class="bg-gray-800 p-6 rounded-md shadow-lg w-full max-w-lg">
        <h2 class="text-xl font-bold mb-4">Load Template</h2>
        <ul class="mb-4">
          <li
            v-for="(template, index) in templates"
            :key="index"
            class="bg-gray-900 p-2 mb-2 rounded cursor-pointer"
            @click="selectTemplate(template)"
          >
            <div class="flex flex-row justify-between">
              <h3 class="font-bold">{{ template.title }}</h3>
              <button
                @click.stop="removeTemplate(index)"
                class="bg-red-800 hover:bg-red-900 text-xs text-white py-1 px-2 rounded"
              >
                Remove
              </button>
            </div>

            <p>{{ template.description }}</p>
          </li>
        </ul>
        <button
          @click="cancel"
          class="bg-red-800 hover:bg-red-900 text-white py-1 px-4 rounded"
        >
          Cancel
        </button>
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
      templates: JSON.parse(localStorage.getItem("templates")) || [],
    };
  },
  beforeMount() {
    window.addEventListener("storage", this.updateTemplatesFromLocalStorage);
  },
  beforeDestroy() {
    window.removeEventListener("storage", this.updateTemplatesFromLocalStorage);
  },
  watch: {
    modalVisible(visible) {
      if (visible) {
        this.templates = JSON.parse(localStorage.getItem("templates")) || [];
      }
    },
  },
  methods: {
    updateTemplatesFromLocalStorage(event) {
      if (event.key === "templates") {
        this.templates = JSON.parse(event.newValue) || [];
      }
    },
    showModal() {
      this.modalVisible = true;
    },
    hideModal() {
      this.modalVisible = false;
    },
    selectTemplate(template) {
      this.$emit("template-selected", template);
      this.hideModal();
    },
    removeTemplate(index) {
      this.templates.splice(index, 1);
      localStorage.setItem("templates", JSON.stringify(this.templates));
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
