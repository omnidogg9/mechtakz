import { computed } from 'vue'
import { useScreenStore } from '../../store/mediaScreen'

export function useIsMobile() {
  const screenStore = useScreenStore()

  const isMobile = computed(() => {
    return screenStore.isMobile
  })

  return { isMobile }
}
