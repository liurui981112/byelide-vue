<template>
  <div class="layout-content">
    <component
      :is="previewMode === 'laptop' ? LaptopPreviewer : MobilePreviewer"
      :previewMode="previewMode"
      @preview-mode-change="togglePreview"
    >
    </component>
  </div>
</template>

<script setup lang="ts">
import LaptopPreviewer from './LaptopPreviewer.vue'
import MobilePreviewer from './MobilePreviewer.vue'
import { ref } from 'vue'
import type { PreviewType } from './PreviewType'
// 预览模式 默认laptop 电脑端   mobile 移动端
const previewMode = ref<PreviewType>('laptop')

// 预览切换 接收子组件传值
const togglePreview = (mode: PreviewType) => {
  previewMode.value = mode
}
</script>

<style scoped>
.layout-content {
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 2;
  flex: 1;
  background-color: var(--color-gray-100);
}
</style>
