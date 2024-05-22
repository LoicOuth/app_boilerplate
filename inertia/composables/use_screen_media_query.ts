import { useMediaQuery } from '@vueuse/core'

export const useScreenMediaQuery = () => {
  const mdAndUp = useMediaQuery('(min-width: 768px)')
  const mdAndDown = useMediaQuery('(max-width: 768px)')

  return {
    mdAndUp,
    mdAndDown,
  }
}
