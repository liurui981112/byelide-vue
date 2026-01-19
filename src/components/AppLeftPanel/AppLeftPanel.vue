<template>
  <div class="app-left-panel-wrapper">
    <div class="app-left-panel-bar">
      <div
        :class="['app-left-panel-item', isDrawerShown === 'outline' && 'active']"
        @click="toggleDrawer('outline')"
      >
        <Page size="20" :style="{ lineHeight: 0.7 }"></Page>
      </div>
      <div
        :class="['app-left-panel-item', isDrawerShown === 'block' && 'active']"
        @click="toggleDrawer('block')"
      >
        <SmartOptimization size="20" :style="{ lineHeight: 0.7 }"></SmartOptimization>
      </div>
    </div>

    <Transition name="app-left-panel-drawer">
      <div v-if="!!isDrawerShown" class="app-left-panel-drawer">
        <div class="app-left-panel-drawer-content">
          <component
            v-if="!!isDrawerShown"
            :is="isDrawerShown === 'outline' ? OutlineDrawer : BlocksDrawer"
          ></component>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { Page, SmartOptimization } from '@icon-park/vue-next'
import { ref } from 'vue'
import BlocksDrawer from './BlocksDrawer.vue'
import OutlineDrawer from './OutlineDrawer.vue'
type DrawerMode = 'outline' | 'block' | null

// 定义是否展示抽屉，默认为大纲
const isDrawerShown = ref<DrawerMode>('outline')

// 相同则关闭抽屉 不同则切换抽屉
function toggleDrawer(drawerMode: DrawerMode = null) {
  if (isDrawerShown.value === drawerMode) {
    isDrawerShown.value = null
    return
  }
  isDrawerShown.value = drawerMode
}
</script>

<style scoped>
.app-left-panel-wrapper {
  display: flex;
  height: 100%;
  z-index: 4;
  box-shadow: var(--color-gray-300) 1px 0 0;
}
.app-left-panel-bar {
  display: flex;
  width: 60px;
  height: 100%;
  flex-direction: column;
  align-items: center;
  padding-top: 16px;
}
.app-left-panel-item {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 8px 0;
  padding: 10px;
  border-radius: 20%;
  cursor: pointer;
  user-select: none;
}
.app-left-panel-item.active {
  color: var(--color-text);
  background-color: var(--color-gray-200);
}
.app-left-panel-item:hover {
  color: var(--color-text);
  background-color: var(--color-gray-200);
  transition: all 0.2s ease-in-out;
}
.app-left-panel-drawer {
  height: 100%;
  width: calc(var(--panel-width) - 60px);
  box-shadow: var(--color-gray-300) 1px 0 0;
  /* overflow: hidden; */
}
.app-left-panel-drawer-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  padding: 16px;
}
</style>
