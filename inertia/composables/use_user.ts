import { usePage } from '@inertiajs/vue3'
import { SharedPageProps } from '#types/common'
import { computed } from 'vue'

export const useUser = () => {
  const shared = computed(() => usePage<SharedPageProps>().props)
  const user = computed(() => shared.value.user)
  const theme = computed(() => shared.value.theme)

  return {
    user,
    theme,
  }
}
