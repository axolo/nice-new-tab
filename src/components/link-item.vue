<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    },
    editable: {
      type: Boolean,
      default: false
    },
    background: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      link: this.modelValue,
      error: false
    }
  }
}
</script>

<template>
  <div class="link-item">
    <div :class="['icon', { editable }]">
      <span v-if="error" class="text">🔗</span>
      <img v-else :src="link.icon" :alt="link.name" :onerror="() => error = true">
      <slot />
    </div>
    <div :class="['name', { background }]">{{ link.name }}</div>
  </div>
</template>

<style lang="scss" scoped>
.link-item {
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  .icon {
    position: relative;
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    background-color: #fff;
    user-select: none;
    border-radius: 12px;
    line-height: 1;
    font-size: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    &:hover {
      box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
    }
    &:active {
      scale: 1.1;
    }
    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
    }
    .text {
      line-height: 1;
    }
  }
  .name {
    max-width: 72px;
    word-break: break-word;
    text-align: center;
    font-size: 14px;
    color: #666;
  }
  .editable {
    border: 1px dashed #ccc;
    img, .text {
      opacity: 0.5;
    }
  }
  .background {
    color: #fff;
    mix-blend-mode: difference;
  }
}
</style>
