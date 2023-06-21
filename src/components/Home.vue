<template>
  <div
    class="bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12"
  >
    <!-- Navbar -->
    <nav class="fixed top-0 left-0 w-full bg-gray-800 shadow-xl z-10">
      <div class="w-full px-10 py-3 flex items-center justify-between">
        <div class="flex items-center">
          <img :src="imageUrl" class="h-16" />
          <h1 class="text-4xl font-bold lazy-font">Lazy Coder</h1>
        </div>
        <div class="flex flex-row gap-2">
          <button
            @click="loadTemplate"
            class="bg-gray-700 text-white text-sm px-2 py-2 rounded"
          >
            📦 Template
          </button>
          <templates-modal
            ref="templatesModal"
            @template-selected="onTemplateSelected"
          ></templates-modal>
          <button
            @click="showSaveTemplateModal"
            class="bg-gray-700 text-white text-sm px-2 py-2 rounded"
          >
            💾 Save
          </button>
          <save-template-modal
            ref="saveTemplateModal"
            @save-template="saveTemplate"
          ></save-template-modal>
          <button
            @click="showSettingsModal"
            class="bg-gray-700 text-white text-sm px-2 py-2 rounded"
          >
            ⚙️ Settings
          </button>
          <settings-modal
            ref="settingsModal"
            @save-settings="saveSettings"
          ></settings-modal>
        </div>
      </div>
    </nav>
    <!-- End Navbar -->

    <div
      class="sm:w-5/6 mx-auto w-full bg-yellow-300 p-4 text-black rounded-xl mt-20"
    >
      <div class="text-yellow-950 font-bold mb-2">
        📣 Attention Lazy Coders!
      </div>
      <div class="text-yellow-950">
        Your precious source code is safe with us. We're too lazy to even think
        about storing or connecting it to any database. All the magic happens
        client-side, so code away worry-free! 🛌💤
      </div>
    </div>

    <div class="relative py-3 sm:w-5/6 mx-auto w-full mt-4">
      <div class="bg-gray-800 shadow-xl sm:rounded-3xl px-4 py-10">
        <div class="flex flex-col h-full px-4">
          <source-code-section
            v-model="sourceCodes"
            class="mb-4"
          ></source-code-section>

          <task-section
            v-if="isEnableTaskSection"
            v-model="tasks"
            class="mb-4"
          ></task-section>

          <specialist-section
            v-if="isEnableSpecialistSection"
            v-model="selectedSpecialist"
          ></specialist-section>

          <final-prompt-section
            v-if="isEnableFinalPromptSection"
            :sourceCodes="sourceCodes"
            :tasks="tasks"
            :selectedSpecialist="selectedSpecialist"
          ></final-prompt-section>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SourceCodeSection from "./SourceCodeSection.vue";
import TaskSection from "./TaskSection.vue";
import SpecialistSection from "./SpecialistSection.vue";
import FinalPromptSection from "./FinalPromptSection.vue";
import SaveTemplateModal from "./SaveTemplateModal.vue";
import TemplatesModal from "./TemplatesModal.vue";
import SettingsModal from "./SettingsModal.vue";
import imageUrl from "../assets/logo.svg";

export default {
  components: {
    SourceCodeSection,
    TaskSection,
    SpecialistSection,
    FinalPromptSection,
    SaveTemplateModal,
    TemplatesModal,
    SettingsModal,
  },
  data() {
    return {
      sourceCodes: [],
      tasks: [],
      selectedSpecialist: "",
      imageUrl,
    };
  },
  computed: {
    isEnableTaskSection() {
      return this.sourceCodes.length > 0 || this.tasks.length > 0;
    },
    isEnableSpecialistSection() {
      return this.tasks.length > 0;
    },
    isEnableFinalPromptSection() {
      if (!this.isEnableTaskSection) return false;
      if (!this.isEnableSpecialistSection) return false;
      return this.selectedSpecialist.trim() !== "";
    },
  },
  methods: {
    loadTemplate() {
      this.$refs.templatesModal.showModal();
    },
    onTemplateSelected(template) {
      this.sourceCodes = template.sourceCodes;
      this.tasks = template.tasks;
      this.selectedSpecialist = template.selectedSpecialist;
    },
    showSaveTemplateModal() {
      this.$refs.saveTemplateModal.showModal();
    },
    showSettingsModal() {
      this.$refs.settingsModal.showModal();
    },
    saveSettings(apiToken) {
      localStorage.setItem("api_token", apiToken);
    },
  },
};
</script>
