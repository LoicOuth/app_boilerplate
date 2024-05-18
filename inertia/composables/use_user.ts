import { usePage } from '@inertiajs/vue3'
import { SharedPageProps } from '#types/common'
import { computed } from 'vue'
import { Theme } from '#types/theme'

export const useUser = () => {
  const shared = computed(() => usePage<SharedPageProps>().props)
  const theme = computed(() => shared.value.theme)
  const isThemeDark = computed(() => {
    return theme.value === Theme.Dark
  })

  return {
    theme,
    isThemeDark,
  }
}
