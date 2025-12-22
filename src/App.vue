<script>
import config from './config/index.js'
import SearchBar from './components/search-bar.vue'
import LinkItem from './components/link-item.vue'
import LinkForm from './components/link-form.vue'
import LinkAdd from './components/link-add.vue'

export default {
  components: {
    SearchBar,
    LinkItem,
    LinkForm,
    LinkAdd
  },
  data() {
    const { links } = config.get()
    return {
      links,
      editable: false,
      dialog: false
    }
  },
  methods: {
    open(item) {
      if (this.editable) return
      location.replace(item.url)
    },
    menu(item) {
      console.log(item)
      this.editable = !this.editable
    },
    show() {
      this.dialog = true
      this.$refs.linkForm.showModal()
    },
    hide() {
      this.dialog = false
      this.$refs.linkForm.close()
    },
    save(link) {
      this.links.push(link)
      config.set({ links: this.links })
      this.$refs.linkForm.close()
    },
    del(index) {
      console.log(index)
    }
  }
}
</script>

<template>
  <div class="nice-new-tab">
    <div class="app">
      <SearchBar />

      <div class="links">
        <div
          v-for="(item, index) in links"
          :key="index"
          class="item"
          @click="open(item)"
          @contextmenu.prevent="menu(item, $event)"
        >
        <div v-if="editable" class="del" @click="del(index)">✖</div>
        <LinkItem v-model="links[index]" />
        </div>
        <div v-if="editable" @click="show" @contextmenu.prevent="menu(item, $event)">
          <LinkAdd />
        </div>
      </div>

      <dialog ref="linkForm" class="link-form">
        <LinkForm v-if="dialog" @change="save" @cancel="hide" />
      </dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.nice-new-tab {
  height: 100vh;
  .app {
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 72px;
    .links {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      gap: 48px;
      .item {
        position: relative;
        .del {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 24px;
          height: 24px;
          text-align: center;
          cursor: pointer;
          background-color: #f56c6c;
          color: #fff;
          border-radius: 50%;
          font-size: 15px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .edit {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>
