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
      settings: null, // 系统设置
      backgroundImage: false, // 背景图片
      links: [], // 链接列表
      form: {}, // 链接表单
      dialog: false, // 表单弹窗
      editable: false, // 编辑模式
      contextMenu: { // 右键菜单
        show: false,
        x: 0,
        y: 0
      }
    }
  },
  created() {
    document.title =this.$i18n('extensionTitle', '新标签页')
    this.init()
  },
  methods: {
    async init() {
      const settings = await this.$storage.get(this.$config.name)
      this.settings = { ...this.$config, ...settings }
      this.links = this.settings.links
      this.wallpaper()
    },
    wallpaper() {
      if (!this.settings.wallpaper) return
      this.backgroundImage = `url(${this.settings.wallpaper}?${Date.now()})`
    },
    open(index) {
      if (!this.editable) {
        location.replace(this.links[index].url)
      } else {
        // index: 用于判断新增还是编辑
        this.form = this.links[index]
          ? { ...this.links[index], index }
          : { order: index + 1, index }
        this.formIndex = index
        this.dialog = true
        this.$refs.linkForm.showModal()
      }
    },
    close() {
      this.dialog = false
      this.$refs.linkForm.close()
      this.form = {}
    },
    save(link) {
      if (link.index >= this.links.length) {
        this.links.push({ ...link, index: undefined })
      } else {
        this.links[link.index] = { ...link, index: undefined }
      }
      this.links = [...this.links]
        .sort((a, b) => a.order - b.order - 1)
        .map((i, index) => ({ ...i, order: index + 1 }))
      this.$storage.set(this.$config.name, {
        ...this.settings,
        links: this.links
      })
      this.$refs.linkForm.close()
      this.editable = false
      this.dialog = false
    },
    del(index) {
      if (!confirm(this.$i18n('confirmDelete', '确定删除吗？'))) return;
      this.links.splice(index, 1)
      this.links = this.links.map((i, index) => ({ ...i, order: index + 1 }))
      this.$storage.set(this.$config.name, { ...this.settings, links })
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
      if (this.dialog) return;
      this.contextMenu = { show: false }
      this.editable = false
    },
    pickMenu(menu) {
      switch (menu.emit) {
        default:
          console.log(menu)
          break
        case 'link':
          this.editable = true
          break
        case 'search':
          console.log(menu)
          break
        case 'system':
          console.log(menu)
          break
        case 'wallpaper':
          this.wallpaper()
          break
      }
    }
  }
}
</script>

<template>
  <div v-if="settings" class="nice-new-tab" :style="{ backgroundImage }" @click.stop="hideMenu" @contextmenu.prevent.stop="showMenu">
    <div class="main">
      <SearchBar />
      <div class="links" :style="{ gridTemplateColumns: `repeat(${settings.columns}, 1fr)` }">
        <div v-for="(item, index) in links" :key="item.name" @click.stop="open(index)">
          <LinkItem v-model="links[index]" :editable="editable" :background="!!backgroundImage">
            <div v-if="editable" class="del" @click.stop="del(index)">✖</div>
          </LinkItem>
        </div>
        <LinkAdd v-if="editable" @click.stop="open(links.length)" />
      </div>
    </div>
    <dialog ref="linkForm" class="link-form">
      <LinkForm v-if="dialog" v-model="form" @change="save" @cancel="close" />
    </dialog>
    <ContextMenu v-model="contextMenu" @change="pickMenu" />
  </div>
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
