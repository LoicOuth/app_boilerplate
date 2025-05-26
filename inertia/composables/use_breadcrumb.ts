import { type BreadcrumbItem } from '#types/common'
import { ref } from 'vue'
import i18n from '~/plugins/i18n'

const { t } = i18n.global

const firstsBreadcrumbProfileItem: BreadcrumbItem[] = [
  {
    route: 'home.index',
    label: t('defaultBreadcrumb.home'),
  },
  {
    route: 'me.details.render',
    label: t('defaultBreadcrumb.details'),
  },
]
const breadcrumbProfileItems = ref<BreadcrumbItem[]>([])

export const useProfileBreadcrumb = () => {
  const setBreadCrumb = (breadCrumbItems: BreadcrumbItem[]) => {
    breadcrumbProfileItems.value = [...firstsBreadcrumbProfileItem, ...breadCrumbItems]
  }

  return {
    breadcrumbProfileItems,
    setBreadCrumb,
  }
}
