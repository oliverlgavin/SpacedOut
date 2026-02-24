"use client";

import { cn } from "@/lib/utils/cn";
import Link from "next/link";

interface GlowButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export function GlowButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
}: GlowButtonProps) {
  const styles = cn(
    "inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium text-sm transition-all duration-300",
    variant === "primary" &&
      "bg-blue-electric/10 text-blue-electric border border-blue-electric/30 hover:bg-blue-electric/20 hover:shadow-glow",
    variant === "secondary" &&
      "bg-white/5 text-foreground border border-glass-border hover:bg-white/10",
    className
  );

  if (href) {
    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={styles}>
      {children}
    </button>
  );
}
