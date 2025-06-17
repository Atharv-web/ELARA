"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden relative">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/5 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <motion.div 
            className="relative h-[500px] w-full rounded-2xl overflow-hidden"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-blue-500/20 rounded-2xl"></div>
            <Image
              src="/images/features/F.png"
              alt="About ELARA"
              fill
              className="object-cover rounded-2xl"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent rounded-2xl"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <h3 className="text-xl font-bold mb-2">Our Mission</h3>
              <p className="text-sm opacity-90">Transforming education through personalized AI tutoring</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block">
              <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 border-cyan-500/50 bg-cyan-500/10 text-cyan-300 backdrop-blur-sm">
                About Us
              </span>
            </div>
            
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              Revolutionizing Education with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Intelligent Tutoring</span>
            </h2>
            
            <p className="text-slate-300 text-lg">
              ELARA is at the forefront of educational innovation, combining cutting-edge AI technology with proven learning methodologies to create a truly personalized educational experience.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-cyan-100 flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Personalized Learning</h3>
                  <p className="text-slate-300 text-sm">Adapts to your unique learning style and pace</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <span className="text-2xl">🧠</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Advanced AI</h3>
                  <p className="text-slate-300 text-sm">Powered by state-of-the-art language models</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-sky-100 flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Data-Driven Insights</h3>
                  <p className="text-slate-300 text-sm">Tracks progress and identifies improvement areas</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                  <span className="text-2xl">🌐</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Global Accessibility</h3>
                  <p className="text-slate-300 text-sm">Available 24/7 from anywhere in the world</p>
                </div>
              </div>
            </div>
            
            <div className="pt-6">
              <Link href="/about">
                <Button size="lg" className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white h-12 px-8 shadow-md hover:shadow-lg transition-all">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 