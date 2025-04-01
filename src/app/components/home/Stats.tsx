"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

interface Stat {
  value: number;
  label: string;
  prefix: string;
}

const stats: Stat[] = [
  { value: 14, label: "Events", prefix: "+" },
  { value: 17659, label: "Members", prefix: "+" },
  { value: 13100, label: "Runners", prefix: "+" },
];

const AnimatedNumber = ({ value }: { value: number }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 50,
    stiffness: 100,
  });
  const numberRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    motionValue.set(value);
  }, [motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (numberRef.current) {
        numberRef.current.textContent = Math.floor(latest).toLocaleString();
      }
    });
  }, [springValue]);

  return <span ref={numberRef} />;
};

export default function StatsSection() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('https://ultracamprunners.com/wp-content/uploads/2024/09/65ada0c2a1510-scaled.jpeg')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-[1300px] mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-white mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Join Our Community Of{" "}
            <span className="text-[#C02130]">Runners</span>
          </motion.h2>

          <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2">
                  <AnimatedNumber value={stat.value} />
                  {stat.prefix}
                </div>
                <div className="text-lg md:text-xl text-[#C02130] font-medium">
                  {stat.prefix} {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
