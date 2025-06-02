import React from "react";
import { motion } from "framer-motion";

export default function ResourceCard({
  title,
  description,
  category,
  url,
  isFavorite,
  toggleFavorite,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0 8px 24px rgba(59, 130, 246, 0.5)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative bg-gray-900 border border-gray-700 rounded-lg p-6 shadow-md cursor-pointer"
      role="article"
    >
      <button
        onClick={toggleFavorite}
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
        className={`absolute top-4 right-4 text-2xl transition-colors duration-300 ${
          isFavorite ? "text-red-500" : "text-gray-500 hover:text-red-400"
        }`}
      >
        {isFavorite ? "❤️" : "🤍"}
      </button>

      <h2 className="text-2xl font-semibold text-blue-400 hover:text-blue-500 transition-colors truncate">
        <a href={url} target="_blank" rel="noopener noreferrer" title={title}>
          {title}
        </a>
      </h2>

      <p className="mt-3 text-gray-300 line-clamp-3">{description}</p>

      <p className="mt-4 text-sm text-gray-500 italic tracking-wide">
        Category: {category}
      </p>

      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-5 px-5 py-2 bg-blue-600 text-white rounded-lg font-medium shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
      >
        Visit
      </a>
    </motion.div>
  );
}
