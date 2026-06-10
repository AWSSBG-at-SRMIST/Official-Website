"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Loader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cloud formation sequence takes roughly 2.5s total
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-surface-container-lowest"
        >
          {/* Perfect Cloud Assembly */}
          <div className="relative w-32 h-24 mb-6 mt-4">
            {/* Left Puff */}
            <motion.div
              initial={{ x: -50, y: 50, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1, type: "spring", bounce: 0.4 }}
              className="absolute bottom-4 left-2 w-12 h-12 bg-primary rounded-full shadow-lg"
            />
            {/* Center Puff */}
            <motion.div
              initial={{ y: -50, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, type: "spring", bounce: 0.4 }}
              className="absolute bottom-6 left-8 w-16 h-16 bg-primary rounded-full shadow-xl z-10"
            />
            {/* Right Puff */}
            <motion.div
              initial={{ x: 50, y: 50, opacity: 0, scale: 0 }}
              animate={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring", bounce: 0.4 }}
              className="absolute bottom-2 right-2 w-10 h-10 bg-primary rounded-full shadow-lg"
            />
            {/* Base Connector */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-0 left-0 h-10 bg-primary rounded-full z-0"
            />
          </div>

          {/* Dimensional Typography */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            style={{ perspective: "1000px" }}
          >
            <h1 className="text-display font-display font-black tracking-widest text-on-surface relative z-10">
              AWS <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-[#00d2ff]">SBG</span>
              {/* 3D Extrusion illusion */}
              <span className="absolute left-0 top-[2px] -z-10 text-on-surface/20 blur-[1px]">
                AWS SBG
              </span>
            </h1>
          </motion.div>

          {/* Underline Progress */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "16rem", opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.4, ease: "circOut" }}
            className="h-[2px] mt-6 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_10px_rgba(0,74,198,0.8)]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
