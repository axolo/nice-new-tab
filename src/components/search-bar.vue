<script>
export default {
  data() {
    return {
      settings: {}, // 系统设置
      searchs: [], // 搜索引擎列表
      search: {}, // 当前搜索引擎
      query: '' // 当前搜索关键词
    }
  },
  async created() {
    const settings = await this.$storage.get(this.$config.name)
    this.settings = { ...this.$config, ...settings }
    this.searchs = this.settings.searchs
    this.search = this.searchs[0]
  },
  methods: {
    submit() {
      const query = this.query.trim()
      if (!query) return
      location.replace(this.search.url + query, '_blank')
    }
  }
}
</script>

<template>
  <div class="search" @keyup.enter="submit">
    <div class="icon prefix">
      <img :src="search.icon" alt="图标">
    </div>
    <input
      v-model="query"
      class="input"
      :placeholder="search.name + $i18n('searchPlaceholder', '搜索')"
    >
    <div class="icon suffix" @click="submit">🔍</div>
  </div>
</template>

<style lang="scss" scoped>
.search {
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.125);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  outline: none;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  .icon {
    cursor: pointer;
    padding: 16px;
    background-color: rgba(255, 255, 255, 1);
    outline: none;
    user-select: none;
    font-size: 20px;
    line-height: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    &:active {
      background-color: rgba(255, 255, 255, 0.75);
    }
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
    font-size: 15px;
    border: none;
    outline: none;
  }
}
</style>
