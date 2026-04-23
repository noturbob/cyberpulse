"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * AmbientBackground Component
 * Creates floating, animated gradient orbs using GSAP
 * Use on: landing page, report page, scan processing page
 * 
 * Features:
 * - 2-3 floating orbs with random movements
 * - Smooth blur and opacity effects
 * - Infinite loop animations
 * - Performance optimized with GSAP context cleanup
 */

interface AmbientBackgroundProps {
  variant?: "default" | "cyber" | "gradient";
  intensity?: "subtle" | "medium" | "intense";
}

export function AmbientBackground({
  variant = "default",
  intensity = "medium",
}: AmbientBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);

  // Configuration based on intensity
  const config = {
    subtle: { duration: 15, distance: 100, opacity: 0.3, blur: "100px" },
    medium: { duration: 12, distance: 150, opacity: 0.5, blur: "120px" },
    intense: { duration: 10, distance: 200, opacity: 0.6, blur: "150px" },
  };

  const animConfig = config[intensity];

  // Color variants for different contexts
  const colorVariants = {
    default: {
      blob1: "bg-cyber-500/30",
      blob2: "bg-safe/20",
      blob3: "bg-blue-500/20",
    },
    cyber: {
      blob1: "bg-cyber-500/40",
      blob2: "bg-cyber-400/20",
      blob3: "bg-blue-600/20",
    },
    gradient: {
      blob1: "bg-gradient-to-br from-cyber-500/40 to-blue-600/20",
      blob2: "bg-gradient-to-br from-safe/30 to-cyan-500/10",
      blob3: "bg-gradient-to-br from-blue-500/30 to-cyber-400/10",
    },
  };

  const colors = colorVariants[variant];

  useEffect(() => {
    if (!containerRef.current) return;

    // Create GSAP context for proper cleanup
    const ctx = gsap.context(() => {
      // Blob 1: Large, slow, top-left to bottom-right
      if (blob1Ref.current) {
        gsap.to(blob1Ref.current, {
          x: `random(-${animConfig.distance}, ${animConfig.distance})`,
          y: `random(-${animConfig.distance}, ${animConfig.distance})`,
          duration: animConfig.duration,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
        });
      }

      // Blob 2: Medium, medium speed, bottom-right to top-left
      if (blob2Ref.current) {
        gsap.to(blob2Ref.current, {
          x: `random(-${animConfig.distance * 0.8}, ${animConfig.distance * 0.8})`,
          y: `random(-${animConfig.distance * 0.8}, ${animConfig.distance * 0.8})`,
          duration: animConfig.duration * 1.2,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 1,
        });
      }

      // Blob 3: Small, faster, circular pattern
      if (blob3Ref.current) {
        gsap.to(blob3Ref.current, {
          x: `random(-${animConfig.distance * 0.6}, ${animConfig.distance * 0.6})`,
          y: `random(-${animConfig.distance * 0.6}, ${animConfig.distance * 0.6})`,
          duration: animConfig.duration * 0.8,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: 2,
        });
      }
    }, containerRef);

    return () => ctx.revert(); // Cleanup GSAP context
  }, [animConfig]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden pointer-events-none z-0"
    >
      {/* Blob 1: Large primary orb */}
      <div
        ref={blob1Ref}
        className={`absolute top-1/4 left-1/4 w-[50vw] h-[50vw] md:w-[30vw] md:h-[30vw] ${colors.blob1} rounded-full blur-[${animConfig.blur}] mix-blend-screen will-change-transform`}
        style={{
          opacity: animConfig.opacity,
          filter: `blur(${animConfig.blur})`,
        }}
      />

      {/* Blob 2: Secondary orb */}
      <div
        ref={blob2Ref}
        className={`absolute bottom-1/4 right-1/4 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] ${colors.blob2} rounded-full mix-blend-screen will-change-transform`}
        style={{
          opacity: animConfig.opacity * 0.8,
          filter: `blur(${animConfig.blur})`,
        }}
      />

      {/* Blob 3: Tertiary accent orb */}
      <div
        ref={blob3Ref}
        className={`absolute top-1/2 left-1/2 w-[40vw] h-[40vw] md:w-[25vw] md:h-[25vw] ${colors.blob3} rounded-full mix-blend-screen will-change-transform`}
        style={{
          opacity: animConfig.opacity * 0.6,
          filter: `blur(${animConfig.blur})`,
        }}
      />
    </div>
  );
}

export default AmbientBackground;
