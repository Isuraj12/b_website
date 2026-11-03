import { Variants } from "framer-motion";

export const fadeIn: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

export const gentleFloat: Variants = {
  animate: {
    y: [-4, 6, -4],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export const envelopeFlap: Variants = {
  closed: { rotateX: 0 },
  open: {
    rotateX: 180,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] },
  },
};

export const letterSlideUp: Variants = {
  initial: { y: 40, opacity: 0 },
  revealed: {
    y: -40,
    opacity: 1,
    transition: { delay: 0.4, duration: 0.8, ease: "easeOut" },
  },
};
