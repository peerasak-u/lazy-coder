<template>
  <div
    class="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12"
  >
    <!-- Navbar -->
    <Navbar
      @load-template="loadTemplate"
      @template-selected="onTemplateSelected"
      @show-save-template-modal="showSaveTemplateModal"
      @save-template="saveTemplate"
    />
    <!-- End Navbar -->

    <div class="relative py-3 sm:w-5/6 mx-auto w-full mt-20">
      <div class="bg-gray-800 shadow-xl sm:rounded-3xl px-4 py-10">
        <!-- Main Container -->
        <div class="flex flex-col h-full">
          <!-- Source Code Section -->
          <div class="px-4">
            <source-code-section
              v-model="sourceCodes"
              class="mb-4"
            ></source-code-section>
          </div>

          <!-- Task Section -->
          <div v-if="sourceCodes.length && sourceCodesValid" class="px-4">
            <task-section v-model="tasks" class="mb-4"></task-section>
          </div>

          <!-- Specialist Section -->
          <div v-if="tasks.length && tasksValid" class="px-4">
            <specialist-section
              v-model="selectedSpecialist"
            ></specialist-section>
          </div>

          <!-- Final Prompt Section -->
          <div v-if="specialistValid" class="px-4">
            <final-prompt-section
              :sourceCodes="sourceCodes"
              :tasks="tasks"
              :selectedSpecialist="selectedSpecialist"
            ></final-prompt-section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import SourceCodeSection from "./components/SourceCodeSection.vue";
import TaskSection from "./components/TaskSection.vue";
import SpecialistSection from "./components/SpecialistSection.vue";
import FinalPromptSection from "./components/FinalPromptSection.vue";
import SaveTemplateModal from "./components/SaveTemplateModal.vue";
import TemplatesModal from "./components/TemplatesModal.vue";

export default {
  components: {
    Navbar,
    SourceCodeSection,
    TaskSection,
    SpecialistSection,
    FinalPromptSection,
    SaveTemplateModal,
    TemplatesModal,
  },
  data() {
    return {
      sourceCodes: [],
      tasks: [],
      selectedSpecialist: "",
    };
  },
  computed: {
    specialistValid() {
      return (
        this.tasksValid &&
        this.sourceCodesValid &&
        this.selectedSpecialist.trim() !== ""
      );
    },
    sourceCodesValid() {
      return this.sourceCodes.every((code) => code.title && code.content);
    },
    tasksValid() {
      return (
        this.sourceCodesValid && this.tasks.every((task) => task.trim() !== "")
      );
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
    saveTemplate(title, description) {
      const template = {
        title: title,
        description: description,
        sourceCodes: this.sourceCodes,
        tasks: this.tasks,
        selectedSpecialist: this.selectedSpecialist,
      };

      const templates = JSON.parse(localStorage.getItem("templates")) || [];
      templates.push(template);
      localStorage.setItem("templates", JSON.stringify(templates));
    },
  },
};
</script>
