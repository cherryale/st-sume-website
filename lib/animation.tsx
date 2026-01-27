import { Variants } from 'framer-motion'

export const revealVariant: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.19, 1, 0.22, 1]
    }
  }
}
