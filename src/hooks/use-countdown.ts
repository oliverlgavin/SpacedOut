"use client";

import { useEffect, useState } from "react";

interface CountdownValue {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
  total: number; // total ms remaining
}

export function useCountdown(targetDate: string | Date): CountdownValue {
  const [countdown, setCountdown] = useState<CountdownValue>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
    total: 1,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(calculate(targetDate));
    }, 1000);

    // Initial calculation on mount
    const timeout = setTimeout(() => setCountdown(calculate(targetDate)), 0);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [targetDate]);

  return countdown;
}

function calculate(targetDate: string | Date): CountdownValue {
  const target = new Date(targetDate).getTime();
  const now = Date.now();
  const diff = target - now;

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true, total: 0 };
  }

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
    isPast: false,
    total: diff,
  };
}
