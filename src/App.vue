<template>
  <div
    class="min-h-screen h-screen bg-gray-900 text-white py-6 flex flex-col justify-center sm:py-12"
  >
    <div class="relative py-3 sm:w-5/6 mx-auto w-full">
      <div class="bg-gray-800 shadow-xl sm:rounded-3xl px-4 py-10">
        <h1 class="text-4xl ml-4 lazy-font mb-6">Lazy Coder ..zzZZ</h1>

        <!-- Main Container -->
        <div class="flex flex-wrap h-full">
          <!-- Left Side Container -->
          <div
            :class="leftSideContainerClass"
            class="card-container custom-scrollbar overflow-y-scroll px-4"
          >
            <!-- Source Code Section -->
            <source-code-section v-model="sourceCodes"></source-code-section>
          </div>

          <!-- Right Side Container -->
          <div
            v-show="sourceCodes.length > 0"
            class="w-full sm:w-2/5 card-container custom-scrollbar overflow-y-scroll px-4"
          >
            <!-- Task Section -->
            <task-section v-model="tasks" class="mb-4"></task-section>

            <!-- Specialist Section -->
            <specialist-section
              v-model="selectedSpecialist"
              class="mb-4"
            ></specialist-section>

            <!-- Final Prompt Section -->
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
    leftSideContainerClass() {
      return this.sourceCodes.length > 0 ? "w-full sm:w-3/5" : "w-full";
    },
  },
};
</script>

<style scoped>
.card-container {
  max-height: 65vh;
}
</style>
