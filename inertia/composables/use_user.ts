import { type SharedProps } from '@adonisjs/inertia/types'
import { usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

export const useUser = () => {
  const shared = computed(() => usePage<SharedProps>().props)
  const user = computed(() => shared.value.user)
  const theme = computed(() => shared.value.theme)

  return {
    user,
    theme,
  }
}
