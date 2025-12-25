<script>
export default {
  data() {
    return {
      engine: {},
      query: ''
    }
  },
  async created() {
    this.settings = await this.$settings.get()
    this.engine = this.settings.searchs[this.settings.search]
  },
  methods: {
    search() {
      const query = this.query.trim()
      if (!query) return
      location.replace(this.engine.url + query, '_blank')
    }
  }
}
</script>

<template>
  <div class="search" @keyup.enter="search">
    <div class="icon prefix">
      <img :src="engine.icon" alt="图标">
    </div>
    <input
      v-model="query"
      class="input"
      :placeholder="engine.name + $i18n('searchPlaceholder', '搜索')"
    >
    <div class="icon suffix" @click="search">🔍</div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.125);
  border-radius: 12px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .icon {
    cursor: pointer;
    padding: 8px 12px;
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .prefix {
    img {
      width: 24px;
      height: 24px;
      object-fit: cover;
    }
  }
  .input {
    box-sizing: border-box;
    flex: 1;
    min-width: 480px;
    padding: 16px 0;
    font-size: 15px;
    border: none;
    outline: none;
  }
  .suffix {
    font-size: 20px;
    &:active {
      background-color: rgba(255, 255, 255, 0.75);
    }
  }
}
</style>
