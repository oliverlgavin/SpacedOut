"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GlassPanel } from "@/components/ui/glass-panel";
import type { AgencyInfo } from "@/lib/constants/agencies";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export function AgencyDetail({ agency }: { agency: AgencyInfo }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-xs font-mono text-foreground-muted hover:text-blue-electric transition-colors mb-8"
      >
        <span>&larr;</span> Back to Dashboard
      </Link>

      {/* Header */}
      <motion.div
        className="flex items-start gap-6 mb-12"
        {...fadeUp}
        transition={{ duration: 0.5 }}
      >
        <div
          className="w-16 h-16 rounded-2xl shrink-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, ${agency.color}40, ${agency.color}15)`,
            border: `1px solid ${agency.color}50`,
          }}
        >
          <span className="text-2xl font-bold" style={{ color: agency.color }}>
            {agency.abbrev.charAt(0)}
          </span>
        </div>
        <div>
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            {agency.abbrev}
          </h1>
          <p className="text-foreground-muted text-sm mt-1">{agency.name}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full glass text-foreground-muted">
              Est. {agency.founded}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full glass text-foreground-muted">
              {agency.country}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded-full glass text-foreground-muted">
              {agency.headquarters}
            </span>
          </div>
        </div>
      </motion.div>

      {/* Quick stats */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {[
          { label: "Founded", value: String(agency.founded) },
          { label: "Director", value: agency.director },
          ...(agency.employees
            ? [{ label: "Employees", value: agency.employees }]
            : []),
          ...(agency.budget
            ? [{ label: "Budget", value: agency.budget }]
            : []),
        ].map((stat) => (
          <GlassPanel key={stat.label} className="p-4 text-center">
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
            <p className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted mt-1">
              {stat.label}
            </p>
          </GlassPanel>
        ))}
      </motion.div>

      {/* About */}
      <motion.div
        className="mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground-muted mb-4">
          About
        </h2>
        <GlassPanel>
          <p className="text-foreground-muted leading-relaxed text-sm">
            {agency.description}
          </p>
        </GlassPanel>
      </motion.div>

      {/* History */}
      <motion.div
        className="mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground-muted mb-4">
          History
        </h2>
        <GlassPanel>
          <p className="text-foreground-muted leading-relaxed text-sm">
            {agency.history}
          </p>
        </GlassPanel>
      </motion.div>

      {/* Values */}
      <motion.div
        className="mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground-muted mb-4">
          Core Values &amp; Mission
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {agency.values.map((value, i) => (
            <GlassPanel key={i} className="p-4 flex items-center gap-3">
              <div
                className="w-2 h-2 rounded-full shrink-0"
                style={{ backgroundColor: agency.color }}
              />
              <p className="text-sm text-foreground">{value}</p>
            </GlassPanel>
          ))}
        </div>
      </motion.div>

      {/* Notable Missions */}
      <motion.div
        className="mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground-muted mb-4">
          Notable Missions
        </h2>
        <div className="space-y-3">
          {agency.notableMissions.map((mission, i) => (
            <GlassPanel key={i} className="p-5">
              <div className="flex items-baseline justify-between gap-4 mb-2">
                <h3 className="text-base font-semibold text-foreground">
                  {mission.name}
                </h3>
                <span
                  className="text-[10px] font-mono shrink-0 px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${agency.color}20`,
                    color: agency.color,
                  }}
                >
                  {mission.year}
                </span>
              </div>
              <p className="text-sm text-foreground-muted leading-relaxed">
                {mission.description}
              </p>
            </GlassPanel>
          ))}
        </div>
      </motion.div>

      {/* Key Achievements */}
      <motion.div
        className="mb-12"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.35 }}
      >
        <h2 className="text-xs font-mono uppercase tracking-[0.25em] text-foreground-muted mb-4">
          Key Achievements
        </h2>
        <GlassPanel>
          <ul className="space-y-3">
            {agency.keyAchievements.map((achievement, i) => (
              <li key={i} className="flex items-start gap-3">
                <div
                  className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: agency.color }}
                />
                <p className="text-sm text-foreground-muted">
                  {achievement}
                </p>
              </li>
            ))}
          </ul>
        </GlassPanel>
      </motion.div>

      {/* Website link */}
      <motion.div
        className="text-center"
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <a
          href={`https://${agency.website}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-mono text-blue-electric hover:text-foreground transition-colors"
        >
          Visit {agency.website} &rarr;
        </a>
      </motion.div>
    </div>
  );
}
