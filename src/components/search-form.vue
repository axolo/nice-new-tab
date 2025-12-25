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
      form: {
        name: null,
        url: null,
        icon: null,
        ...this.modelValue
      }
    }
  }
}
</script>

<template>
  <div class="search-form">
    <div class="search-item">
      <label for="name">{{ $i18n('name', '名称') }}</label>
      <input id="name" v-model="form.name" type="text" />
    </div>
    <div class="search-item">
      <label for="url">{{ $i18n('url', 'URL') }}</label>
      <input id="url" v-model="form.url" type="text" />
    </div>
    <div class="search-item">
      <label for="icon">{{ $i18n('icon', '图标') }}</label>
      <input id="icon" v-model="form.icon" type="text" />
    </div>
    <div class="search-item">
      <button type="submit">{{ $i18n('save', '保存') }}</button>
    </div>
  </div>
</template>
