import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const Counter = ({ value, suffix = "+", label }) => {
  const ref = useRef(null);

  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 1800;
    const startTime = performance.now();

    let animationFrame;

    const animate = (currentTime) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const easeOut = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easeOut * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center"
    >
      <div className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-black">
        {count.toLocaleString()}
        <span className="text-black">{suffix}</span>
      </div>

      <p className="mt-2 text-sm sm:text-base text-gray-400">
        {label}
      </p>
    </motion.div>
  );
};

const StatsCounter = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 w-full max-w-4xl mx-auto">
      <Counter
        value={200}
        label="International Brands"
      />

      <Counter
        value={2000}
        label="High-Quality Products"
      />

      <Counter
        value={30000}
        label="Happy Customers"
      />
    </div>
  );
};

export default StatsCounter;