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
    background-color: #f5f5f5;
    font-size: 24px;
    line-height: 1;
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .name {
    font-size: 14px;
  }
}
</style>
