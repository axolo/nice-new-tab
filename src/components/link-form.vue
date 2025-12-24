<script>
export default {
  props: {
    modelValue: {
      type: Object
    }
  },
  emits: [
    'update:modelValue',
    'change',
    'cancel'
  ],
  data() {
    return {
      link: {
        name: null,
        url: null,
        icon: null,
        order: null,
        ...this.modelValue
      }
    }
  },
  methods: {
    change() {
      this.$emit('change', this.link)
    },
    cancel() {
      this.$emit('cancel')
    },
    url(force) {
      const url = this.link.url?.trim()
      if (!url || this.link.icon) return
      if (this.link.icon && !force) return
      const location = new URL(url)
      if (!location.origin) return
      this.link.icon = location.origin + '/favicon.ico'
    }
  }
}
</script>

<template>
  <div class="app-form link-form">
    <div class="item">
      <label>地址</label>
      <input
        v-model="link.url"
        placeholder="地址"
        @change="url(false)"
      >
    </div>
    <div class="item">
      <label>图标</label>
      <input
        v-model="link.icon"
        placeholder="图标地址，点击右下图标自动获取"
      >
    </div>
    <div class="item">
      <label>名称</label>
      <input
        v-model="link.name"
        placeholder="名称"
      >
    </div>
    <div class="item">
      <label>排序</label>
      <input
        v-model="link.order"
        type="number"
        step="0.1"
        placeholder="排序，数字越小越靠前"
      >
    </div>
    <div class="item">
      <button :disabled="!link.url" @click="change">保存</button>
      <button @click="cancel">关闭</button>
      <img v-if="link.icon" :src="link.icon" alt="图标" title="重新获取" class="icon" @click="url(true)">
      <div v-else title="获取图标" class="icon" @click="url(true)">🌏</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-form {
  min-width: 25rem;
  .item {
    position: relative;
    .icon {
      cursor: pointer;
      position: absolute;
      right: 0;
      width: 32px;
      height: 32px;
      border-radius: 4px;
      object-fit: cover;
      text-align: center;
      font-size: 20px;
      line-height: 32px;
    }
  }
}
</style>
