<script setup lang="ts">
import BoxSearch from '@/components/BoxSearch.vue'
import BoxDelivery from '@/components/BoxDelivery.vue'
import { useIsMobile } from '@/composables/checkViewports'
const { isMobile } = useIsMobile()
</script>

<template>
  <div class="content">
    <box-search />
    <box-delivery v-if="!isMobile" />
  </div>
</template>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: row;
  @include phone {
    flex-direction: column;
  }
}
</style>
