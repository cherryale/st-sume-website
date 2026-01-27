import Link from 'next/link'

interface LogoProps {
  onClick?: () => void
}
export const Logo = ({ onClick }: LogoProps) => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 eyebrow no-underline z-99"
      onClick={onClick}
    >
      <img width={60} src="/images/logo.svg" alt="Jé St Stume" />
    </Link>
  )
}
