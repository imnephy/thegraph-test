import { type FC, lazy, type SVGAttributes, type SVGProps } from 'react'

const unistory = lazy(() => import('./unistory.svg'))

const ICONS_MAP = {
  unistory,
} as const

export type IconsTypes = keyof typeof ICONS_MAP

export interface IIconComponentProperties extends SVGAttributes<SVGElement> {
  name: IconsTypes
}

export const IconComponent = ({ name, ...props }: IIconComponentProperties) => {
  const Icon = ICONS_MAP[name] as FC<SVGProps<SVGSVGElement>>
  if (!Icon) return null

  return <Icon role="img" {...props} />
}
