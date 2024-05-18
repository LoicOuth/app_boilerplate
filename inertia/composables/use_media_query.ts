import { onMounted, onUnmounted, ref } from 'vue'

export const useMediaQuery = () => {
  const isDesktop = ref(false)
  const isMobile = ref(false)

  const desktopQuery = '(min-width: 1024px)'
  const mobileQuery = '(max-width: 1023px)'

  const updateMatches = () => {
    const desktopQueryList = window.matchMedia(desktopQuery)
    const mobileQueryList = window.matchMedia(mobileQuery)

    isDesktop.value = desktopQueryList.matches
    isMobile.value = mobileQueryList.matches
  }

  onMounted(() => {
    updateMatches()
    window.matchMedia(desktopQuery).addEventListener('change', updateMatches)
    window.matchMedia(mobileQuery).addEventListener('change', updateMatches)

    onUnmounted(() => {
      window.matchMedia(desktopQuery).removeEventListener('change', updateMatches)
      window.matchMedia(mobileQuery).removeEventListener('change', updateMatches)
    })
  })

  return { isDesktop, isMobile }
}
