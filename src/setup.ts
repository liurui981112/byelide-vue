// 插件化注册物料
import type { BlockType } from '@/types/block'
import QuoteBlock from '@/blocks/basic/QuoteBlock.vue'
import HeroTitleBlock from '@/blocks/basic/HeroTitleBlock.vue'
import ViewBlock from '@/blocks/basic/ViewBlock.vue'
import ChartBlock from '@/blocks/basic/ChartBlock.vue'
import ImageBlock from '@/blocks/basic/ImageBlock.vue'
import ButtonBlock from '@/blocks/external/ButtonBlock.vue'
import FormBlock from '@/blocks/external/FormBlock.vue'
// import NotesBlock from '@/blocks/external/NotesBlock.vue'
import type { App } from 'vue'

const baseBlocks = [
  {
    type: 'quote',
    material: QuoteBlock,
  },
  {
    type: 'heroTitle',
    material: HeroTitleBlock,
  },
  {
    type: 'view',
    material: ViewBlock,
  },
  {
    type: 'chart',
    material: ChartBlock,
  },
  {
    type: 'image',
    material: ImageBlock,
  },
]

// 因为我们后面会考虑插件市场，所以我们需要一个类来管理所有的 block
// 只有你安装了对应的外部插件，你才能在页面中使用，这里用的就是插件化思想

class BlockSuite {
  // 定义一个插件数组，默认为上面定义的基础插件
  private blocks = baseBlocks

  // 将block转换为map字典
  getBlocksMap() {
    const res = this.blocks.map((block) => [block.type, block])
    // console.log('🚀 ~ BlockSuite ~ getBlocksMap ~ res:', Object.fromEntries(res))
    return Object.fromEntries(res)
  }

  // 注册新的block
  addBlock(block: any) {
    this.blocks.push(block)
  }
  // 获取所有的block
  getBlocks() {
    return this.blocks
  }
  // 判断是够包含该block
  hasBlock(type: BlockType) {
    return !!this.getBlocksMap()[type]
  }
}

const blockSuite = new BlockSuite()

blockSuite.addBlock({
  type: 'button',
  material: ButtonBlock,
})
blockSuite.addBlock({
  type: 'form',
  material: FormBlock,
})
// blockSuite.addBlock({
//   type: 'notes',
//   material: NotesBlock,
// })

const blocksMap = blockSuite.getBlocksMap()

export const blocksMapSymbol = Symbol('blocksMap')
export const setup = (app: App) => {
  const ins = {
    install: (app: App) => {
      app.provide(blocksMapSymbol, blocksMap) // 组件注册 provide inject
      app.config.globalProperties.$blocksMap = blocksMap // 全局注册
      // console.log('🚀 ~ setup ~ app.config.globalProperties:', app.config.globalProperties)
    },
  }
  app.use(ins)
}

// Extensions of Vue types to be appended manually
// https://github.com/microsoft/rushstack/issues/2090
// https://github.com/microsoft/rushstack/issues/1709

// TODO: figure out why it cannot be 'vue'
// @ts-ignore: works on Vue 3, fails in Vue 2
declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Access to the application's blocksMap
     */
    $blocksMap: string
  }
}
