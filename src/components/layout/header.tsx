"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { WireframeEarth } from "@/components/3d-css/wireframe-earth";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/launches", label: "Launches" },
  { href: "/solar-system", label: "Solar System" },
  { href: "/missions", label: "Missions" },
  { href: "/careers", label: "Careers" },
];

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <header className="relative z-50 flex items-center justify-between px-4 sm:px-6 lg:px-8 py-4 max-w-7xl mx-auto">
      {/* Logo — left */}
      <Link
        href="/"
        className="flex items-center gap-2 group shrink-0"
      >
        <div className="w-8 h-8 shrink-0">
          <WireframeEarth size={32} />
        </div>
        <span className="text-base font-bold tracking-wide">
          <span className="text-blue-electric">Spaced</span>
          <span className="text-foreground">Out</span>
        </span>
      </Link>

      {/* Desktop pill nav — right */}
      <nav
        className="hidden md:flex items-center h-[36px] rounded-full border border-glass-border bg-white/[0.06] backdrop-blur-md"
        aria-label="Main navigation"
      >
        <ul role="menubar" className="flex items-stretch h-full p-[3px] gap-[2px] list-none m-0">
          {NAV_ITEMS.map((item, i) => {
            const isActive = pathname === item.href;

            return (
              <li key={item.href} role="none" className="flex h-full">
                <Link
                  href={item.href}
                  role="menuitem"
                  className={cn(
                    "relative overflow-hidden inline-flex items-center justify-center h-full px-[14px]",
                    "rounded-full text-xs font-medium uppercase tracking-wider whitespace-nowrap",
                    "bg-white/[0.04] transition-colors duration-200"
                  )}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Hover circle that expands from bottom */}
                  <motion.span
                    className="absolute left-1/2 bottom-0 w-[200%] aspect-square rounded-full pointer-events-none"
                    style={{
                      background: "rgba(0, 212, 255, 0.15)",
                      originX: "50%",
                      originY: "100%",
                    }}
                    initial={false}
                    animate={{
                      scale: hovered === i ? 1.2 : 0,
                      x: "-50%",
                    }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    aria-hidden="true"
                  />

                  {/* Default label */}
                  <span
                    className={cn(
                      "relative z-[2] transition-all duration-300 ease-out",
                      hovered === i ? "-translate-y-8 opacity-0" : "translate-y-0 opacity-100",
                      isActive ? "text-blue-electric" : "text-foreground-muted"
                    )}
                  >
                    {item.label}
                  </span>

                  {/* Hover label (slides up) */}
                  <span
                    className={cn(
                      "absolute inset-0 z-[3] flex items-center justify-center transition-all duration-300 ease-out",
                      hovered === i ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                      "text-blue-electric"
                    )}
                    aria-hidden="true"
                  >
                    {item.label}
                  </span>

                  {/* Active dot */}
                  {isActive && (
                    <span
                      className="absolute left-1/2 -bottom-[5px] -translate-x-1/2 w-[6px] h-[6px] rounded-full bg-blue-electric z-[4]"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col items-center justify-center gap-1 w-[36px] h-[36px] rounded-full border border-glass-border bg-white/[0.06]"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
        aria-expanded={mobileOpen}
      >
        <motion.span
          className="w-3.5 h-0.5 rounded bg-foreground-muted block"
          animate={mobileOpen ? { rotate: 45, y: 3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
        <motion.span
          className="w-3.5 h-0.5 rounded bg-foreground-muted block"
          animate={mobileOpen ? { rotate: -45, y: -3 } : { rotate: 0, y: 0 }}
          transition={{ duration: 0.2 }}
        />
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="md:hidden absolute top-[56px] left-4 right-4 rounded-2xl border border-glass-border bg-background/95 backdrop-blur-lg shadow-glow z-50 overflow-hidden"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <ul className="list-none m-0 p-1.5 flex flex-col gap-0.5">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "block py-2.5 px-4 text-xs font-medium uppercase tracking-wider rounded-xl transition-all duration-200",
                        isActive
                          ? "bg-blue-electric/10 text-blue-electric"
                          : "text-foreground-muted hover:bg-white/5 hover:text-foreground"
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
