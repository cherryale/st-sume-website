import Link from 'next/link'

interface LogoProps {
  onClick?: () => void
}
export const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 no-underline z-99 p-4 pl-0"
      onClick={onClick}
    >
      <img width={80} src="/images/logo.svg" alt="Jé St Stume" />
    </Link>
  )
}
