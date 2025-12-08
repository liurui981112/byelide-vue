<template>
  <div class="layout-runner" ref="runner">
    <div class="layout-runner-navigator">
      <div></div>
      <div class="address-wrapper">https://helloword.com/sdfsfsdf/sggwefwfsdfsdfsdfsdfsf</div>

      <PreviewModeSwitcher :preview-mode="props.previewMode" @preview-mode-change="greet" />
    </div>
    <AppLaptopPreviewer />
  </div>
</template>

<script setup lang="ts">
import type { PreviewType } from './PreviewType'
import PreviewModeSwitcher from './PreviewModeSwitcher.vue'
import AppLaptopPreviewer from '../AppPreviewer/LaptopPreviewer.vue'

const props = defineProps<{
  previewMode: PreviewType
}>()

// 定义自定义发射函数，preview-mode-change在父组件中定义
const emits = defineEmits<{
  'preview-mode-change': [mode: PreviewType]
}>()

// 子组件触发父组件
function greet(mode: PreviewType) {
  emits('preview-mode-change', mode)
}
</script>

<style scoped>
.layout-runner {
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  margin: 8px 40px;
  background-color: var(--color-white);
  border-radius: 8px;
  box-shadow:
    0 0 1px rgb(62 65 86 / 37.5%),
    0 12px 24px rgb(62 65 86 / 15%),
    0 20px 40px rgb(62 65 86 / 10%);
}
.layout-runner-navigator {
  display: flex;
  height: 42px;
  font-size: var(--font-size-normal);
  align-items: center;
  padding: 0 16px;
  background-color: var(--color-gray-100);
}
.address-wrapper {
  display: flex;
  flex: 1;
  min-width: 50px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 8px;
  background-color: var(--color-gray-200);
  text-overflow: ellipsis;
  padding: 2px 32px 2px 12px;
}
</style>
