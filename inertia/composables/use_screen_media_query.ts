import { useMediaQuery } from '@vueuse/core'
import { computed } from 'vue'

export const useScreenMediaQuery = () => {
  const mdAndUp = useMediaQuery('(min-width: 768px)')
  const mdAndDown = computed(() => !mdAndUp.value)

  return {
    mdAndUp,
    mdAndDown,
  }
}
