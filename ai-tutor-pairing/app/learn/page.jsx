'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { InteractiveLearning } from '@/components/interactive-learning';
import NavBar from '@/components/navbar';
import Footer from "@/components/footer";

const BackgroundEffects = () => {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }).map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full filter blur-[64px] animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-[64px] animate-float-medium" />
      <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-emerald-500/30 to-teal-500/30 rounded-full filter blur-[64px] animate-float-fast" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {/* Animated particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/10 rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3,
              delay: particle.delay,
              repeat: Infinity,
              repeatDelay: 1,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <BackgroundEffects />
      <NavBar />
      
      <main className="container mx-auto px-4 py-24">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">
            Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Learning</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Explore our interactive quizzes, games, and challenges. Learn at your own pace and track your progress.
          </p>
        </motion.div>

        <InteractiveLearning />
      </main>
      <Footer />
    </div>
  );
} 