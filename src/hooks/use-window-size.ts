"use client";

import { useEffect, useState } from "react";

interface WindowSize {
  width: number;
  height: number;
}

export function useWindowSize(): WindowSize {
  const [size, setSize] = useState<WindowSize>({
    width: 1200,
    height: 800,
  });

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    function handleResize() {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setSize({ width: window.innerWidth, height: window.innerHeight });
      }, 150);
    }

    // Set initial size in a microtask to satisfy react-hooks/set-state-in-effect
    const initTimeout = setTimeout(() => {
      setSize({ width: window.innerWidth, height: window.innerHeight });
    }, 0);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      clearTimeout(initTimeout);
    };
  }, []);

  return size;
}
