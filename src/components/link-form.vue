<script>
export default {
  props: {
    modelValue: {
      type: Object
    },
    title: {
      type: String,
      default: '编辑链接'
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
    <div class="row">
      <div class="form">
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
      </div>
      <div class="col" @click="url(true)">
        <img v-if="link.icon" :src="link.icon" alt="图标" class="icon">
        <div v-else class="icon" @click="url(true)">🌏</div>
        <div class="auto">获取图标</div>
      </div>
    </div>
    <div class="item">
      <button :disabled="!link.url" @click="change">保存</button>
      <button @click="cancel">关闭</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.link-form {
  min-width: 25rem;
  .row {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    .form {
      flex: auto;
    }
    .col {
      cursor: pointer;
      margin-left: 20px;
      padding: 12px;
      background-color: rgba(0, 0, 0, 0.05);
      border-radius: 4px;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 8px;
      .icon {
        width: 32px;
        height: 32px;
        border-radius: 4px;
        object-fit: cover;
        text-align: center;
        font-size: 24px;
        line-height: 32px;
      }
      .auto {
        text-decoration: underline;
        font-size: 12px;
        color: #606266;
      }
    }
  }
}
</style>
