import type { Variants, Transition } from "framer-motion";

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const smooth: Transition = {
  duration: 0.5,
  ease: "easeOut",
};
