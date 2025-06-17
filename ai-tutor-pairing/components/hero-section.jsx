"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/10 blur-2xl"></div>
        <div className="absolute top-1/4 left-1/3 w-40 h-40 rounded-full bg-indigo-500/10 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-10" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.div 
              className="inline-block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-300 backdrop-blur-sm">
                ELARA
              </span>
            </motion.div>
            <motion.h1 
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Personalized Learning</span> with AI-Generated Tutors
            </motion.h1>
            <motion.p 
              className="max-w-[600px] text-slate-300 md:text-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Finding the right tutor is challenging. Our AI creates personalized tutor profiles tailored to your unique
              learning style and study abilities, ensuring the perfect match for your educational journey.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <Link href="/tutor">
                <Button 
                  size="lg" 
                  className="relative group h-12 px-8 overflow-hidden bg-transparent"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform duration-300 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                  <div className="relative flex items-center gap-2">
                    <motion.span 
                      className="text-white font-medium"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Start Learning
                    </motion.span>
                    <motion.div
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      →
                    </motion.div>
                  </div>
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="relative group h-12 px-8 overflow-hidden border-cyan-500/50 bg-transparent backdrop-blur-sm"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-2">
                    <motion.span 
                      className="text-cyan-300 group-hover:text-cyan-200 transition-colors"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Learn More
                    </motion.span>
                    <motion.div
                      className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                    >
                      →
                    </motion.div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-cyan-500/0 via-cyan-500/70 to-blue-500/0 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </Button>
              </Link>
            </motion.div>
            <motion.div 
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-slate-800 overflow-hidden">
                    <Image 
                      src="/images/avatars/meettutor.png"
                      alt={`User ${i}`} 
                      width={40} 
                      height={40} 
                    />
                  </div>
                ))}
              </div>
              <div className="text-sm text-slate-300">
                <span className="font-semibold text-cyan-300">1,000+</span> students already learning with ELARA
              </div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="relative h-[560px] w-full"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-blue-500/10 rounded-2xl backdrop-blur-sm"></div>
            <div className="absolute inset-0 rounded-2xl overflow-hidden border border-slate-700/50 shadow-2xl">
              <Image
                src="/images/avatars/meettutor.png"
                alt="AI Tutor"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <h3 className="text-xl font-bold mb-2">Meet Your AI Tutor</h3>
                <p className="text-sm opacity-90">Personalized to your learning style and goals</p>
              </div>
            </div>
            
            {/* Floating Elements */}
            <motion.div 
              className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-md border border-slate-700/30"
              animate={{ 
                y: [0, -10, 0],
                rotate: [0, 5, 0]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
            <motion.div 
              className="absolute -bottom-6 -left-6 w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-md border border-slate-700/30"
              animate={{ 
                y: [0, 10, 0],
                rotate: [0, -5, 0]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity,
                repeatType: "reverse"
              }}
            ></motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1, 
          delay: 1.2,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-slate-400 mb-2">Scroll to explore</span>
          <div className="w-6 h-10 border-2 border-cyan-500/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

