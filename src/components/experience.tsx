"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Calendar, MapPin, Briefcase, Sparkles, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { getTechnologyIcon } from "@/lib/icons";
import portfolioData from "@/data/portfolio";
import { MagicCard } from "./magic-card";

export function Experience() {
  const { resolvedTheme } = useTheme();
  const { experience } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);
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

  return (
    <section
      id="experience"
      className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden scroll-mt-20"
      ref={ref}
    >
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-3 sm:mb-4">
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              Experience
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Professional Journey
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-slate-400 max-w-4xl mx-auto font-light px-4">
            My career milestones and professional growth
          </p>
        </motion.div>

        <div className="space-y-6 sm:space-y-8 md:space-y-10">
          {experience.map((exp, index) => (
            <motion.div
              key={`${exp.company}-${exp.startDate}`}
              initial={{ opacity: 0, y: 40 }}
              animate={
                isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
              }
              transition={{
                delay: index * 0.15,
                duration: 0.8,
                type: "spring",
                stiffness: 100,
              }}
              className="relative"
            >
              <MagicCard
                gradientColor="rgba(99, 102, 241, 0.2)"
                className="p-4 sm:p-6 md:p-8 lg:p-12 border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm hover:border-indigo-400/40 transition-all duration-300"
              >
                <div className="relative z-10">
                  {/* Header Section */}
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 sm:gap-6 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-indigo-500/20">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                        <div className="p-2 sm:p-3 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-indigo-400/30">
                          <Briefcase className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                        <div>
                          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-black text-foreground dark:text-slate-200 mb-1 sm:mb-2">
                            {exp.position}
                          </h3>
                          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-indigo-600 dark:text-indigo-400 font-bold">
                            {exp.company}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Date and Location */}
                    <div className="flex flex-col gap-2 sm:gap-3 md:items-end md:text-right">
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-slate-400">
                        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base md:text-lg">
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground dark:text-slate-400">
                        <MapPin className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400 flex-shrink-0" />
                        <span className="font-semibold text-sm sm:text-base md:text-lg">{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description Points */}
                  <div className="mb-8">
                    <h4 className="text-lg font-bold text-foreground dark:text-slate-300 mb-6 flex items-center gap-2">
                      <div className="h-1 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-4">
                      {exp.description.map((item, itemIndex) => (
                        <motion.li
                          key={itemIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={
                            isInView
                              ? { opacity: 1, x: 0 }
                              : { opacity: 0, x: -20 }
                          }
                          transition={{
                            delay: index * 0.15 + itemIndex * 0.08,
                            duration: 0.5,
                          }}
                          className="flex items-start gap-4 group"
                        >
                          <div className="mt-1 flex-shrink-0">
                            <CheckCircle2 className="h-5 w-5 text-indigo-600 dark:text-indigo-400 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-colors" />
                          </div>
                          <p className="text-foreground/90 dark:text-slate-300 leading-relaxed text-base md:text-lg font-medium flex-1">
                            {item}
                          </p>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-lg font-bold text-foreground dark:text-slate-300 mb-4 flex items-center gap-2">
                      <div className="h-1 w-8 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 rounded-full" />
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-3">
                      {exp.technologies.map((tech) => {
                        const { icon: TechIcon, color: techColor } = getTechnologyIcon(tech, isDarkMode);
                        return (
                          <motion.span
                            key={tech}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                            transition={{
                              delay: index * 0.15 + exp.description.length * 0.08 + exp.technologies.indexOf(tech) * 0.05,
                              duration: 0.3,
                            }}
                            whileHover={{ scale: 1.1, y: -2 }}
                            className="px-4 py-2 text-sm rounded-lg bg-muted/80 dark:bg-slate-800/80 border border-indigo-500/30 text-foreground dark:text-slate-300 font-semibold hover:border-indigo-400/50 hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-300 transition-all cursor-default flex items-center gap-2"
                          >
                            <TechIcon className="text-base" style={{ color: techColor }} />
                            {tech}
                          </motion.span>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </MagicCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
