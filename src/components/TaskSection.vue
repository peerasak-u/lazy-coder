<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Tasks</h2>
    <div v-if="tasks.length > 0" class="bg-gray-100 p-4 rounded-lg mb-4">
      <div v-for="(task, index) in tasks" :key="index">
        <div class="flex items-center">
          <!-- when user press enter should be call function "addTask"  -->
          <input
            v-model="tasks[index]"
            type="text"
            class="w-full mb-2 px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter a task"
            @keyup.enter="addTask"
          />
          <button
            @click="removeTask(index)"
            class="bg-red-500 text-white px-2 py-1 rounded ml-2 mb-2"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <p class="text-md text-gray-700 mb-4">No tasks added yet.</p>
    </div>
    <button
      @click="addTask"
      class="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
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
      this.$nextTick(() => {
        const inputs = document.querySelectorAll("input");
        inputs[inputs.length - 1].focus();
      });
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
    },
  },
};
</script>
