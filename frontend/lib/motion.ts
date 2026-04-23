/**
 * Framer Motion Animation Presets
 * Used for consistent, premium feel across all pages
 */

import { Variants } from "framer-motion";

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.3 } },
}

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, y: 24, transition: { duration: 0.3 } },
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3 } },
}

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.3 } },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, scale: 0.92, transition: { duration: 0.3 } },
}

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, x: -24, transition: { duration: 0.3 } },
}

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 24 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, x: 24, transition: { duration: 0.3 } },
}

export const slideInDown: Variants = {
  hidden: { opacity: 0, y: -24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, y: -24, transition: { duration: 0.3 } },
}

export const slideInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
  exit: { opacity: 0, y: 24, transition: { duration: 0.3 } },
}

/**
 * Container + Children Stagger
 * Use on parent with motion.div + animate="visible"
 */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

export const staggerContainerFast = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.05,
    },
  },
}

/**
 * Glow Pulse (for attention-grabbing elements)
 */
export const glowPulse = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Bounce (for CTAs)
 */
export const bounce = {
  hidden: { y: 0 },
  visible: {
    y: [0, -8, 0],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Rotate (for loading states, icons)
 */
export const rotate = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 360,
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
    },
  },
}

/**
 * Float (ambient animation)
 */
export const float = {
  hidden: { y: 0 },
  visible: {
    y: [0, -12, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/**
 * Number Counter (for scores, stats)
 */
export const counterAnimation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}
