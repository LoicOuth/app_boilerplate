import type { RouteName } from '@tuyau/client'
import { api } from '../.adonisjs/index.js'
import type * as icons from 'lucide-vue-next'

export interface SvgProps {
  height?: number
  width?: number
  class?: string
}

export type RouteNameType = RouteName<(typeof api)['routes']>

export interface BreadcrumbItem {
  route: RouteNameType
  label: string
}

export const AuthProviderNamesArray = ['google'] as const
export type AuthProviderNames = (typeof AuthProviderNamesArray)[number]

export type IconName = keyof typeof icons
