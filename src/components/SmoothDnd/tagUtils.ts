// 当tag是字符串时：直接用作标签名，可添加额外class
// 当tag是对象时：提取value作为标签名，props作为属性，并能合并class
// 如果没有提供tag：默认使用'div'标签
// 函数会自动处理class的合并，支持字符串和数组形式的class

export function getTagProps(
  tag: string | { value: string; props?: Record<string, any> } | undefined,
  tagClass?: string,
) {
  if (tag) {
    // tag 为单个标签  例如 tag: 'div'
    if (typeof tag === 'string') {
      const result: { value: string; props?: Record<string, any> } = { value: tag }
      if (tagClass) {
        result.props = {
          class: tagClass,
        }
      }
      return result
      // tag 为对象  例如 tag：{value: 'div', props: {class: 'xxx'}}
    } else if (typeof tag === 'object') {
      const result = { value: tag.value || 'div', props: tag.props || {} }

      if (tagClass) {
        if (result.props.class) {
          Array.isArray(result.props.class)
            ? result.props.class.push(tagClass)
            : (result.props.class = [result.props.class, tagClass])
        } else {
          result.props.class = tagClass
        }
      }
      return result
    }
  }
  return { value: 'div' }
}

import type { Ref } from 'vue'

// 校验tag参数
export function validateTagProp(tag?: Ref) {
  if (tag) {
    if (typeof tag === 'string') return true
    if (typeof tag === 'object') {
      if (
        typeof tag.value === 'string' ||
        typeof tag.value === 'function' ||
        typeof tag.value === 'object'
      ) {
        return true
      }
    }
    return false
  }
  return true
}
