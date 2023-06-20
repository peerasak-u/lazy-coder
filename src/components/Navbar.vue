<template>
  <!-- Navbar -->
  <nav class="fixed top-0 left-0 w-full bg-gray-800 shadow-xl z-10">
    <div class="w-full px-10 py-3 flex items-center justify-between">
      <div class="flex items-center">
        <img src="../assets/logo.svg" class="h-16" />
        <h1 class="text-4xl font-bold lazy-font">Lazy Coder</h1>
      </div>
      <div class="flex flex-row gap-2">
        <button
          @click="$emit('load-template')"
          class="bg-gray-700 text-white text-sm px-2 py-2 rounded cursor-move"
        >
          📦 Template
        </button>
        <templates-modal
          ref="templatesModal"
          @template-selected="$emit('template-selected', $event)"
        ></templates-modal>
        <button
          @click="$emit('show-save-template-modal')"
          class="bg-gray-700 text-white text-sm px-2 py-2 rounded cursor-move"
        >
          💾 Save
        </button>
        <save-template-modal
          ref="saveTemplateModal"
          @save-template="$emit('save-template', $event)"
        ></save-template-modal>
      </div>
    </div>
  </nav>
  <!-- End Navbar -->
</template>

<script>
import SaveTemplateModal from "./SaveTemplateModal.vue";
import TemplatesModal from "./TemplatesModal.vue";

export default {
  components: {
    SaveTemplateModal,
    TemplatesModal,
  },
};
</script>
