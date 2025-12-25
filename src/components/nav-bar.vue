<script>
export default {
  emit: ['update:modelValue', 'change', 'toggle'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    toggle() {
      this.show = !this.show
      this.$emit('toggle', this.show)
    }
  }
}
</script>

<template>
  <div :class="['nav-bar', { 'nav-bar-show': show }]">
    <div class="settings" @click="toggle">⚙</div>
  </div>
</template>

<style lang="scss" scoped>
.nav-bar {
  position: sticky;
  top: 0;
  padding: 12px 24px;
  opacity: 0;
  border-bottom: 1px solid #e4e7ed;
  display: flex;
  justify-content: flex-end;
  .settings {
    cursor: pointer;
    font-size: 24px;
    font-weight: 700;
    line-height: 1;
    user-select: none;
    color: #333;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &:hover {
    opacity: 1;
  }
}
.nav-bar-show {
  opacity: 1;
}
</style>
