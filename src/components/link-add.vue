<template>
  <div class="link-add">
    <div class="icon">➕</div>
    <div class="name">添加</div>
  </div>
</template>

<style lang="scss" scoped>
.link-add {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  .icon {
    box-sizing: border-box;
    width: 56px;
    height: 56px;
    border: 1px dashed #ccc;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 12px;
    font-size: 24px;
    line-height: 1;
    user-select: none;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 14px;
  }
}
</style>
