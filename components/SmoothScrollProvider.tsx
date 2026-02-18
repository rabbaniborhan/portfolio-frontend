"use client";

import { cancelFrame, frame } from "framer-motion";
import type { LenisRef } from "lenis/react";
import { ReactLenis } from "lenis/react";
import { useEffect, useRef } from "react";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<LenisRef>(null);

  useEffect(() => {
    function update(data: { timestamp: number }) {
      lenisRef.current?.lenis?.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        autoRaf: false,
        duration: 1.2,
        smoothWheel: true,
        lerp: 0.05,
      }}
      ref={lenisRef}
    >
      {children}
    </ReactLenis>
  );
}
