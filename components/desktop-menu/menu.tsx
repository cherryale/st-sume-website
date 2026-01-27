import { MenuQueryResult } from '../../sanity.types'
import { DesktopMenu } from './desktop-menu'
import { MobileMenu } from './mobile-menu'

export interface MenuProps {
  modifierClasses?: string
  items: NonNullable<NonNullable<MenuQueryResult>['items']>
  resume: string
  isMobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

export const Menu = ({
  isMobile,
  ...props
}: MenuProps & {
  isMobile: boolean
}) => {
  return isMobile ? <MobileMenu {...props} /> : <DesktopMenu {...props} />
}
