"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { getTechnologyIcon } from "@/lib/icons";
import portfolioData from "@/data/portfolio";
import { Sparkles } from "lucide-react";
import { GradientOrbs } from "./gradient-orbs";

type SkillCategory = "all" | "frontend" | "backend" | "databases" | "realtime" | "cloud" | "ai" | "auth";

const categories: { key: SkillCategory; label: string }[] = [
  { key: "all", label: "All" },
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "databases", label: "Databases" },
  { key: "realtime", label: "Real-time" },
  { key: "cloud", label: "Cloud" },
  { key: "ai", label: "AI/ML" },
  { key: "auth", label: "Auth" },
];

export function Skills() {
  const { resolvedTheme } = useTheme();
  const { skills } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [activeCategory, setActiveCategory] = useState<SkillCategory>("all");
  const [mounted, setMounted] = useState(false);
  
  // Ensure theme is detected after hydration
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const isDarkMode = mounted && resolvedTheme === "dark";

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1, rootMargin: "-100px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  // Get skills based on active category
  const getFilteredSkills = () => {
    if (activeCategory === "all") {
      return [
        ...skills.frontend,
        ...skills.backend,
        ...skills.databases,
        ...skills.realtime,
        ...skills.cloud,
        ...skills.ai,
        ...skills.auth,
      ];
    }
    return skills[activeCategory] || [];
  };

  const filteredSkills = getFilteredSkills();

  return (
    <section
      id="skills"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
      ref={ref}
    >

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Skills
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Tech Stack
          </h2>
       
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          {categories.map((category) => (
            <motion.button
              key={category.key}
              onClick={() => setActiveCategory(category.key)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={cn(
                "px-3 py-1.5 sm:px-4 sm:py-2 md:px-6 md:py-3 rounded-lg font-bold text-xs sm:text-sm md:text-base transition-all duration-300",
                "border-2 backdrop-blur-sm",
                activeCategory === category.key
                  ? "bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white border-indigo-400/50 shadow-lg shadow-indigo-500/30"
                  : "bg-background/80 dark:bg-slate-900/50 text-foreground dark:text-slate-300 border-indigo-500/30 hover:border-indigo-400/50 hover:bg-muted/50 dark:hover:bg-slate-800/70"
              )}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3"
        >
          {filteredSkills.map((skill, index) => {
            const { icon: Icon, color: iconColor } = getTechnologyIcon(skill.name, isDarkMode);

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{
                  delay: index * 0.02,
                  duration: 0.4,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{ scale: 1.1, y: -4 }}
                className={cn(
                  "group relative p-2 sm:p-3 rounded-lg border border-border dark:border-slate-700/50",
                  "bg-card/50 dark:bg-slate-900/50 backdrop-blur-sm",
                  "hover:border-indigo-500/50 hover:bg-muted/50 dark:hover:bg-slate-800/70",
                  "transition-all duration-300 cursor-pointer",
                  "flex flex-col items-center justify-center gap-1 sm:gap-2",
                  "hover:shadow-xl hover:shadow-indigo-500/20"
                )}
              >
                {/* Icon with colorful background */}
                <motion.div
                  className="relative"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <div
                    className="p-1.5 sm:p-2 rounded-lg"
                    style={{
                      backgroundColor: `${iconColor}15`,
                      border: `2px solid ${iconColor}40`,
                    }}
                  >
                    <div style={{ color: iconColor }} className="flex items-center justify-center">
                      <Icon
                        className="text-lg sm:text-xl md:text-2xl"
                        style={{ color: 'currentColor', fill: 'currentColor', stroke: 'currentColor' }}
                      />
                    </div>
                  </div>
                  {/* Glow effect on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity"
                    style={{ backgroundColor: iconColor }}
                  />
                </motion.div>

                {/* Skill Name */}
                <div className="text-center">
                  <span className="text-[10px] sm:text-xs font-bold text-foreground dark:text-slate-200 leading-tight block">
                    {skill.name}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* <GradientOrbs /> */}
    </section>
  );
}
