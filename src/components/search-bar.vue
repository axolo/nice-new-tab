<script>
import config from '@/config'

export default {
  data() {
    return {
      config: config.get(),
      query: ''
    }
  },
  methods: {
    search() {
      const query = this.query.trim()
      if (!query) return
      location.replace(this.config.search + query, '_blank')
    }
  }
}
</script>

<template>
  <div class="search" @keyup.enter="search">
    <input class="input" v-model="query" placeholder="必应">
    <div class="button" @click="search">搜索</div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.125);
  border: 2px solid rgba(255, 255, 255, 0.25);
  border-radius: 2.5rem;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .input {
    box-sizing: border-box;
    flex: 1;
    min-width: 25rem;
    max-width: max-content;
    padding: 0.75rem 1rem;
    border-radius: 2.5rem 0 0 2.5rem;
    border: none;
    outline: none;
  }
  .button {
    cursor: pointer;
    padding: 0.75rem 1.5rem;
    border-radius: 0 2.5rem 2.5rem 0;
    background-color: rgba(255, 255, 255, 0.25);
    letter-spacing: 0.125rem;
    text-indent: 0.125rem;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      background-color: rgba(255, 255, 255, 0.6);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    }
  }
}
</style>
