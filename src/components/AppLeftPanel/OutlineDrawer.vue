<template>
  <div class="outline-drawer-wrapper">
    <div class="outline-drawer-title">大纲</div>
    <ul class="outline-drawer-list">
      <li class="outline-drawer-item" v-for="block in blocks" :key="block.type">
        <component
          v-if="blocksBaseMeta[block.type]"
          :is="blocksBaseMeta[block.type]?.icon"
        ></component>
        <span class="outline-item-name">
          {{ blocksBaseMeta[block.type]?.label }}
        </span>
        <span class="outline-item-title">
          {{ block.label }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useAppEditorStore } from '@/stores/appEditor'
import { blocksBaseMeta } from '@/constants/blocksBaseMeta'
import { storeToRefs } from 'pinia'
const { blocks } = storeToRefs(useAppEditorStore())
console.log('🚀 ~ pinia同步更新给大纲组件的blocks:', blocks)
</script>

<style scoped>
.outline-drawer-wrapper {
  width: 100%;
}
.outline-drawer-title {
  font-size: 16px;
  font-weight: 500;
  color: var(--color-text-primary);
  margin-bottom: 16px;
}
.outline-drawer-item {
  display: flex;
  align-items: center;
  padding: 6px 0;
  color: var(--color-text);
}

.outline-item-name {
  margin-left: 10px;
}
.outline-item-title {
  flex: 1;
  text-align: right;
  margin-left: 8px;
  font-size: var(--font-size-small);
  color: var(--color-gray-700);
}
</style>
