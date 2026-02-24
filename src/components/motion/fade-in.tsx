"use client";

import { motion } from "framer-motion";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { slideUp, smooth } from "@/lib/constants/animation-presets";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const { ref, isIntersecting } = useIntersectionObserver({ once: true });

  return (
    <motion.div
      ref={ref}
      variants={slideUp}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      transition={{ ...smooth, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
