"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface BounceCardsProps {
  className?: string;
  images?: string[];
  containerWidth?: number;
  containerHeight?: number;
  animationDelay?: number;
  animationStagger?: number;
  easeType?: string;
  transformStyles?: string[];
  enableHover?: boolean;
}

/**
 * Parse a transform string like "rotate(6deg) translate(-120px)"
 * into { rotate, x } values for Framer Motion.
 */
function parseTransform(t: string) {
  const rotateMatch = t.match(/rotate\(([-\d.]+)deg\)/);
  const translateMatch = t.match(/translate\(([-\d.]+)px\)/);
  return {
    rotate: rotateMatch ? parseFloat(rotateMatch[1]) : 0,
    x: translateMatch ? parseFloat(translateMatch[1]) : 0,
  };
}

const ELASTIC_TRANSITION = {
  type: "spring" as const,
  stiffness: 200,
  damping: 12,
  mass: 0.8,
};

const HOVER_TRANSITION = {
  type: "spring" as const,
  stiffness: 300,
  damping: 20,
};

export default function BounceCards({
  className = "",
  images = [],
  containerWidth = 400,
  containerHeight = 400,
  animationDelay = 0.5,
  animationStagger = 0.06,
  transformStyles = [
    "rotate(6deg) translate(-120px)",
    "rotate(-2deg)",
    "rotate(-6deg) translate(120px)",
  ],
  enableHover = false,
}: BounceCardsProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const parsed = transformStyles.map(parseTransform);

  function getAnimateValues(idx: number) {
    const base = parsed[idx] || { rotate: 0, x: 0 };

    if (!enableHover || hoveredIdx === null) {
      return { scale: 1, rotate: base.rotate, x: base.x };
    }

    if (idx === hoveredIdx) {
      // Hovered card: remove rotation, keep translate
      return { scale: 1, rotate: 0, x: base.x };
    }

    // Siblings: push away
    const offsetX = idx < hoveredIdx ? -60 : 60;
    return { scale: 1, rotate: base.rotate, x: base.x + offsetX };
  }

  return (
    <div
      className={`relative flex items-center justify-center ${className}`}
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
    >
      {images.map((src, idx) => {
        const base = parsed[idx] || { rotate: 0, x: 0 };
        const animate = getAnimateValues(idx);

        return (
          <motion.div
            key={idx}
            className="absolute w-[200px] aspect-square border-2 border-white/10 rounded-2xl overflow-hidden"
            style={{
              boxShadow:
                "0 4px 20px rgba(0, 0, 0, 0.4), 0 0 40px rgba(0, 212, 255, 0.05)",
            }}
            initial={{ scale: 0, rotate: base.rotate, x: base.x }}
            animate={animate}
            transition={
              hoveredIdx !== null
                ? HOVER_TRANSITION
                : {
                    ...ELASTIC_TRANSITION,
                    delay: animationDelay + idx * animationStagger,
                  }
            }
            onMouseEnter={() => enableHover && setHoveredIdx(idx)}
            onMouseLeave={() => enableHover && setHoveredIdx(null)}
          >
            <img
              className="w-full h-full object-cover"
              src={src}
              alt={`Gallery image ${idx + 1}`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
