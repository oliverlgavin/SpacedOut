"use client";

import Image from "next/image";
import { GlassPanel } from "@/components/ui/glass-panel";
import { FadeIn } from "@/components/motion/fade-in";
import type { NasaApod } from "@/types/api";

export function ApodSection({ apod }: { apod: NasaApod }) {
  const isVideo = apod.media_type === "video";

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn>
          <p className="text-xs font-mono text-blue-electric tracking-[0.25em] uppercase mb-2">
            NASA Astronomy Picture of the Day
          </p>
          <h2 className="text-2xl font-bold mb-2">{apod.title}</h2>
          <p className="text-xs text-foreground-muted font-mono mb-6">
            {apod.date}
            {apod.copyright && <span> &middot; {apod.copyright}</span>}
          </p>
        </FadeIn>

        <FadeIn delay={0.15}>
          <GlassPanel className="overflow-hidden p-0">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-0">
              {/* Image / Video */}
              <div className="lg:col-span-3 relative">
                {isVideo ? (
                  <div className="relative w-full aspect-video">
                    <iframe
                      src={apod.url}
                      title={apod.title}
                      className="absolute inset-0 w-full h-full"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[16/10]">
                    <Image
                      src={apod.hdurl || apod.url}
                      alt={apod.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      priority
                    />
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="lg:col-span-2 p-6 flex flex-col">
                <p className="text-sm text-foreground-muted leading-relaxed flex-1">
                  {apod.explanation}
                </p>
                {!isVideo && apod.hdurl && (
                  <a
                    href={apod.hdurl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs text-blue-electric hover:text-blue-electric/80 transition-colors mt-4 font-mono"
                  >
                    View full resolution
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </GlassPanel>
        </FadeIn>
      </div>
    </section>
  );
}
