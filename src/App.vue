<script>
import config from './config/index.js'

export default {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    config: {
      get() {
        return config.get()
      },
      set(config) {
        config.set(config)
      }
    }
  },
  methods: {
    open(item) {
      location.replace(item.url)
    },
    menu(item) {
      console.log(item)
    },
    search() {
      if (!this.query) return
      location.replace(`https://cn.bing.com/search?q=${this.query}`, '_blank')
    }
  }
}
</script>

<template>
  <div class="app">
    <div class="search" @keyup.enter="search">
      <input class="input" v-model="query" placeholder="必应搜索">
      <div class="button" @click="search">搜索</div>
    </div>
    <div class="links">
      <div 
        class="link" 
        v-for="(item, index) in config.links" 
        :key="index"
        @click="open(item)"
        @contextmenu.prevent="menu(item, $event)"
      >
        <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  min-height: 50vh;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  .search {
    display: flex;
    align-items: center;
    .input {
      padding: 1rem;
      border: 1px solid #000;
      border-right: none;
      border-radius: 0.5rem 0 0 0.5rem;
    }
    .button {
      padding: 1rem;
      border: 1px solid #000;
      border-radius: 0 0.5rem 0.5rem 0;
      border-left: none;
      background-color: rgba(255, 255, 255, 0.25);
      cursor: pointer;
    }
  }
  .links {
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    .link {
      cursor: pointer;
      padding: 1rem;
      background-color: rgba(255, 255, 255, 0.25);      
      border: 1px solid #000;
      border-radius: 0.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  }
}
</style>
