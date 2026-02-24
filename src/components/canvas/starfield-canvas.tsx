"use client";

import { useEffect, useRef, useCallback } from "react";

interface Star {
  x: number;
  y: number;
  z: number;
  size: number;
}

/**
 * Performance-optimized canvas starfield.
 * Uses requestAnimationFrame with a single draw loop.
 * Star count is reduced on mobile for better performance.
 */
export function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animRef = useRef<number>(0);

  const initStars = useCallback((width: number, height: number) => {
    const isMobile = width < 768;
    const count = isMobile ? 400 : 800;
    const stars: Star[] = [];

    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random() * 1000,
        size: Math.random() * 1.5 + 0.5,
      });
    }

    starsRef.current = stars;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;
    initStars(width, height);

    function animate() {
      ctx.fillStyle = "#050510";
      ctx.fillRect(0, 0, width, height);

      const stars = starsRef.current;
      const cx = width / 2;
      const cy = height / 2;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= 0.3;
        if (star.z <= 0) {
          star.x = Math.random() * width;
          star.y = Math.random() * height;
          star.z = 1000;
        }

        const scale = 800 / star.z;
        const sx = (star.x - cx) * scale + cx;
        const sy = (star.y - cy) * scale + cy;
        const r = star.size * scale * 0.5;
        const alpha = 1 - star.z / 1000;

        ctx.fillStyle = `rgba(120, 140, 170, ${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(sx, sy, Math.max(r, 0.3), 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    }

    animate();

    function handleResize() {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initStars(width, height);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, [initStars]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
