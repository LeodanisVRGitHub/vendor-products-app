"use client";

import React from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export default function Card({
  children,
  className = "",
  hover = true,
}: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={
        hover ? { y: -4, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" } : {}
      }
      className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-all ${className}`}>
      {children}
    </motion.div>
  );
}
