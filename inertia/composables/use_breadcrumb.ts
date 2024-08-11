import { BreadcrumbItem } from '#types/common'
import { ref } from 'vue'
import i18n from '~/plugins/i18n'

const { t } = i18n.global

const firstsBreadcrumbProfileItem: BreadcrumbItem[] = [
  {
    href: '/',
    label: t('defaultBreadcrumb.home'),
  },
  {
    href: '/me/details',
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
