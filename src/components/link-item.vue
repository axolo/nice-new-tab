<script>
export default {
  props: {
    modelValue: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      link: this.modelValue
    }
  }
}
</script>

<template>
  <div class="link-item">
    <div class="icon">
      <div v-if="link.error" class="text">🌏</div>
      <img v-else :src="link.icon" :alt="link.name" :onerror="() => link.error = true">
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
    width: 56px;
    height: 56px;
    background-color: #eee;
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
    }
  }
  .name {
    text-align: center;
    font-size: 14px;
    color: #555;
  }
}
</style>
