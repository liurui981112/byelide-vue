<template>
  <div class="layout-runner" ref="runner">
    <div class="layout-runner-navigator">
      <PreviewModeSwitcher :preview-mode="props.previewMode" @preview-mode-change="greet" />
    </div>

    <!-- 手机模拟器-->
    <div class="simulator-wrapper">
      手机模拟器
      <!-- 手机顶部状态栏
      <div class="simulator-header">
        <StatusBar />
      </div>
      
      <div class="simulator-content">
        <AppMobilePreviewer />
      </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import type { PreviewType } from './PreviewType'
import PreviewModeSwitcher from './PreviewModeSwitcher.vue'

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
  flex: 1;
}
.layout-runner-navigator {
  height: 42px;
  display: grid;
  font-size: var(--font-size-normal);
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  padding: 0 16px;
  background-color: var(--color-gray-100);
  width: 100%;
}
</style>
