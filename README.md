# Ezcode Tiptap Editor
The editor is based on tiptap 2.0 beta. You need to install vue.js 2 and vuetify.

[DEMOPAGE](http://ez-tiptap.ezcode.kr)

### Install
```
npm i @ezvue/ez-tiptap-editor
```
```
yarn add @ezvue/ez-tiptap-editor
```

### Add Component
```
import Vue  from "vue";
import EzTiptap from "@ezvue/ez-tiptap-editor";
Vue.component("EzTiptap", EzTiptap);
```
### USE Editor
```
<ez-tiptap :editable="true" v-model="contents" @uploadImage="uploadImage"/>
```
- editable : Whether to edit the content
- v-model : Link content to v-model
- @uploadImage : Specifies the function to upload to the server


### Image Upload
The object is passed file, desc and callback function.
After uploading the file, pass the url of the file as an argument to the callback function.
```
async uploadImage({file, desc, callback}) {
	const formData = new FormData();
	formData.append("upFile", file);
	formData.append("bf_desc", desc);
	const data = await this.$axios.post(
		`/api/url`,
		formData
	);
	callback(`/data.url`);
},
```

