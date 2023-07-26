<template>
  <div class="bg-gray-700 p-4 rounded-lg mb-4">
    <h2 class="text-xl font-semibold mb-2">3. Select Programmer</h2>
    <div>
      <label for="specialist" class="sr-only">Select a specialist</label>
      <p class="text-gray-300 text-sm mb-2">
        Choose a programmer who specializes in:
      </p>
      <select
        id="specialist"
        v-model="selectedSpecialist"
        @change="$emit('update:modelValue', selectedSpecialist)"
        class="w-full mb-2 px-3 py-2 text-sm leading-tight code-title text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
      >
        <option value="" disabled>Programming Language</option>
        <option value="Swift">Swift</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Kotlin">Kotlin</option>
        <option value="Python">Python</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      selectedSpecialist: this.modelValue,
    };
  },
  watch: {
    modelValue(newValue) {
      this.selectedSpecialist = newValue;
    },
  },
};
</script>
