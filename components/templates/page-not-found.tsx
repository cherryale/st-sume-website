'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import classNames from 'classnames'
import { Arrow } from '../svgs/arrow'
import { revealVariant } from '../../lib/animation'

const PageNotFound = () => {
  return (
    <div
      className={classNames(
        'relative z-2 min-h-screen py-10 px-5 md:px-10 2xl:px-20',
        'gap-20 2xl:gap-40 flex flex-co items-center justify-center text-center'
      )}
    >
      <motion.div
        variants={revealVariant}
        initial="initial"
        animate="animate"
        className="max-w-2xl"
      >
        <h1 className="eyebrow text-gray-500">Error 404</h1>
        <h2 className="uppercase text-4xl flex items-center justify-center text-center mt-2 mb-4">
          <span className="text-blue-500">P</span>
          age not found
        </h2>
        <p className="text-lg">
          The page you were looking for either does not exist or has been
          delete. Apologies for the inconvenience.
        </p>
        <Link href="/" className={classNames('button-outline mt-12 group')}>
          Back to Homepage
        </Link>
      </motion.div>
    </div>
  )
}
export default PageNotFound
