<template>
  <div class="box-delivery" ref="boxDelivery">
    <div class="box-delivery_placeholder" v-if="deliveryStore.length === 0">
      <div class="box-delivery_placeholder_plug">
        <p class="box-delivery_placeholder_plug_text">
          Fast <br />
          Service
        </p>
        <img class="box-delivery_placeholder_plug_truck" src="@/assets/img/shipping-truck.svg" />
      </div>
      <div class="road"><img src="@/assets/img/road.svg" /></div>
    </div>

    <div class="box-delivery_list" v-else>
      <div
        class="box-delivery_list_item"
        v-for="(delivery, index) in deliveryStore"
        :key="index"
        @click="toggleSelected(index)"
        :class="{ active: selectedCard === index, 'opacity-30': !delivery.available }"
      >
        <div class="box-delivery_list_item_content">
          <div class="text">
            <div class="flex flex-col">
              <label>{{ delivery.type }}</label>
              <p class="sublabel" v-if="!delivery.available">Not availible in that city</p>
            </div>
            <p class="price">{{ delivery.price }}$</p>
          </div>
          <div class="image"><img :src="images[index].url" /></div>
        </div>
        <div v-if="selectedCard === index" class="selected">
          <mdicon name="check" class="" :size="32" :width="32" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useDeliveryStore } from '../../store/deliveryStore'
export default defineComponent({
  name: 'BoxDelivery',
  setup() {
    const deliveryStore = computed(() => useDeliveryStore().getDeliveryOptions)
    const selectedCard = ref<number | null>(null)
    const images = [
      { name: 'pickup', url: './src/assets/img/delivery-pickup.svg' },
      { name: 'courier', url: './src/assets/img/delivery-courier.svg' },
      { name: 'post', url: './src/assets/img/delivery-post.svg' }
    ]
    const toggleSelected = (index: number) => {
      selectedCard.value = selectedCard.value === index ? null : index
    }
    return { deliveryStore, images, selectedCard, toggleSelected }
  }
})
</script>
<style lang="scss" scoped>
.box-delivery {
  display: flex;
  height: auto;
  width: 48%;
  background: $c-background;
  border-radius: 40px 0 0 40px;
  position: relative;
  overflow: hidden;
  &_placeholder {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 100%;
    width: 100%;
    .road {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      z-index: 3;
      img {
        width: 100%;
      }
    }
    &_plug {
      z-index: 5;
      position: relative;
      top: 5%;
      &_text {
        position: absolute;
        right: -10%;
        top: -22%;
        color: $c-text;
        opacity: 0.2;
        font-size: 96px;
        font-weight: 700;
        line-height: 100%;
        z-index: 3;
        @include phone {
          font-size: 36px;
          right: -29%;
          top: -15%;
        }
      }
      &_truck {
        position: relative;
        z-index: 5;
      }
      @include phone {
        width: 45%;
        top: -7%;
      }
    }
    @include phone {
      height: unset;
    }
  }
  &_list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: auto 0;
    padding: 0 4rem;
    &_item {
      display: flex;
      justify-content: space-between;
      background-color: white;
      border-radius: 22px;
      min-height: 225px;
      width: 525px;
      overflow: hidden;
      &_content {
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        padding: 1.5rem;
        .text {
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          label {
            color: $c-text;
            font-size: 36px;
            font-weight: 700;
            line-height: 42.19px;
            @include phone {
              font-size: 24px;
            }
          }
          .sublabel {
            color: $c-text;
            font-size: 24px;
            @include phone {
              font-size: 14px;
            }
          }
          .price {
            font-size: 50px;
            color: rgba(120, 161, 187, 1);
            font-weight: 700;
            @include phone {
              font-size: 32px;
            }
          }
        }
        .image {
          display: flex;
          align-items: center;
          width: 135px;
          @include phone {
            align-items: end;
            width: 75px;
          }
        }
      }
      .selected {
        display: flex;
        align-items: center;
        background: linear-gradient(8deg, #65b3e4 30.89%, rgba(255, 255, 255, 0) 111.27%);
        .mdi {
          color: white;
          padding: 0 1rem;
        }
      }
      &.active {
        box-shadow: 0px 0px 20px 0px rgba(120, 161, 187, 0.3);
      }
      @include phone {
        margin: 0 auto;
        min-height: 180px;
        max-width: 320px;
        width: 100%;
      }
    }
    @include phone {
      width: 100%;
      padding: 1rem;
    }
  }
  @include phone {
    width: 100%;
    min-height: 325px;
    border-radius: 40px 40px 0 0;
  }
}
</style>
