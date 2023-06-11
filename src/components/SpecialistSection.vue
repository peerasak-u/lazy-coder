<template>
  <div class="my-4">
    <h2 class="text-xl font-semibold mb-2">Specialist</h2>
    <div>
      <label for="specialist" class="sr-only">Select a specialist</label>
      <select
        id="specialist"
        v-model="selectedSpecialist"
        @change="$emit('update:modelValue', selectedSpecialist)"
        class="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-md font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
      >
        <option value="" disabled>Choose your master</option>
        <option value="Swift">Swift</option>
        <option value="JavaScript">JavaScript</option>
        <option value="Kotlin">Kotlin</option>
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
