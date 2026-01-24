import { Menu, MenuQueryResult } from '../../sanity.types'
import { DesktopMenu } from '../desktop-menu/desktop-menu'

export const Header = ({ items, resume }: NonNullable<MenuQueryResult>) => {
  return (
    <header className="fixed flex justify-between top-0 left-0 w-full py-5 px-10 md:px-20">
      <p className="flex gap-2 eyebrow">
        <span className="text-blue-500">St</span>
        <span className="text-black-500">Sume</span>
      </p>
      {items && resume && <DesktopMenu items={items} resume={resume} />}
    </header>
  )
}
