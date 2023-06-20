<template>
  <h2 class="text-xl font-semibold mb-2">1. Code</h2>
  <div class="source-code-section mb-4">
    <div class="tabs" v-if="sourceCodes.length > 0">
      <div
        v-for="(sourceCode, index) in sourceCodes"
        :key="index"
        :class="['tab', { 'tab-active': activeTab === index }]"
        @click="activeTab = index"
      >
        <input
          v-model="sourceCode.title"
          class="tab-title"
          type="text"
          placeholder="Please enter a title 📝"
        />
        <button @click.stop="removeSourceCode(index)" class="tab-close">
          &times;
        </button>
      </div>
      <button @click="addSourceCode" class="add-tab-btn">
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
      activeTab: 0, // Add this new data property
    };
  },
  methods: {
    addSourceCode() {
      this.sourceCodes.push({ title: "", content: "" });
      this.activeTab = this.sourceCodes.length - 1; // Set the active tab to the newly added tab
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
.source-code-section {
  display: flex;
  flex-direction: column;
}

.tabs {
  display: flex;
  align-items: center;
  background-color: #111827;
  padding: 4px;
  border-radius: 5px 5px 0 0;
}

.tab {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  background-color: #111827;
  color: #ccc;
  margin-right: 4px;
  border-radius: 3px 3px 0 0;
  cursor: pointer;
}

.tab-active {
  background-color: #1a243b;
}

.tab-title {
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 14px;
  outline: none;
}

.tab-close {
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 14px;
  cursor: pointer;
  margin-left: 4px;
}

.add-tab-btn {
  background: transparent;
  border: none;
  color: #ccc;
  font-size: 20px;
  cursor: pointer;
  padding: 0 4px;
}
.editor-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #111827;
  color: #ccc;

  /* you must provide font-family font-size line-height. Example: */
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;

  /* max height is 80% of screen hiehgt */
  max-height: 80vh;
  min-height: 10vh;

  /* scrollable in x and y direction */
  overflow: auto;

  /* add rounded corner */
  /* rounded only bottom left and right */
  border-radius: 0 0 5px 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
