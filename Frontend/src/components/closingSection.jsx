import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ClosingSection = ({data1, data2}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section
      ref={ref}
      className="relative flex items-center justify-center w-full py-32 overflow-hidden"
    >
      {/* Expanding Soft Shape */}
      <motion.div
        initial={{ scale: 0, opacity: 1, borderRadius: "50%" }}
        animate={
          isInView
            ? { scale: 4, opacity: 0.1, borderRadius: "0%" }
            : {}
        }
        transition={{ duration: 1.4, ease: "easeInOut" }}
        className="absolute w-full h-[65vw] 
          bg-linear-to-b from-white via-white to-emerald-50 
          blur-sm z-0"
      />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
        className="relative z-20 text-center px-6"
      >
        <h2 className="text-xl md:text-3xl font-medium text-gray-700 mb-4">
          {data1.closing_line}
        </h2>

        <p className="text-5xl md:text-6xl font-bold tracking-tight 
          text-white mb-12 animate-pulse">
          {data2}
        </p>

        <button
          className="px-10 py-4 rounded-full bg-emerald-500 text-white 
          font-semibold 
          hover:scale-105 
          transition-all duration-300"
        >
          {data1.button}
        </button>
      </motion.div>
    </section>
  );
};

export default ClosingSection;
