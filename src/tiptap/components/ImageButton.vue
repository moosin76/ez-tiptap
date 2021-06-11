<template>
  <popup-button
    ref="pop"
    icon="mdi-image"
    label="Image"
    :width="400"
    @open="open"
  >
    <template v-if="loading">
      <v-sheet height="200" class="d-flex justify-center align-center">
        <v-progress-circular
          size="80"
          color="primary"
          indeterminate
        ></v-progress-circular>
      </v-sheet>
    </template>
    <template v-else-if="img.src">
      <v-card-text class="mt-4">
        <v-img
          :src="img.src"
          :aspect-ratio="1 / 1"
          max-height="200"
          contain
          :alt="img.alt"
        />
        <v-text-field v-model="img.alt" label="Description" class="mt-2" />
      </v-card-text>
      <v-card-actions class="mt-n11">
        <v-btn color="error" text @click="cancleIamge">Cancle</v-btn>
        <v-spacer />
        <v-btn color="primary" text @click="applyImage"> Apply </v-btn>
      </v-card-actions>
    </template>
    <template v-else>
      <v-tabs v-model="tab" fixed-tabs class="mt-2">
        <v-tab v-for="item in tabItems" :key="item">{{ item }}</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-model="tab" class="mt-2">
          <v-tab-item>
            <v-file-input
              v-model="file"
              show-size
              accept="image/*"
              prepend-icon="mdi-image"
              label="Image file"
            />
            <v-text-field
              v-model="form.alt"
              label="Description"
              dense
            ></v-text-field>
            <v-btn block @click="uploadImage" :disabled="!file">
              UPLOAD IMAGE
            </v-btn>
          </v-tab-item>
          <v-tab-item>
            <v-text-field v-model="form.src" label="Image URL"></v-text-field>
            <v-text-field
              v-model="form.alt"
              label="Description"
              dense
            ></v-text-field>
            <v-btn block @click="addImage" :disabled="!form.src">
              ADD IMAGE
            </v-btn>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </template>
  </popup-button>
</template>

<script>
import PopupButton from "./PopupButton.vue";
export default {
  components: { PopupButton },
  name: "ImageButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      tab: null,
      tabItems: ["Upload", "URL"],
      img: {
        src: "",
        alt: "",
      },
      form: {
        src: "",
        alt: "",
      },
      file: null,
    };
  },
  methods: {
    open() {
      this.img = {
        src: "",
        alt: "",
      };
      this.initForm();
    },
    initForm() {
      this.form = {
        src: "",
        alt: "",
      };
      this.file = null;
    },
    uploadImage() {
      if (!this.file) {
        this.$toast.error("이미지를 선택하세요.");
        return;
      }
      this.loading = true;
      this.$emit("uploadImage", {
        file: this.file,
        desc: this.form.alt,
        callback: this.uploadCallback,
      });
    },
    uploadCallback(url) {
      if (url) {
        this.form.src = url;
        this.addImage();
      } else {
				this.$toast.error("이미지 경로가 전달되지 않았습니다.");
			}
      this.loading = false;
    },
    addImage() {
      if (!this.form.src) {
        this.$toast.error("이미지 주소가 없습니다.");
        return;
      }
      this.img = this.form;
      this.initForm();
    },
    applyImage() {
      this.editor.chain().focus().setImage(this.img).run();
      // this.closePopup();
      this.$refs.pop.closeDialog();
    },
    cancleIamge() {
      this.form = this.img;
      this.img = {
        src: "",
        alt: "",
      };
    },
  },
};
</script>

<style>
</style>