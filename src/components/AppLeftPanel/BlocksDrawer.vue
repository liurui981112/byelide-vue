<template>
  <div class="blocks-drawer-wrapper">
    <h3 class="blocks-drawer-title">组件</h3>
    <div class="blocks-drawer-items">
      <div v-for="block in blocksBaseMetaList" :key="block.type">
        <div class="blocks-item">
          <component
            v-if="blocksBaseMeta[block.type]"
            :is="blocksBaseMeta[block.type]?.icon"
          ></component>
          <span> {{ blocksBaseMeta[block.type]?.label }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { blocksBaseMetaList, blocksBaseMeta } from '@/constants/blocksBaseMeta'
</script>

<style scoped>
.blocks-drawer-wrapper {
  width: 100%;
}
.blocks-drawer-title {
  font-size: var(--font-size-large);
  font-weight: var(--font-weight-bolder);
  margin-bottom: 8px;
}
.blocks-drawer-items {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 固定 3 列 */
  gap: 1rem;
  justify-content: space-around;
  align-content: center;
}
.blocks-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background-color: aliceblue;
  padding: 8px 2px;
}
</style>
