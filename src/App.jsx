import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { resources } from "./data/resources";
import ResourceCard from "./components/ResourceCard";
import Logo from "./components/Logo";

const categories = ["All", ...new Set(resources.map((res) => res.category))];
const tabs = ["All Resources", "Favorites"];

export default function App() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState(tabs[0]);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (url) => {
    setFavorites((prev) =>
      prev.includes(url) ? prev.filter((item) => item !== url) : [...prev, url]
    );
  };

  const filteredResources = resources.filter((res) => {
    const matchesSearch = [res.title, res.description, res.category].some(
      (field) => field.toLowerCase().includes(search.toLowerCase())
    );
    const matchesCategory =
      selectedCategory === "All" || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedResources =
    activeTab === "Favorites"
      ? filteredResources.filter((res) => favorites.includes(res.url))
      : filteredResources;

  return (
    <div className="min-h-screen bg-gray-900 p-6 md:p-12 text-gray-200">
      <div className="max-w-7xl mx-auto">
        <header className="mb-12">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <Logo className="w-14 h-14" />
            <h1 className="text-5xl font-extrabold text-blue-400 drop-shadow-lg select-none">
              RezourceHub
            </h1>
          </div>
          <p className="text-center text-gray-400 mt-3 max-w-xl mx-auto">
            Discover tools for coding, design, productivity, education and more.
          </p>

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center items-center">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search resources..."
              className="w-full max-w-md px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow-inner placeholder-gray-500 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-48 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg shadow-inner text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {categories.map((cat, idx) => (
                <option
                  key={idx}
                  value={cat}
                  className="bg-gray-900 text-gray-200"
                >
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Tabs for All / Favorites */}
          <div className="mt-8 flex justify-center space-x-8 border-b border-gray-700">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 font-semibold text-lg transition-colors ${
                  activeTab === tab
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-500 hover:text-blue-400"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </header>

        <main>
          <AnimatePresence mode="popLayout">
            {displayedResources.length > 0 ? (
              <motion.div
                key={activeTab + selectedCategory + search}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {displayedResources.map((res, idx) => (
                  <ResourceCard
                    key={res.url}
                    {...res}
                    isFavorite={favorites.includes(res.url)}
                    toggleFavorite={() => toggleFavorite(res.url)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="no-resources"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center text-gray-500 mt-16 text-lg"
              >
                No resources found.
              </motion.p>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
