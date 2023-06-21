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
      </div>
    </nav>
    <!-- End Navbar -->

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
import imageUrl from "../assets/logo.svg";
</script>
