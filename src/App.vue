<script>
import config from './config/index.js'
import LinkForm from './components/link-form.vue'
import SearchBar from './components/search-bar.vue';

export default {
  components: {
    SearchBar,
    LinkForm
  },
  data() {
    const { links } = config.get()
    return {
      links
    }
  },
  methods: {
    open(item) {
      location.replace(item.url)
    },
    menu(item) {
      console.log(item)
    },
    linkAdd(link) {
      this.links.push(link)
      config.set({ links: this.links })
      this.$refs.linkForm.close()
    }
  }
}
</script>

<template>
  <div class="app">
    <SearchBar />
    <div class="links">
      <div
        class="link"
        v-for="(item, index) in links"
        :key="index"
        @click="open(item)"
        @contextmenu.prevent="menu(item, $event)"
      >
        <img class="icon" :src="item.icon" :alt="item.name">
        <div class="name">{{ item.name }}</div>
      </div>
      <div class="link" @click="$refs.linkForm.showModal()">
        <div class="icon">➕</div>
        <div class="name">添加</div>
      </div>
      <dialog ref="linkForm" class="link-form">
        <LinkForm
          @change="linkAdd"
          @cancel="$refs.linkForm.close()"
        />
      </dialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 75vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4rem;
  .links {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    .link {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      .icon {
        width: 2rem;
        height: 2rem;
        padding: 0.5rem;
        background-color: #ccc;
        border-radius: 0.5rem;
        object-fit: cover;
        text-align: center;
        line-height: 2rem;
        font-size: 16px;
      }
      .name {
        color: #666;
        text-align: center;
        font-weight: 500;
      }
    }
  }
}
</style>
