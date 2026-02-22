"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CheckItem {
  id: string;
  label: string;
  met: boolean;
}

interface PasswordChecklistProps {
  items: CheckItem[];
}

export function PasswordChecklist({ items }: PasswordChecklistProps) {
  return (
    <ul
      className="space-y-1.5"
      role="status"
      aria-live="polite"
      aria-label="Password requirements"
    >
      {items.map((item) => (
        <li key={item.id} className="flex items-center gap-2">
          <AnimatePresence mode="wait" initial={false}>
            {item.met ? (
              <motion.span
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1a1a1a]"
              >
                <Check
                  className="h-2.5 w-2.5 text-white"
                  strokeWidth={4}
                  aria-hidden="true"
                />
              </motion.span>
            ) : (
              <motion.span
                key="empty"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Circle
                  className="h-4 w-4 text-gray-300"
                  aria-hidden="true"
                />
              </motion.span>
            )}
          </AnimatePresence>
          <span
            className={cn(
              "text-sm transition-colors duration-200",
              item.met ? "text-gray-700" : "text-gray-400"
            )}
          >
            {item.label}
          </span>
          <span className="sr-only">
            {item.met ? "Requirement met" : "Requirement not met"}
          </span>
        </li>
      ))}
    </ul>
  );
}
