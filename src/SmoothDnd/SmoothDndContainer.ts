import type { SmoothDnD } from 'smooth-dnd'
import { dropHandlers, smoothDnD } from 'smooth-dnd'
import { defineComponent, h, onMounted, ref, onUnmounted } from 'vue'
import { getTagProps, validateTagProp } from '../SmoothDnd/tagUtils'

smoothDnD.dropHandler = dropHandlers.reactDropHandler().handler
smoothDnD.wrapChild = false

type EventKey = 'drag-start' | 'drag-end' | 'drop' | 'drag-enter' | 'drag-leave' | 'drop-ready'

// 原生事件映射表
const eventEmitterMap: Record<EventKey, string> = {
  'drag-start': 'onDragStart',
  'drag-end': 'onDragEnd',
  drop: 'onDrop',
  'drag-enter': 'onDragEnter',
  'drag-leave': 'onDragLeave',
  'drop-ready': 'onDropReady',
}

export const SmoothDndContainer = defineComponent({
  name: 'SmoothDndContainer',
  props: {
    orientation: { type: String, default: 'vertical' },
    removeOnDropOut: { type: Boolean, default: false },
    autoScrollEnabled: { type: Boolean, default: true },
    animationDuration: { type: Number, default: 250 },
    behaviour: String,
    groupName: String,
    dragHandleSelector: String,
    nonDragAreaSelector: String,
    lockAxis: String,
    dragClass: String,
    dropClass: String,
    dragBeginDelay: Number,
    getChildPayload: Function,
    shouldAnimateDrop: Function,
    shouldAcceptDrop: Function,
    getGhostParent: Function,
    dropPlaceholder: [Object, Boolean],
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  emits: ['drop', 'drag-start', 'drag-end', 'drag-enter', 'drag-leave', 'drop-ready'],
  setup(props, { emit, slots }) {
    const containerRef = ref<HTMLElement | null>(null) // 容器ref
    const container = ref<SmoothDnD | null>(null)

    // 挂载时初始化容器，并依次触发事件
    onMounted(() => {
      if (!containerRef.value) return
      // 将 props 复制到 options
      const options: any = Object.assign({}, props)

      // 将 Vue 事件映射到 Smooth DnD 回调
      for (const key in eventEmitterMap) {
        const eventKey = key as EventKey
        options[eventEmitterMap[eventKey]] = (props: any) => {
          emit(eventKey, props)
        }
      }
      console.log('传递给smoothDnD函数的options', options)
      // 初始化 Smooth DnD 容器
      container.value = smoothDnD(containerRef.value, options)
    })
    // 容器卸载
    onUnmounted(() => {
      if (container.value) {
        try {
          container.value.dispose()
        } catch {
          // ignore
        }
      }
    })

    const tagProps = getTagProps(props.tag)
    // 渲染函数
    return h(tagProps.value, { ...tagProps.props, ref: containerRef }, slots.default?.())
  },
})
