// src/components/Logo.jsx
import React from "react";
import { motion } from "framer-motion";

export default function Logo({ className = "w-14 h-14" }) {
  return (
    <motion.svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Curated Resource Hub Logo"
      role="img"
      initial={{ opacity: 0, rotate: -10 }}
      animate={{ opacity: 1, rotate: 0 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      transition={{ type: "spring", stiffness: 200, damping: 12 }}
    >
      {/* Globe circle */}
      <circle cx="32" cy="32" r="30" stroke="#3B82F6" strokeWidth="4" />

      {/* Vertical globe lines */}
      <path
        d="M32 2C28 14 28 50 32 62"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M42 10C39 25 39 39 42 54"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M22 10C25 25 25 39 22 54"
        stroke="#3B82F6"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Book (center, open pages) */}
      <path
        d="M20 45L32 32L44 45"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 45V50H44V45"
        stroke="#60A5FA"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Code brackets */}
      <path
        d="M10 20L6 30L10 40"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M54 20L58 30L54 40"
        stroke="#2563EB"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </motion.svg>
  );
}
