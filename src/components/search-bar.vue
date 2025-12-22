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
    <div class="button" @click="search">🔍</div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.125);
  border: 2px solid rgba(255, 255, 255, 0.125);
  border-radius: 32px;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .input {
    box-sizing: border-box;
    flex: 1;
    min-width: 480px;
    padding: 12px 16px;
    border-radius: 20px 0 0 20px;
    font-size: 16px;
    border: none;
    outline: none;
  }
  .button {
    cursor: pointer;
    padding: 12px 16px;
    border-radius: 0 20px 20px 0;
    background-color: rgba(255, 255, 255, 0.5);
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
