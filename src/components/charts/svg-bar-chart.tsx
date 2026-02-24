"use client";

import { motion } from "framer-motion";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SVGBarChartProps {
  data: DataPoint[];
  height?: number;
  className?: string;
}

export function SVGBarChart({
  data,
  height = 200,
  className,
}: SVGBarChartProps) {
  if (data.length === 0) return null;

  const maxValue = Math.max(...data.map((d) => d.value));
  const barWidth = 32;
  const gap = 16;
  const totalWidth = data.length * (barWidth + gap) - gap;
  const padding = 40;

  return (
    <svg
      viewBox={`0 0 ${totalWidth + padding * 2} ${height + 50}`}
      className={className}
      role="img"
      aria-label="Bar chart"
    >
      <defs>
        <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#00d4ff" stopOpacity={0.8} />
          <stop offset="100%" stopColor="#0088ff" stopOpacity={0.3} />
        </linearGradient>
      </defs>

      {data.map((point, i) => {
        const barHeight = maxValue > 0 ? (point.value / maxValue) * height : 0;
        const x = padding + i * (barWidth + gap);
        const y = height - barHeight;

        return (
          <g key={point.label}>
            <motion.rect
              x={x}
              y={height}
              width={barWidth}
              rx={4}
              fill={point.color || "url(#barGradient)"}
              initial={{ height: 0, y: height }}
              animate={{ height: barHeight, y }}
              transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
            />
            <text
              x={x + barWidth / 2}
              y={height + 20}
              textAnchor="middle"
              className="fill-foreground-muted text-[10px]"
            >
              {point.label}
            </text>
            <motion.text
              x={x + barWidth / 2}
              y={y - 8}
              textAnchor="middle"
              className="fill-blue-electric text-xs font-mono"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            >
              {point.value}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}
