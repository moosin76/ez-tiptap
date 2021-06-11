<template>
  <node-view-wrapper class="youtube drag-item">
    <div
      class="drag-handler"
      draggable="true"
      data-drag-handle
      contenteditable="false"
    ></div>
    <v-responsive
      v-if="youtubeID"
      :aspect-ratio="16 / 9"
      max-width="1024"
      calss="drag-content"
    >
      <iframe
        :src="`https://www.youtube.com/embed/${youtubeID}?autoplay=${autoplay}`"
        frameborder="0"
        allowfullscreen="allowfullscreen"
        class="iframe"
        style="height: 100%; width: 100%"
      ></iframe>
    </v-responsive>
    <v-alert v-else type="error">동영상 링크가 올바르지 않습니다.</v-alert>
  </node-view-wrapper>
</template>

<script>
import { NodeViewWrapper, nodeViewProps } from "@tiptap/vue-2";

const pattern = /https:\/\/(?:www.youtube.com\/watch\?v=|youtu.be\/)([^&]+)/;

export default {
  name: "YoutubeComponent",
  props: nodeViewProps,
  components: {
    NodeViewWrapper,
  },
  data() {
    return {
      src: this.node.attrs.src,
      autoplay: this.node.attrs.autoplay,
    };
  },
  computed: {
    youtubeID() {
      const match = this.src.match(pattern);
      if (match && match[1]) return match[1];
      return null;
    },
  },
  mounted() {
    console.log("src", this.editor.isEditable);
  },
};
</script>

<style>
</style>