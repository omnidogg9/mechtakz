<template>
  <div class="heading-text" :class="currentTypeClass" :style="headingStyles">{{ text }}</div>
</template>
<script lang="ts">
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'UiHeading',
  props: {
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String as PropType<'title' | 'subtitle'>,
      default: 'title',
      validator: (value: string) => ['title', 'subtitle'].includes(value)
    },
    textSize: {
      type: Number,
      default: 0
    }
  },
  setup(props) {
    const currentTypeClass = computed(() => {
      return `heading-type-${props.type}`
    })
    const headingStyles = computed(() => ({
      ...(props.textSize && {
        fontSize: `${props.textSize}px`
      })
    }))

    return {
      currentTypeClass,
      headingStyles
    }
  }
})
</script>
<style lang="scss">
.heading {
  &-type {
    &-title {
      color: $c-text;
      font-size: 48px;
      font-style: normal;
      font-weight: 700;
      line-height: normal;
      @include phone {
        font-size: 36px;
      }
    }

    &-subtitle {
      color: $c-text;
      font-size: 24px;
      font-style: normal;
      font-weight: 400;
      line-height: 140%;
      @include phone {
        font-size: 16px;
      }
    }
  }
}
</style>
