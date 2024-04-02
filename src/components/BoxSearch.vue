<template>
  <div class="box-search">
    <div class="box-search_content">
      <the-header class="ml-auto" />
      <div class="box-search_label">
        <ui-heading text="Delivery cost" type="title" />
        <ui-heading
          text="Enter name of the city to count delivery cost"
          type="subtitle"
          class="opacity-50"
        />
      </div>

      <dropdown-search :options="optionCities" />

      <section class="popular-cities">
        <ui-heading text="Most popular cities" type="subtitle" />
        <div class="popular-cities_grid">
          <div
            class="popular-cities_grid_item opacity-50"
            v-for="(pcity, index) in popularCities"
            :key="index"
          >
            {{ pcity.label }}
          </div>
        </div>
      </section>
    </div>

    <box-delivery v-if="isMobile" />
    <the-footer />
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue'
import BoxDelivery from './BoxDelivery.vue'
import DropdownSearch from './ui/DropdownSearch.vue'
import TheFooter from './ui/TheFooter.vue'
import TheHeader from './ui/TheHeader.vue'
import UiHeading from './ui/UiHeading.vue'
import { useIsMobile } from '../composables/checkViewports'
export default defineComponent({
  components: { DropdownSearch, UiHeading, TheHeader, TheFooter, BoxDelivery },
  setup() {
    const blocRef = ref<HTMLElement | null>(null)
    const { isMobile } = useIsMobile()
    const optionCities = [
      { label: 'Nur-Sultan', value: 'nur-sultan' },
      { label: 'Almaty', value: 'almaty' },
      { label: 'Aktau', value: 'aktau' }
    ]

    const popularCities = [
      { label: 'Nur-Sultan', value: 'nur-sultan' },
      { label: 'Almaty', value: 'almaty' },
      { label: 'Shymkent', value: 'shymkent' },
      { label: 'Atyrau', value: 'atyrau' },
      { label: 'Aktau', value: 'aktau' },
      { label: 'Zhana Turmis', value: 'zhana turmis' },
      { label: 'Karaganda', value: 'karaganda' },
      { label: 'Kentau', value: 'kentau' },
      { label: 'Aitei', value: 'aitei' },
      { label: 'Pavlodar', value: 'pavlodar' }
    ]

    return { optionCities, popularCities, blocRef, isMobile }
  }
})
</script>
<style lang="scss" scoped>
.box-search {
  width: 52%;
  padding: 0 5vw 0 10vw;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  &_content {
    color: $c-text;
    max-width: 525px;
    display: flex;
    flex-direction: column;
    gap: 4rem;
    padding: 0 0 5rem 0;
    @include phone {
      padding: 0 1.5rem;
    }
  }
  &_label {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .popular-cities {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    &_grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      column-gap: 4rem;
      &_item {
        color: $c-text;
        width: 100%;
        font-size: 20px;
        border-bottom: 1px solid $c-line;
        padding: 0.5rem 1rem;
        cursor: pointer;
      }
    }
    @include phone {
      gap: 0.5rem;
      &_grid {
        column-gap: 1rem;
        &_item {
          font-size: 14px;
        }
      }
    }
  }
  @include phone {
    width: 100%;
    padding: 0;
    &_content {
      gap: 2rem;
    }
    &_label {
      .heading-type-subtitle {
        width: 70%;
      }
    }
  }
}
</style>
