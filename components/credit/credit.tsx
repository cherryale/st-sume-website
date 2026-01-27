import Link from 'next/link'

export const Credit = () => {
  return (
    <div className="relative z-2 bg-black-500 px-5 md:px-10 lg:px-20 py-2 text-center text-xs text-grey-100/70 flex items-center justify-center gap-4">
      Designed & developed by{' '}
      <Link href="http://cherryale.dev/" target="_blank">
        <img src="images/cherry-ale.svg" alt="Logo of Cherry Ale" />
      </Link>
    </div>
  )
}
