'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import NavBar from "@/components/navbar"
import HeroSection from "@/components/hero-section"
import VideoCarousel from "@/components/video-carousel"
import AboutSection from "@/components/about-section"
import FeaturesSection from "@/components/features-section"
import CTASection from "@/components/cta-section"
import Footer from "@/components/footer"

const WaveBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(Array.from({ length: 30 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`
    })));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Animated waves */}
      <div className="absolute inset-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute inset-x-0 bottom-0 h-[50vh] animate-wave"
            style={{
              background: `linear-gradient(180deg, transparent, rgba(6, 182, 212, ${0.1 - i * 0.02}))`,
              animationDelay: `${i * 0.5}s`,
              transform: `translateY(${i * 10}px)`
            }}
          />
        ))}
      </div>
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full animate-float"
            style={{
              background: `radial-gradient(circle, rgba(6, 182, 212, 0.3) 0%, transparent 70%)`,
              top: particle.top,
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Move styles to a separate component
const StylesInjector = () => {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes wave {
        0%, 100% {
          transform: translateY(0) scale(1.05);
        }
        50% {
          transform: translateY(-20px) scale(1);
        }
      }
      
      @keyframes float {
        0%, 100% {
          transform: translate(0, 0);
        }
        50% {
          transform: translate(20px, -20px);
        }
      }
      
      .animate-wave {
        animation: wave 8s ease-in-out infinite;
      }
      
      .animate-float {
        animation: float 8s ease-in-out infinite;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);
  return null;
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950">
      <StylesInjector />
      <WaveBackground />
      <div className="relative z-10">
        <NavBar />
        <main className="flex-grow">
          <HeroSection />
          <VideoCarousel />
          <AboutSection />
          <FeaturesSection />
          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}

