import { defineComponent, h } from 'vue'
import { constants } from 'smooth-dnd'
import { validateTagProp, getTagProps } from '@/components/SmoothDnd/tagUtils'

export const SmoothDndDraggable = defineComponent({
  name: 'SmoothDndDraggable',
  props: {
    tag: {
      validator: validateTagProp,
      default: 'div',
    },
  },
  setup(props, { slots }) {
    const tagProps = getTagProps(props.tag, constants.wrapperClass)
    return () => h(tagProps.value, { ...tagProps.props }, slots.default?.())
  },
})
