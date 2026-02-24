"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import type { CareerCategory } from "@/lib/constants/careers";

export function CareerSection({ category }: { category: CareerCategory }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground mb-1">
        {category.name}
      </h2>
      <p className="text-xs text-foreground-muted mb-4">
        {category.description}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {category.links.map((link) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <GlassPanel
              hover
              className="h-full p-4 transition-all duration-200 group-hover:border-glow"
            >
              <div className="flex items-start gap-3">
                <div
                  className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                  style={{ backgroundColor: link.color }}
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-semibold text-foreground group-hover:text-blue-electric transition-colors truncate">
                      {link.title}
                    </h3>
                    <svg
                      className="w-3 h-3 text-foreground-muted shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                  <span
                    className="inline-block text-[9px] font-mono uppercase tracking-widest px-1.5 py-0.5 rounded mb-2"
                    style={{
                      backgroundColor: `${link.color}15`,
                      color: link.color,
                    }}
                  >
                    {link.org}
                  </span>
                  <p className="text-xs text-foreground-muted leading-relaxed">
                    {link.description}
                  </p>
                </div>
              </div>
            </GlassPanel>
          </a>
        ))}
      </div>
    </section>
  );
}
