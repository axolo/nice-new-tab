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
      <div v-if="error" class="text">🌏</div>
      <img v-else :src="link.icon" :alt="link.name" :onerror="() => error = true">
    </div>
    <div class="name">{{ link.name }}</div>
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
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    background-color: #fff;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 32px;
      height: 32px;
      object-fit: cover;
    }
    .text {
      line-height: 1;
      font-size: 33px;
      user-select: none;
    }
  }
  .name {
    text-align: center;
    font-size: 14px;
    color: #555;
  }
  .editable {
    background-color: rgba(255, 255, 255, 0.5);
    border: 1px dashed #ccc;
    img {
      opacity: 0.5;
    }
    .text {
      opacity: 0.5;
    }
  }
}
</style>
