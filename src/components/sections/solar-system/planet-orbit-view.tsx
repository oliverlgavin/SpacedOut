"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PLANETS, SUN, type PlanetData } from "@/lib/constants/planets";
import { PlanetDetail } from "./planet-card";
import { cn } from "@/lib/utils/cn";

/* ── Display sizes (px) ── */
const DISPLAY_SIZES: Record<string, number> = {
  Mercury: 24,
  Venus: 34,
  Earth: 36,
  Mars: 28,
  Jupiter: 72,
  Saturn: 64,
  Uranus: 46,
  Neptune: 44,
};

/*
 * Top-down orbital view with perspective tilt (ry/rx ≈ 0.4).
 * Sun at centre, planets at various angles on their orbits.
 * Positions computed from the parametric ellipse so every planet
 * sits exactly on its orbit line.
 */
const SVG_W = 1200;
const SVG_H = 700;
const SUN_POS = { x: 600, y: 330 };

const ORBIT_DATA = [
  { rx: 100, ry: 40, angle: 120 },  // Mercury — lower-left
  { rx: 160, ry: 64, angle: 300 },  // Venus   — upper-right
  { rx: 225, ry: 90, angle: 200 },  // Earth   — left
  { rx: 290, ry: 116, angle: 350 }, // Mars    — right
  { rx: 380, ry: 152, angle: 160 }, // Jupiter — lower-left
  { rx: 450, ry: 180, angle: 30 },  // Saturn  — lower-right
  { rx: 520, ry: 208, angle: 240 }, // Uranus  — upper-left
  { rx: 580, ry: 232, angle: 80 },  // Neptune — lower-right
];

function orbitPosition(orbit: (typeof ORBIT_DATA)[number]) {
  const rad = (orbit.angle * Math.PI) / 180;
  return {
    x: SUN_POS.x + orbit.rx * Math.cos(rad),
    y: SUN_POS.y + orbit.ry * Math.sin(rad),
  };
}

function pct(svgX: number, svgY: number) {
  return { left: `${(svgX / SVG_W) * 100}%`, top: `${(svgY / SVG_H) * 100}%` };
}

export function PlanetOrbitView() {
  const [selected, setSelected] = useState<PlanetData | null>(null);
  const detailRef = useRef<HTMLDivElement>(null);

  function handleSelect(planet: PlanetData) {
    const next = selected?.name === planet.name ? null : planet;
    setSelected(next);
    if (next && detailRef.current) {
      setTimeout(() => {
        detailRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    }
  }

  const sunPct = pct(SUN_POS.x, SUN_POS.y);

  return (
    <div className="w-full">
      {/* Scene */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(500px, 72vh, 800px)" }}
      >
        {/* ── Orbit ellipses ── */}
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          {ORBIT_DATA.map((o, i) => (
            <ellipse
              key={i}
              cx={SUN_POS.x}
              cy={SUN_POS.y}
              rx={o.rx}
              ry={o.ry}
              fill="none"
              stroke={`rgba(0, 212, 255, ${(0.06 + i * 0.012).toFixed(3)})`}
              strokeWidth={i < 3 ? 0.8 : 1.1}
            />
          ))}
        </svg>

        {/* ── Sun ── */}
        <div
          className="absolute z-10 flex flex-col items-center"
          style={{ ...sunPct, transform: "translate(-50%, -50%)" }}
        >
          <button
            onClick={() => handleSelect(SUN)}
            className={cn(
              "relative group cursor-pointer transition-transform duration-300",
              "hover:scale-105",
              selected?.name === "Sun" && "scale-105"
            )}
            aria-label="Select Sun"
          >
            <div
              className="absolute -inset-10 rounded-full animate-pulse-glow"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,180,30,0.2) 0%, rgba(255,120,0,0.08) 40%, transparent 70%)",
              }}
            />
            <div
              className={cn(
                "relative w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-full overflow-hidden transition-all duration-300",
                selected?.name === "Sun" && "ring-2 ring-yellow-400/40"
              )}
              style={{
                boxShadow:
                  "0 0 30px rgba(255,200,50,0.5), 0 0 70px rgba(255,140,0,0.25), 0 0 110px rgba(255,100,0,0.1)",
              }}
            >
              <img src="/planets/sun.webp" alt="Sun" className="w-full h-full object-cover" />
            </div>
          </button>
          <span
            className={cn(
              "text-[10px] sm:text-xs font-mono mt-1.5 transition-colors duration-200",
              selected?.name === "Sun" ? "text-foreground" : "text-foreground-muted"
            )}
          >
            Sun
          </span>
        </div>

        {/* ── Planets ── */}
        {PLANETS.map((planet, i) => {
          const size = DISPLAY_SIZES[planet.name] ?? 36;
          const pos = orbitPosition(ORBIT_DATA[i]);
          const css = pct(pos.x, pos.y);
          const isSelected = selected?.name === planet.name;

          const isSaturn = planet.name === "Saturn";

          return (
            <motion.div
              key={planet.name}
              className="absolute z-10"
              style={{
                ...css,
                transform: "translate(-50%, -50%)",
                ...(isSaturn ? { mixBlendMode: "screen" as const } : {}),
              }}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.45, delay: i * 0.07 }}
            >
              <button
                onClick={() => handleSelect(planet)}
                className="group flex flex-col items-center gap-1 cursor-pointer"
                aria-label={`Select ${planet.name}`}
              >
                <div className="relative">
                  {/* Selection / hover glow */}
                  {planet.name !== "Saturn" && (
                    <div
                      className={cn(
                        "absolute -inset-1.5 rounded-full transition-all duration-300",
                        isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-70"
                      )}
                      style={{
                        boxShadow: `0 0 ${isSelected ? "18px" : "10px"} ${
                          isSelected ? "rgba(0,212,255,0.55)" : planet.color + "40"
                        }`,
                        border: isSelected
                          ? "1.5px solid rgba(0,212,255,0.45)"
                          : "1.5px solid transparent",
                        borderRadius: "9999px",
                      }}
                    />
                  )}
                  {planet.name === "Saturn" ? (
                    /* Saturn — no circle clip, wider for rings, blend away black bg */
                    <div
                      className={cn(
                        "relative transition-transform duration-300",
                        "group-hover:scale-110",
                        isSelected && "scale-110"
                      )}
                      style={{
                        width: `${size * 2.4}px`,
                        height: `${size}px`,
                      }}
                    >
                      <img
                        src={planet.image}
                        alt={planet.name}
                        className="w-full h-full object-contain"
                        draggable={false}
                      />
                    </div>
                  ) : (
                    <div
                      className={cn(
                        "relative rounded-full overflow-hidden transition-transform duration-300",
                        "group-hover:scale-110",
                        isSelected && "scale-110"
                      )}
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        boxShadow: `0 0 ${isSelected ? "20px" : "8px"} ${planet.color}35`,
                      }}
                    >
                      <img
                        src={planet.image}
                        alt={planet.name}
                        className="w-full h-full object-cover"
                        draggable={false}
                      />
                    </div>
                  )}
                </div>

                <span
                  className={cn(
                    "text-[10px] sm:text-xs font-mono transition-colors duration-200 mt-0.5",
                    isSelected
                      ? "text-foreground"
                      : "text-foreground-muted group-hover:text-foreground"
                  )}
                >
                  {planet.name}
                </span>

              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Detail panel */}
      <div ref={detailRef}>
        <AnimatePresence mode="wait">
          {selected && (
            <PlanetDetail
              key={selected.name}
              planet={selected}
              onClose={() => setSelected(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
