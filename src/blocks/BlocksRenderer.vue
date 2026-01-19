<template>
  <smooth-dnd-container
    drag-handle-selector=".handle"
    group-name="blocks"
    orientation="vertical"
    tag="div"
    class="renderer-dnd-container"
    @drop="updateBlocks(dragFn(toRaw(blocks), $event))"
  >
    <smooth-dnd-draggable v-for="(block, i) in blocks" :key="block.id">
      <BlockRenderer :block="block" :i="i" />
    </smooth-dnd-draggable>
  </smooth-dnd-container>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { toRaw } from 'vue'
import { smoothDnD, type DropResult, dropHandlers } from 'smooth-dnd'
import { SmoothDndDraggable } from '@/components/SmoothDnd/SmoothDndDraggable'
import { SmoothDndContainer } from '@/components/SmoothDnd/SmoothDndContainer'
import { useAppEditorStore } from '@/stores/appEditor'
import BlockRenderer from './BlockRenderer.vue'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler // 指定处理方式

const { blocks } = storeToRefs(useAppEditorStore())
const { updateBlocks } = useAppEditorStore()

// 获取拖拽后的blocks渲染数组
const dragFn = <T extends any[]>(arr: T, dragResult: DropResult) => {
  // removedIndex: 元素原来的位置索引
  // addedIndex: 元素新位置索引
  // payload: 拖拽携带的数据
  const { removedIndex, addedIndex, payload } = dragResult
  const result = [...arr] // 深拷贝
  // 无操作
  if (addedIndex == null) {
    return result
  }
  // 新增元素
  if (addedIndex !== null && removedIndex == null) {
    result.splice(addedIndex, 0, {
      id: `${Math.random()}`,
      ...payload,
    })
  }
  // 移动已存在的元素
  if (addedIndex !== null && removedIndex !== null) {
    const removedItem = result.splice(removedIndex, 1)[0]
    result.splice(addedIndex, 0, removedItem)
  }
  return result
}
</script>

<style scoped lang="scss"></style>
