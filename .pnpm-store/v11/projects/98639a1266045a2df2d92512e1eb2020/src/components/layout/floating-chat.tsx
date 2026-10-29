"use client";

import Link from "next/link";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export function FloatingChatButton() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 1, type: "spring" }}
      className="fixed bottom-6 right-6 z-50"
    >
      <Link href="/assistant">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-14 w-14 items-center justify-center rounded-full gradient-primary shadow-glow-lg animate-pulse-glow"
        >
          <Bot className="h-7 w-7 text-white" />
        </motion.button>
      </Link>
    </motion.div>
  );
}
