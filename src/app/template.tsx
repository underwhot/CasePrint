"use client";

import { motion } from "framer-motion";

export default function Template({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className="flex flex-col flex-1"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
