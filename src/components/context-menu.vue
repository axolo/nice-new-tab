<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
  computed: {
    menu() {
      return this.modelValue
    }
  },
  data() {
    return {
      menus: [[
        { icon: '🔗', name: '编辑链接', emit: 'link' },
        { icon: '🔎', name: '搜索设置', emit: 'search' },
        { icon: '⚙️', name: '系统设置', emit: 'system' },
      ], [
        { icon: '🖼️', name: '更新壁纸', emit: 'wallpaper'}
      ]]
    }
  },
  methods: {
    change(item) {
      this.$emit('change', item)
      this.menu.show = false
    }
  }
}
</script>

<template>
  <div v-if="menu.show" class="context-menu" :style="{ top: modelValue.y, left: modelValue.x }">
    <div v-for="(items, index) in menus" :key="index" class="items">
      <div v-for="item in items" :key="item.emit" class="item" @click.stop="change(item)">
        <span v-if="item.icon" class="icon">{{ item.icon }}</span>
        <span class="name">{{ item.name }}</span>
      </div>
      <div v-if="index < menus.length - 1" class="divider" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  min-width: 160px;
  padding: 4px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
  .items {
    .item {
      cursor: pointer;
      padding: 8px 12px;
      line-height: 1;
      display: flex;
      align-items: center;
      &:hover {
        background-color: #ebebeb;
        border-radius: 4px;
      }
      .icon {
        margin-right: 8px;
        font-size: 18px;
      }
      .name {
        color: #333;
        font-size: 14px;
      }
    }
    .divider {
      margin: 4px -4px;
      background-color: #e5e5e5;
      height: 1px;
    }
  }
}
</style>
