import js from '@eslint/js'
import globals from 'globals'
import pluginVue from 'eslint-plugin-vue'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  pluginVue.configs['flat/recommended'], {
  files: ['**/*.{js,mjs,cjs,vue}'],
  plugins: { js },
  extends: ['js/recommended'],
  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node
    }
  },
}, {
  rules: {
    'vue/multi-word-component-names': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/require-default-prop': 'off'
  }
}])
