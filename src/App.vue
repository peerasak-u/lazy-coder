<template>
  <div
    class="min-h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:w-5/6 mx-auto w-full">
      <div class="bg-gray-800 shadow-xl sm:rounded-3xl px-4 py-10">
        <h1 class="text-4xl ml-4 lazy-font mb-6">Lazy Coder ..zzZZ</h1>

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
import SourceCodeSection from "./components/SourceCodeSection.vue";
import TaskSection from "./components/TaskSection.vue";
import SpecialistSection from "./components/SpecialistSection.vue";
import FinalPromptSection from "./components/FinalPromptSection.vue";

export default {
  components: {
    SourceCodeSection,
    TaskSection,
    SpecialistSection,
    FinalPromptSection,
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
};
</script>
