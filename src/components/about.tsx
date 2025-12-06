"use client";

import { motion } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Code, Coffee, Rocket, Sparkles, Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import portfolioData from "@/data/portfolio";
import { MagicCard } from "./magic-card";

const iconMap: Record<string, typeof Code> = {
  Code,
  Rocket,
  Coffee,
};

export function About() {
  const { personal, features } = portfolioData;
  const ref = useRef<HTMLElement>(null);
  const [isInView, setIsInView] = useState(false);

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
      id="about"
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
          <motion.div
            className="inline-flex items-center gap-2 mb-3 sm:mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.2 }}
          >
            <Brain className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xs sm:text-sm font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
              About Me
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 dark:from-indigo-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(99,102,241,0.3)]">
            Crafting Digital Excellence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed font-light px-4">
            {personal.summary.split(".")[0]}.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Code;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={
                  isInView
                    ? { opacity: 1, y: 0, scale: 1 }
                    : { opacity: 0, y: 40, scale: 0.9 }
                }
                transition={{
                  delay: index * 0.15,
                  duration: 0.8,
                  type: "spring",
                  stiffness: 100,
                }}
                whileHover={{ y: -12, scale: 1.02 }}
              >
                <MagicCard
                  gradientColor="rgba(99, 102, 241, 0.15)"
                  className="h-full p-4 sm:p-6 md:p-8 border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm"
                >
                  <div className="relative z-10">
                    <motion.div
                      className={cn(
                        "inline-flex p-3 sm:p-4 rounded-xl mb-3 sm:mb-4",
                        "bg-gradient-to-br",
                        feature.gradient,
                        "shadow-xl border border-indigo-400/20"
                      )}
                      whileHover={{ rotate: 10, scale: 1.15 }}
                    >
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 text-white" />
                    </motion.div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black mb-2 sm:mb-3 text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed text-sm sm:text-base md:text-lg">
                      {feature.description}
                    </p>
                  </div>
                </MagicCard>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <MagicCard
            gradientColor="rgba(99, 102, 241, 0.2)"
            className="p-6 sm:p-8 md:p-12 max-w-5xl mx-auto border border-indigo-500/20 bg-card/80 dark:bg-slate-900/50 backdrop-blur-sm"
          >
            <div className="relative z-10">
              <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent" />
              <p className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed text-foreground mb-4 font-light">
                {personal.summary}
              </p>
            </div>
          </MagicCard>
        </motion.div>
      </div>
    </section>
  );
}
