<template>
  <div class="my-6">
    <h2 class="text-xl font-semibold mb-2">Tasks</h2>
    <div class="bg-gray-100 p-4 rounded-lg mb-4">
      <div v-for="(task, index) in tasks" :key="index">
        <div class="flex items-center">
          <input
            v-model="tasks[index]"
            type="text"
            class="w-full mb-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter a task"
          />
          <button
            @click="removeTask(index)"
            class="bg-red-500 text-white px-2 py-2 rounded ml-2 mb-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <button
      @click="addTask"
      class="bg-blue-500 text-white px-4 py-2 rounded w-full"
    >
      Add Task
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: {
      type: Array,
      required: true,
    },
  },
  computed: {
    tasks: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    addTask() {
      this.tasks.push("");
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>
