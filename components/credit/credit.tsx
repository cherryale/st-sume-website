import Link from 'next/link'

export const Credit = () => {
  return (
    <div className="relative z-2 bg-black-500 px-5 md:px-10 2xl:px-20 py-2 text-center text-xs text-gray-400 flex items-center justify-center gap-2">
      Designed & developed by{' '}
      <Link href="http://cherryale.dev/" target="_blank">
        <img src="images/credit.svg" alt="Logo of Cherry Ale" />
      </Link>
    </div>
  )
}
