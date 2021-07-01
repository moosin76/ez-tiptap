<template>
  <v-app id="app">
    <v-app-bar app dark>
      <v-toolbar-title>
        <div class="text-h5">
          ezCode Tiptap Editor <span class="text-caption">v 0.1.3</span>
        </div>
      </v-toolbar-title>
      <v-toolbar-items class="align-center ml-8">
        <v-switch
          label="Editable"
          hide-details
          v-model="editable"
          color="primary"
        ></v-switch>
        <v-switch
          label="DarkTheme"
          hide-details
          v-model="dark"
          color="primary"
          class="ml-2"
        ></v-switch>
        <v-btn @click="setContent(originContent)">View Description</v-btn>
        <v-btn @click="setContent(sampleContent)">View Edit Sample</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-main>
      <v-container>
        <ez-tiptap
          v-model="content"
          :editable="editable"
          @uploadImage="uploadImage"
        />
        <div v-if="codeShow" class="ProseMirror mt-4">
            <pre v-highlightjs="content"><code class="xml"></code></pre>
						<!-- <pre><code>{{contentBreak}}</code></pre> -->
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Vue from "vue";
import EzTiptap from "@/ez-tiptap.vue";
import sample from "./sample.png";
import "../src/tiptap/css/tiptap.css";
import "../src/tiptap/css/tiptap-dark.css";

export default Vue.extend({
  name: "ServeDev",
  components: {
    EzTiptap,
  },
  data() {
    return {
      originContent: `<h1>Hello EzTiptap Editor</h1><p>The editor is based on <span style="color: rgb(0, 0, 0); background-color: rgb(187, 222, 251)">tiptap 2.0 beta</span>. You need to install <span style="color: rgb(0, 0, 0); background-color: rgb(187, 222, 251)">vue.js</span> 2 and <span style="color: rgb(0, 0, 0); background-color: rgb(187, 222, 251)">vuetify</span>.</p><p></p><h3>Install</h3><pre><code class="language-bash language-bash" data-filename="npm or yarn">npm i @ezvue/ez-tiptap-editor
or
yarn add @ezvue/ez-tiptap-editor</code></pre><p></p><h3>Register vue component</h3><pre><code class="language-javascript language-javascript" data-filename="Add Component">import Vue from "vue";
import EzTiptap from "@ezvue/ez-tiptap-editor";
import "@ezvue/ez-tiptap-editor/dist/ez-tiptap.min.css";
Vue.component("EzTiptap", EzTiptap);</code></pre><p></p><h3>USE Editor</h3><pre><code class="language-xml language-xml" data-filename="Markup">&lt;ez-tiptap :editable="true" v-model="contents" @uploadImage="uploadImage"/&gt;</code></pre><ul><li><p>editable : Whether to edit the content</p></li><li><p>v-model : Link content to v-model</p></li><li><p>@uploadImage : Specifies the function to upload to the server</p></li></ul><h4><strong><span style="color: rgb(86, 156, 214)">Image Upload</span></strong></h4><p>The object is passed file, desc and callback function.<br>After uploading the file, pass the url of the file as an argument to the callback function.</p><pre><code class="language-javascript language-javascript" data-filename="Upload Function Sample">async uploadImage({file, desc, callback}) {
	const formData = new FormData();
	formData.append("upFile", file);
	formData.append("bf_desc", desc);
	const uploadImageUrl = await this.$axios.post("/api/url",formData);
	callback(uploadImageUrl);
}</code></pre><p></p><p>Thank you for using it.</p><hr><p>version history</p><ul><li><p>v 0.1.3 : Fixed an issue where code blocks could not be dragged in view mode</p></li><li><p>v 0.1.2 : Added function to show/hide code in code block</p></li><li><p>v 0.1.1 : Show keyboard shortcuts in menu</p></li></ul>`,
      editable: true,
      dark: true,
      codeShow: true,
      content: "",
    };
  },
  watch: {
    dark() {
      this.$vuetify.theme.dark = this.dark;
    },
  },
  mounted() {
    document.title = "ezCode Tiptap Editor";
    this.setContent(this.originContent);
  },
  methods: {
    async setContent(cont) {
      this.content = cont;
    },
    async uploadImage({ file, desc, callback }) {
      alert(
        "Upload must be implemented on the server.\nThis is a sample image."
      );
      callback(sample);
    },
  },
});
</script>

