"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const AnimatedNumber = ({ value }) => {
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 50, stiffness: 100 });
  const numberRef = useRef(null);

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

export default function StatsSection({ data }) {
  const { ref, inView } = useInView({ threshold: 0.3, triggerOnce: true });

  const stats = data?.posts?.list?.map((item) => ({
    label: item.data.title,
    value: parseInt(item.data.description.replace(/,/g, ""), 10),
    prefix: "+",
  }));

  return (
    <section className="relative min-h-[500px] flex items-center">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('${data?.images?.list?.[0]?.full_path}')`,
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
            {stats?.map((stat, index) => (
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
