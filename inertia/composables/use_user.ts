import { type SharedProps } from '@adonisjs/inertia/types'

export const useUser = () => {
  const shared = computed(() => usePage<SharedProps>().props)
  const user = computed(() => shared.value.user)

  return {
    user,
  }
}
