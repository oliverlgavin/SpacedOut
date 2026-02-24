"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import { AGENCIES } from "@/lib/constants/agencies";

export function AgencyStrip() {
  return (
    <section className="py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-xs font-mono text-foreground-muted text-center uppercase tracking-[0.25em] mb-2">
          Tracking All Major Space Agencies
        </p>
        <p className="text-xs text-foreground-muted/60 text-center mb-8">
          Click an agency to learn more about their missions and history
        </p>

        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide justify-center flex-wrap">
          {AGENCIES.map((agency, i) => (
            <motion.div
              key={agency.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
            >
              <Link
                href={`/agencies/${agency.slug}`}
                className={cn(
                  "glass glass-hover rounded-lg px-5 py-3 flex items-center gap-3 shrink-0",
                  "cursor-pointer select-none transition-all duration-200",
                  "hover:border-glow"
                )}
              >
                <div
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: agency.color }}
                />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {agency.abbrev}
                  </p>
                  <p className="text-[10px] text-foreground-muted">
                    {agency.country}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
