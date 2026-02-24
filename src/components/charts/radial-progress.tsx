"use client";

import { useId } from "react";
import { motion } from "framer-motion";

interface RadialProgressProps {
  value: number; // 0–100
  size?: number;
  strokeWidth?: number;
  label?: string;
  className?: string;
}

export function RadialProgress({
  value,
  size = 100,
  strokeWidth = 6,
  label,
  className,
}: RadialProgressProps) {
  const gradientId = useId();
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className={className}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
        />
        {/* Progress arc */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
        {/* Center value */}
        <text
          x={size / 2}
          y={size / 2}
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-blue-electric text-lg font-bold font-mono"
        >
          {value}%
        </text>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#0088ff" />
          </linearGradient>
        </defs>
      </svg>
      {label && (
        <p className="text-center text-xs text-foreground-muted mt-1">
          {label}
        </p>
      )}
    </div>
  );
}
