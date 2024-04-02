<template>
  <div class="the-footer">
    <p class="the-footer_rights">
      All rights reserved <br />
      Fast service 2021
    </p>
    <div class="the-footer_partners">
      <img v-for="(partner, index) in partners" :key="index" :src="partner.url" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TheFooter',
  setup() {
    const partners = [
      { name: 'Visa', url: './src/assets/img/visa-logo.svg' },
      { name: 'Mastercard', url: './src/assets/img/mastercard-logo.svg' },
      { name: 'Maestro', url: './src/assets/img/maestro-logo.svg' },
      { name: 'Processing', url: './src/assets/img/processing-logo.svg' }
    ]

    return {
      partners
    }
  }
})
</script>
<style lang="scss" scoped>
.the-footer {
  display: flex;
  justify-content: space-between;
  width: 100%;
  @include phone {
    flex-direction: column;
    padding: 1rem 1.5rem;
    gap: 1rem;
    &_rights {
      order: 1;
    }
    &_partners {
      order: 0;
    }
  }
  &_rights {
    font-size: 14px;
    color: $c-text;
    opacity: 0.5;
  }
  &_partners {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;
    img {
      height: 14px;
      cursor: pointer;
    }
  }
}
</style>
