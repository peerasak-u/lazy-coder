<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Requirements</h2>
    <div v-if="tasks.length > 0" class="bg-gray-700 p-4 rounded-lg mb-4">
      <div
        v-for="(task, index) in tasks"
        :key="index"
        draggable="true"
        @dragstart="dragStart(index, $event)"
        @dragover="dragOver(index, $event)"
        @drop="drop(index, $event)"
        class="drag-item"
      >
        <div class="flex items-center">
          <button
            class="bg-gray-500 text-white px-2 py-1 rounded mr-2 mb-2 cursor-move"
          >
            ↕
          </button>
          <input
            v-model="tasks[index]"
            type="text"
            class="w-full mb-2 px-3 py-2 text-sm leading-tight bg-gray-600 text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Enter a task"
            @keyup.enter="addTask"
          />
          <button
            @click="removeTask(index)"
            class="bg-red-700 hover:bg-red-800 text-white px-2 py-1 rounded ml-2 mb-2"
          >
            Remove
          </button>
        </div>
      </div>
      <button
        @click="addTask"
        class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
      >
        Add more requirement
      </button>
    </div>
    <div v-else>
      <p class="text-md text-gray-300 text-center mb-2">
        No requirements have been added yet.
      </p>
      <p class="text-md text-gray-300 text-center mb-4">
        To specify what you would like to improve or fix in the given source
        code, simply click the
        <button
          @click="addTask"
          class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add
        </button>
        button.
      </p>
    </div>
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
    dragStart(index, event) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.setData("text/plain", index);
    },
    dragOver(index, event) {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    drop(index, event) {
      event.preventDefault();
      const fromIndex = event.dataTransfer.getData("text/plain");
      const task = this.tasks.splice(fromIndex, 1)[0];
      this.tasks.splice(index, 0, task);
    },
  },
};
</script>
