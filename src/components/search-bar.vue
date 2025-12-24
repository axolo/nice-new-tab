<script>
export default {
  data() {
    return {
      config: {},
      query: ''
    }
  },
  async created() {
    this.config = await this.$settings.get()
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
    font-size: 15px;
    border: none;
    outline: none;
  }
  .button {
    cursor: pointer;
    padding: 8px 16px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0 20px 20px 0;
    outline: none;
    font-size: 20px;
    line-height: 1;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      background-color: rgba(255, 255, 255, 0.75);
    }
  }
}
</style>
