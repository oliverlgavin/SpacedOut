"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LaunchCard } from "./launch-card";
import { staggerContainer, slideUp, smooth } from "@/lib/constants/animation-presets";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import type { Launch } from "@/types/api";

const INITIAL_COUNT = 3;

export function LaunchGrid({ launches }: { launches: Launch[] }) {
  const { ref, isIntersecting } = useIntersectionObserver({ once: true });
  const [expanded, setExpanded] = useState(false);

  if (launches.length === 0) {
    return (
      <div className="glass rounded-xl p-12 text-center">
        <p className="text-foreground-muted">No launches found for this filter.</p>
      </div>
    );
  }

  const initial = launches.slice(0, INITIAL_COUNT);
  const extra = launches.slice(INITIAL_COUNT);
  const hasMore = extra.length > 0;

  return (
    <div>
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {initial.map((launch) => (
          <motion.div key={launch.id} variants={slideUp} transition={smooth}>
            <LaunchCard launch={launch} />
          </motion.div>
        ))}

        <AnimatePresence>
          {expanded &&
            extra.map((launch) => (
              <motion.div
                key={launch.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.4 }}
              >
                <LaunchCard launch={launch} />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>

      {hasMore && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm font-mono text-blue-electric hover:text-blue-electric/80 transition-colors tracking-wider uppercase"
          >
            {expanded
              ? "Show less"
              : `View ${extra.length} more launches`}
          </button>
        </div>
      )}
    </div>
  );
}
