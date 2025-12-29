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
      settings: {}, // 设置
      backgroundImage: false, // 背景图片
      links: [], // 链接列表
      form: {}, // 链接表单
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
    this.settings = await this.$storage.get('settings') || this.$config.settings
    const { wallpaper } = this.settings
    this.backgroundImage = wallpaper && `url(${wallpaper})`
    this.links = await this.$storage.get('links') || this.$config.links
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
      this.$storage.set('links', links)
      this.$refs.linkForm.close()
      this.editable = false
      this.dialog = false
    },
    del(index) {
      console.log('del')
      if (!confirm(this.$i18n('confirmDelete', '确定删除吗？'))) return;
      this.links.splice(index, 1)
      this.links = this.links.map((i, index) => ({ ...i, order: index + 1 }))
      this.$storage.set('links', this.links)
      this.$refs.linkForm.close()
      this.editable = false
      this.dialog = false
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
          console.log(menu)
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
    gap: 64px;
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
