import { defineStore } from 'pinia'
interface Delivery {
  city: string
  type: string
  available: boolean
  price: number
}

export const useDeliveryStore = defineStore({
  id: 'delivery',
  state: () => ({
    deliveryOptions: [] as Delivery[]
  }),
  actions: {
    setDeliveryOptions(options: Delivery[]) {
      this.$patch({ deliveryOptions: options })
    }
  },
  getters: {
    getDeliveryOptions(): Delivery[] {
      return this.deliveryOptions
    }
  }
})
