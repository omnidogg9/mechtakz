<template>
  <div class="the-header">
    <div class="logo"><img src="@/assets/img/logo.svg" /> <span>FastService</span></div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheHeader'
})
</script>
<style lang="scss" scoped>
.the-header {
  display: flex;
  width: 100%;
  .logo {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    font-size: 24px;
    font-weight: 700;
    padding: 1rem 0;
    color: $c-text;
  }
}
</style>
