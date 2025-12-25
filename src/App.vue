<script>
  import ContextMenu from './components/context-menu.vue'
import SearchBar from './components/search-bar.vue'
import LinkItem from './components/link-item.vue'
import LinkForm from './components/link-form.vue'
import LinkAdd from './components/link-add.vue'

export default {
  components: {
    ContextMenu,
    SearchBar,
    LinkItem,
    LinkForm,
    LinkAdd
  },
  data() {
    return {
      links: [],
      form: {},
      backgroundImage: false,
      editable: false,
      dialog: false,
      contextMenu: {
        show: false,
        x: 0,
        y: 0
      }
    }
  },
  async created() {
    document.title =this.$i18n('extensionTitle', '新标签页')
    const settings = await this.$settings.get()
    this.backgroundImage = settings.background && `url(${settings.background})`
    this.links = settings.links || []
  },
  methods: {
    open(index) {
      console.log('open')
      if (!this.editable) {
        location.replace(this.links[index].url)
      } else {
        this.form = this.links[index]
        this.dialog = true
        this.$refs.linkForm.showModal()
      }
    },
    add(order) {
      console.log('add', this.editable)
      this.form = { order }
      this.dialog = true
      this.$refs.linkForm.showModal()
    },
    hide() {
      this.dialog = false
      this.$refs.linkForm.close()
      this.form = {}
    },
    save(link) {
      const links = [...this.links, link]
        .sort((a, b) => a.order - b.order)
        .map((i, index) => ({ ...i, order: index + 1 }))
      this.links = links
      this.$settings.set({ links })
      this.$refs.linkForm.close()
    },
    del(index) {
      console.log('del')
      if (!confirm(this.$i18n('confirmDelete', '确定删除吗？'))) return;
      this.links.splice(index, 1)
      this.links = this.links.map((i, index) => ({ ...i, order: index + 1 }))
      this.$settings.set({ links: this.links })
      this.$refs.linkForm.close()
    },
    showMenu(e) {
      if (this.dialog) return
      this.contextMenu = {
        show: true,
        x: e.clientX + 'px',
        y: e.clientY + 'px'
      }
    },
    hideMenu() {
      console.log('hideMenu', this.editable)
      if (this.dialog) return
      this.contextMenu = { show: false }
      this.editable = false
    },
    pickMenu(menu) {
      switch (menu.emit) {
        default:
          console.log(menu)
          break
        case 'search':
          this.$settings.set({ search: 0 })
          break
        case 'link':
          this.editable = true
          break
      }
    }
  }
}
</script>

<template>
  <div class="nice-new-tab" :style="{ backgroundImage }" @click.stop="hideMenu" @contextmenu.prevent="showMenu">
    <div class="main">
      <SearchBar />
      <div class="links">
        <div v-for="(item, index) in links" :key="item.name" @click.stop="open(index)">
          <LinkItem v-model="links[index]" :editable="editable" :background="!!backgroundImage">
            <div v-if="editable" class="del" @click.stop="del(index)">✖</div>
          </LinkItem>
        </div>
        <LinkAdd v-if="editable" @click.stop="add(links.length + 1)" />
      </div>
      <dialog ref="linkForm" class="link-form">
        <LinkForm v-if="dialog" v-model="form" @change="save" @cancel="hide" />
      </dialog>
    </div>
  </div>
  <ContextMenu v-model="contextMenu" @select="pickMenu" />
</template>

<style lang="scss" scoped>
.nice-new-tab {
  position: relative;
  height: 100vh;
  background-size: cover;
  background-position: center;
  .main {
    min-height: 75vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 72px;
    .links {
      display: grid;
      grid-template-columns: repeat(6, 1fr);
      justify-items: center;
      gap: 48px;
      .del {
        cursor: pointer;
        position: absolute;
        top: -8px;
        right: -8px;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 1;
        background-color: #f56c6c;
        color: #fff;
        border-radius: 50%;
        font-size: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
</style>
