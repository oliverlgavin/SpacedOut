"use client";

import { cn } from "@/lib/utils/cn";

/**
 * CSS 3D wireframe Earth.
 * Creates a sphere from overlapping circular divs in 3D space.
 * No Three.js, no WebGL — pure CSS transforms.
 *
 * Latitude lines: circles rotated on X axis
 * Longitude lines: circles rotated on Y axis
 * Parent container rotates slowly on Y axis for orbital effect.
 */
export function WireframeEarth({
  size = 300,
  className,
}: {
  size?: number;
  className?: string;
}) {
  const isSmall = size <= 64;
  const latitudes = isSmall ? 5 : 9;
  const longitudes = isSmall ? 6 : 12;

  return (
    <div
      className={cn("relative", className)}
      style={{
        perspective: "1000px",
        width: size,
        height: size,
      }}
    >
      {/* Outer glow */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Rotating sphere container */}
      <div
        className="absolute inset-0"
        style={{
          transformStyle: "preserve-3d",
          animation: "earthSpin 30s linear infinite",
        }}
      >
        {/* Latitude rings */}
        {Array.from({ length: latitudes }).map((_, i) => {
          const angle = ((i - Math.floor(latitudes / 2)) * 180) / latitudes;
          const scale = Math.cos((angle * Math.PI) / 180);
          return (
            <div
              key={`lat-${i}`}
              className="absolute rounded-full border border-blue-electric/25"
              style={{
                width: size * scale,
                height: size * scale,
                left: (size - size * scale) / 2,
                top: (size - size * scale) / 2,
                transformStyle: "preserve-3d",
                transform: `rotateX(90deg) translateZ(${
                  Math.sin((angle * Math.PI) / 180) * (size / 2)
                }px)`,
              }}
            />
          );
        })}

        {/* Longitude rings */}
        {Array.from({ length: longitudes }).map((_, i) => (
          <div
            key={`lon-${i}`}
            className="absolute inset-0 rounded-full border border-blue-electric/20"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateY(${(i * 180) / longitudes}deg)`,
            }}
          />
        ))}

        {/* Equator highlight */}
        <div
          className="absolute rounded-full border-2 border-blue-electric/40"
          style={{
            width: size,
            height: size,
            left: 0,
            top: 0,
            transformStyle: "preserve-3d",
            transform: "rotateX(90deg)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes earthSpin {
          from {
            transform: rotateX(-20deg) rotateY(0deg);
          }
          to {
            transform: rotateX(-20deg) rotateY(360deg);
          }
        }
      `}</style>
    </div>
  );
}
