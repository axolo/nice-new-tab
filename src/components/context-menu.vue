<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => ({ x: 0, y: 0 })
    }
  },
  data() {
    return {
      items: [{
        emit: 'link',
        name: '链接设置',
        icon: '🔗'
      }, {
        emit: 'search',
        name: '搜索设置',
        icon: '🔍️'
      }, {
        emit: 'settings',
        name: '系统设置',
        icon: '⚙️'
      }]
    }
  },
  computed: {
    menu() {
      return this.modelValue
    }
  },
  methods: {
    select(item) {
      this.$emit('select', item)
      this.menu.show = false
    }
  }
}
</script>

<template>
  <div v-if="menu.show" class="context-menu" :style="{ top: modelValue.y, left: modelValue.x }">
    <div v-for="item in items" :key="item.emit" class="item" @click="select(item)">
      <span v-if="item.icon" class="icon">{{ item.icon }}</span>
      <span class="name">{{ item.name }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  padding: 4px;
  min-width: 160px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.25);
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
}
</style>
