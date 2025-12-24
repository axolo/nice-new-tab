<script>
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
    return {
      links: [],
      editable: false,
      dialog: false
    }
  },
  async created() {
    document.title =this.$i18n('extensionTitle', '新标签页')
    const settings = await this.$settings.get()
    this.links = settings.links || []
  },
  methods: {
    open(item) {
      if (this.editable) return
      location.replace(item.url)
    },
    show(index) {
      if (!this.editable) return
      this.dialog = true
      this.$refs.linkForm.showModal()
    },
    hide() {
      this.dialog = false
      this.$refs.linkForm.close()
    },
    save(link) {
      const links = [...this.links, link]
        .sort((a, b) => a.order - b.order)
        .map((i, order) => ({ ...i, order }))
      this.links = links
      this.$settings.set({ links })
      this.$refs.linkForm.close()
    },
    del(index) {
      if (!confirm(this.$i18n('confirmDelete', '确定删除吗？'))) return;
      this.links.splice(index, 1)
      this.$settings.set({ links: this.links })
    }
  }
}
</script>

<template>
  <div class="nice-new-tab">
    <div :class="['navi', { editable }]">
      <div class="settings" @click="editable = !editable">⚙</div>
    </div>

    <div class="main">
      <SearchBar />

      <div class="links">
        <div v-for="(item, index) in links" :key="item.name" class="item" @click="open(item)">
          <div v-if="editable" class="del" @click="del(index)">✖</div>
          <LinkItem v-model="links[index]" :editable="editable" @click="show(index)" />
        </div>

        <LinkAdd v-if="editable" @click="show" />
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
  .navi {
    display: flex;
    justify-content: flex-end;
    padding: 12px 24px;
    opacity: 0;
    .settings {
      cursor: pointer;
      font-size: 24px;
      font-weight: 700;
      line-height: 1;
      user-select: none;
      color: #333;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    &:hover {
      opacity: 1;
    }
  }
  .editable {
    opacity: 1;
  }
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
      .item {
        position: relative;
        .del {
          cursor: pointer;
          position: absolute;
          top: -4px;
          right: 0;
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
}
</style>
