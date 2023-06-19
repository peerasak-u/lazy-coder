<template>
  <div class="flex flex-col justify-center">
    <h2 class="text-xl font-semibold mb-4">Source Codes</h2>
    <div class="flex flex-col justify-center" v-if="sourceCodes.length > 0">
      <div v-for="(sourceCode, index) in sourceCodes" :key="index" class="mb-4">
        <div class="bg-gray-700 p-4 rounded-lg">
          <input
            v-model="sourceCode.title"
            class="w-full mb-2 px-3 py-2 text-sm leading-tight bg-gray-600 text-gray-300 border border-gray-600 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Source code title"
          />
          <div class="editor-container">
            <prism-editor
              class="my-editor"
              v-model="sourceCode.content"
              :highlight="highlighter"
              line-numbers
            ></prism-editor>
            <button
              @click="removeSourceCode(index)"
              class="mt-2 bg-red-700 hover:bg-red-800 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <button
      @click="addSourceCode"
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Add source code
    </button>
    </div>
    <div v-else>
      <p class="w-full text-md text-gray-300 text-center mb-4"> 
        <p class="mt-4">
          To get started, click on the <button
      @click="addSourceCode"
      class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
    >
      Add
    </button>
        button to upload the source code you want to fix or improve.
        </p>  
      </p>
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
import "prismjs/themes/prism-tomorrow.css"; // import syntax highlighting styles

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
    };
  },
  methods: {
    addSourceCode() {
      this.sourceCodes.push({ title: "", content: "" });
    },
    removeSourceCode(index) {
      this.sourceCodes.splice(index, 1);
    },
    highlighter(code) {
      return highlight(code, languages.js); // languages.<insert language> to return html with markup
    },
  },
  watch: {
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
.editor-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

/* required class */
.my-editor {
  /* we dont use `language-` classes anymore so thats why we need to add background and text color manually */
  background: #2d2d2d;
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
  border-radius: 5px;
}

/* optional class for removing the outline */
.prism-editor__textarea:focus {
  outline: none;
}
</style>
