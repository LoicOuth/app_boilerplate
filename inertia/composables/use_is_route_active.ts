import { type RouteNameType } from '#types/common'
import { tuyau } from '~/plugins/tuyau'

export const useIsRouteActive = (route: RouteNameType) => {
  const isActive = ref<boolean>(false)
  const url = computed(() => usePage().url)

  watch(
    url,
    () => {
      isActive.value = !!tuyau.$current(route)
    },
    { immediate: true }
  )

  return isActive
}
