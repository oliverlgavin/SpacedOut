"use client";

import { cn } from "@/lib/utils/cn";
import { useEffect, useRef, useState } from "react";

function CountAnimation({
  number,
  className,
}: {
  number: number;
  className?: string;
}) {
  const [display, setDisplay] = useState(number);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const duration = 3500;
    const start = performance.now();
    const startVal = 0;

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(startVal + (number - startVal) * eased));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    }

    frameRef.current = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(frameRef.current);
  }, [number]);

  return (
    <span className={cn(className)}>
      {display}
    </span>
  );
}

export { CountAnimation };
