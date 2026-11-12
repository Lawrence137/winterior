"use client";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          x.set((e.clientX - r.left) / r.width - 0.5);
          y.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          x.set(0);
          y.set(0);
        }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}