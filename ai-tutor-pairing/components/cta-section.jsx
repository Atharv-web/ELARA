"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

export default function CTASection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden relative">
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-cyan-600 to-blue-600 p-8 md:p-12 border border-white/10 backdrop-blur-sm">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div 
              className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/10 blur-3xl"
              animate={floatingAnimation}
            />
            <motion.div 
              className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-cyan-300/20 blur-3xl"
              animate={{
                ...floatingAnimation,
                transition: {
                  ...floatingAnimation.transition,
                  delay: 1,
                },
              }}
            />
            <motion.div 
              className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-blue-300/10 blur-2xl"
              animate={{
                ...floatingAnimation,
                transition: {
                  ...floatingAnimation.transition,
                  delay: 2,
                },
              }}
            />
          </div>
          
          <motion.div 
            className="relative z-10 grid gap-8 md:grid-cols-2 md:gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div 
              className="space-y-4 text-white"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Transform Your Learning Experience?
              </h2>
              <p className="text-lg text-white/80 max-w-[500px]">
                Join thousands of students who have discovered the power of personalized AI tutoring with ELARA.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/signup">
                  <Button 
                    size="lg" 
                    className="bg-white text-cyan-600 hover:bg-white/90 h-12 px-8 shadow-lg hover:shadow-xl transition-all"
                  >
                    Get Started Now
                  </Button>
                </Link>
                <Link href="/demo">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10 h-12 px-8"
                  >
                    Request Demo
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video bg-slate-900/20 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center p-6">
                    <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
                      <span className="text-3xl">🎓</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Start Your Journey Today</h3>
                    <p className="text-white/80 text-sm">
                      Create your account and get matched with your perfect AI tutor in minutes
                    </p>
                  </div>
                </div>
              </div>
              
              <motion.div 
                className="absolute -bottom-6 -right-6 bg-white rounded-lg shadow-lg p-4 max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-cyan-100 flex items-center justify-center">
                    <span className="text-cyan-600 text-xl">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-cyan-600">4.9/5 Student Rating</p>
                    <p className="text-xs text-slate-600">Based on 1,000+ reviews</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

