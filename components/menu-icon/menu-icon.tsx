import Image from 'next/image'

interface MenuIconProps {
  handleClick: () => void
  isOpen: boolean
}
export const MenuIcon = ({ handleClick, isOpen }: MenuIconProps) => {
  return (
    <button
      className="w-10 py-3 border-none cursor-pointer flex items-center justify-center z-99"
      onClick={handleClick}
      aria-label="Toggle menu"
    >
      {isOpen ? (
        <Image
          width="14"
          height="14"
          src="images/menu-close.svg"
          alt="Mobile menu icon"
        />
      ) : (
        <Image
          width="20"
          height="20"
          src="images/menu-open.svg"
          alt="Mobile menu icon"
        />
      )}
    </button>
  )
}
