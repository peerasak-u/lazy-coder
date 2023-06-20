<template>
  <h2 class="text-xl font-semibold mb-2">1. Code</h2>
  <div class="flex flex-col mb-4">
    <div class="flex items-center bg-gray-900 p-1 rounded-t-lg" v-if="sourceCodes.length > 0">
      <div
        v-for="(sourceCode, index) in sourceCodes"
        :key="index"
        :class="['flex items-center px-2 py-1 bg-gray-900 text-gray-600 mr-1 rounded-lg cursor-pointer', { 'bg-gray-600': activeTab === index }]"
        @click="activeTab = index"
      >
        <input
          v-model="sourceCode.title"
          class="bg-transparent border-none text-gray-300 text-sm outline-none"
          type="text"
          placeholder="Please enter a title 📝"
        />
        <button @click.stop="removeSourceCode(index)" class="bg-transparent border-none text-gray-400 text-sm cursor-pointer ml-1">
          &times;
        </button>
      </div>
      <button @click="addSourceCode" class="bg-transparent border-none text-gray-400 text-lg cursor-pointer px-1">
        +
      </button>
    </div>
    <div v-else>
      <p class="w-full text-md text-gray-300 text-center">
        <p class="mt-4">
          To get started, click on the
          <button
            @click="addSourceCode"
            class="bg-blue-600 hover:bg-blue-700 text-white py-1 px-2 rounded"
          >
            Add 📝
          </button>
          button to add the source code you want to fix or improve.
        </p>
      </p>
    </div>
    <div v-if="sourceCodes.length > 0" class="tab-content">
      <prism-editor
        class="my-editor"
        v-model="sourceCodes[activeTab].content"
        :highlight="highlighter"
        line-numbers
      ></prism-editor>
    </div>
  </div>
</template>

<script>
// import Prism Editor
import { PrismEditor } from "vue-prism-editor";
import "vue-prism-editor/dist/prismeditor.min.css"; // import the styles somewhere

// import highlighting library (you can use any library you want just return html string)
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css"; 

export default {
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    PrismEditor,
  },
  data() {
    return {
      sourceCodes: this.modelValue,
      activeTab: 0,
    };
  },
  methods: {
    addSourceCode() {
      this.sourceCodes.push({ title: "", content: "" });
      this.activeTab = this.sourceCodes.length - 1;
    },
    removeSourceCode(index) {
      this.sourceCodes.splice(index, 1);
      if (this.activeTab >= this.sourceCodes.length) {
        this.activeTab = this.sourceCodes.length - 1;
      }
    },
    highlighter(code) {
      return highlight(code, languages.js); 
    },
  },
  watch: {
    modelValue: {
      handler(newValue) {
        this.sourceCodes = newValue;
      },
      deep: true,
    },
    sourceCodes: {
      handler(newValue) {
        this.$emit("update:modelValue", newValue);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.my-editor {
  background: #111827;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  max-height: 80vh;
  min-height: 10vh;
  overflow: auto;
  border-radius: 0 0 5px 5px;
}

.prism-editor__textarea:focus {
  outline: none;
}
</style>