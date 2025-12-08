<template>
  <div class="icon-button-wrapper">
    <div class="icon-button" v-for="item in iconData" :key="item.type">
      <component
        :is="item.icon"
        :size="20"
        :fill="props.previewMode === item.type ? 'var(--color-black)' : 'var(--color-gray-500)'"
        @click="togglePreview(item.type)"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Iphone, LaptopComputer } from '@icon-park/vue-next'
import type { Icon } from '@icon-park/vue-next/lib/runtime'
import type { PreviewType } from './PreviewType'

const props = defineProps<{
  previewMode: PreviewType
}>()

const emits = defineEmits<{
  'preview-mode-change': [mode: PreviewType]
}>()

function togglePreview(mode: PreviewType) {
  emits('preview-mode-change', mode)
}

const iconData: { icon: Icon; type: PreviewType }[] = [
  {
    icon: Iphone,
    type: 'mobile',
  },
  {
    icon: LaptopComputer,
    type: 'laptop',
  },
]
</script>

<style scoped>
.icon-button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  gap: 8px;
}
.icon-button {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
}
.icon-button:hover {
  background-color: var(--color-gray-200);
}
</style>
