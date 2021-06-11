<template>
  <div>
    <v-dialog width="490" v-model="menu" persistent class="emoji">
      <template v-slot:activator="{ on, attrs }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-on="on"
              v-bind="attrs"
              tile
              fab
              depressed
              x-small
              class="px-0 tiptap-menu-button"
              @click="openMenu"
            >
              <span style="font-size: 20px">😀</span>
            </v-btn>
          </template>
          <span>{{ label }}</span>
        </v-tooltip>
      </template>
      <v-card v-if="tabItems">
        <v-toolbar color="primary" dark style="z-index: 1">
          {{ label }}
          <v-spacer></v-spacer>
          <v-btn icon @click="closeMenu">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>

        <div class="d-flex">
          <div>
            <v-tabs
              v-model="tab"
              vertical
              slider-size="5"
              slider-color="#1976d2"
              style="border-right: 1px solid #1976d280"
							
            >
              <v-tooltip top v-for="group in tabItems" :key="group">
                <template v-slot:activator="{ on, attrs }">
                  <v-tab v-on="on" v-bind="attrs" class="emoji-tab">
                    <span style="font-size:24px">{{ emojiData[group][0] }}</span>
                  </v-tab>
                </template>
                {{ group }}
              </v-tooltip>
            </v-tabs>
          </div>
          <div>
            <div
              style="max-height:344px; overflow:auto; margin: 8px 0; padding:0 0 0 4px;"
							class="d-flex flex-wrap "
            >
              <v-tooltip top v-for="(item, i) in items" :key="i">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    v-on="on"
                    v-bind="attrs"
                    tile
                    fab
                    depressed
                    small
                    @click="insertEmoji(item)"
                    class="emoji-item ma-1"
                  >
                    <span style="font-size: 20px">{{ item }}</span>
                  </v-btn>
                </template>
                <v-sheet
                  width="80"
                  height="80"
                  rounded
                  elevation="2"
                  class="d-flex justify-center align-center"
                  style="margin: -5px -16px"
                >
                  <div style="font-size: 60px">{{ item }}</div>
                </v-sheet>
              </v-tooltip>
            </div>
            
          </div>
        </div>
				<div class="text-center py-2" style="width:100%; border-top:1px solid #1976d280">
              <v-pagination
                v-model="page"
                :length="totalItems"
								:total-visible="7"
                @input="itemChange"
              />
            </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import emojiData from "./emoji.json";

export default {
  name: "EmojiButton",
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      label: "Emoji",
      loading: false,
      tab: 0,
      menu: false,
      items: [],
      tabItems: null,
      emojiData,
      page: 1,
      limit: 56,
			
    };
  },
  computed: {
    totalItems() {
      const { emojiData, tab, tabItems, limit } = this;
      if (tabItems) {
        return Math.floor(emojiData[tabItems[tab]].length / limit) + 1;
      }
      return 0;
    },
  },
  watch: {
    tab() {
      this.page = 1;
      this.itemChange();  
    },
  },
  mounted() {
    this.tabItems = Object.keys(this.emojiData);
    this.itemChange();
  },
  methods: {
    openMenu() {
      this.menu = true;
    },
    closeMenu() {
      this.menu = false;
    },
    insertEmoji(item) {
      this.editor.chain().focus().insertContent(item).run();
      this.closeMenu();
    },
    itemChange() {
      const { emojiData, tabItems, tab, page, limit } = this;
			const items = emojiData[tabItems[tab]];
      const start = (page - 1) * limit;
      const end = Math.min(start + limit, items.length);
      this.items = items.slice(start, end);
    },
  },
};
</script>