import { createStore } from 'vuex'

interface State {
  screenWidth: number
}

const screenWidthMod = createStore<State>({
  state: (): State => ({
    screenWidth: window.innerWidth
  }),
  getters: {
    isMobile(state: State) {
      return state.screenWidth <= 768
    }
  },
  mutations: {
    updateScreenWidth(state: State) {
      state.screenWidth = window.innerWidth
    }
  },
  actions: {
    handleResize({ commit }: { commit: Function }) {
      window.addEventListener('resize', () => {
        commit('updateScreenWidth')
      })
    }
  }
})

export default screenWidthMod
