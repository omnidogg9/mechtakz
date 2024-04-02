import { defineStore } from 'pinia'

export const useScreenStore = defineStore({
  id: 'screen',
  state: () => ({
    width: window.innerWidth
  }),
  actions: {
    updateWidth() {
      this.width = window.innerWidth
    }
  },
  getters: {
    isMobile: (state) => {
      return state.width <= 768
    }
  }
})

window.addEventListener('resize', () => {
  useScreenStore().updateWidth()
})
