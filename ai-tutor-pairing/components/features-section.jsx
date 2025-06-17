"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useRef, useState, useEffect } from "react"

const features = [
  {
    title: "Personalized Learning",
    description: "Adapts to individual learning styles and preferences",
    icon: "🧠",
    color: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    title: "Multi-Style Tutor Engine",
    description: "25+ learning modes including Storyteller, Simulation Master, and Feynman Explainer",
    icon: "🧩",
    color: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "Adaptive Study Plans",
    description: "Generates smart, modular learning roadmaps",
    icon: "📚",
    color: "bg-sky-50",
    textColor: "text-sky-600",
  },
  {
    title: "Intelligent Content Summarization",
    description: "Summarizes text, video transcripts, and PDFs into digestible formats",
    icon: "🔍",
    color: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    title: "Real-Time Feedback & Recommendations",
    description: "Provides instant correction, hints, and progress insights",
    icon: "🎯",
    color: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
  {
    title: "Performance Insights Dashboard",
    description: "Tracks progress across topics, time, and mastery levels",
    icon: "📈",
    color: "bg-blue-50",
    textColor: "text-blue-600",
  },
  {
    title: "AI-Powered Q&A + Reasoning",
    description: "Engages in deep question-answer interactions",
    icon: "🧠",
    color: "bg-sky-50",
    textColor: "text-sky-600",
  },
  {
    title: "Knowledge Graph & Concept Mapping",
    description: "Automatically builds personalized concept maps",
    icon: "🗂️",
    color: "bg-indigo-50",
    textColor: "text-indigo-600",
  },
  {
    title: "Voice + Text Interface",
    description: "Accepts both spoken and typed questions",
    icon: "🗣",
    color: "bg-cyan-50",
    textColor: "text-cyan-600",
  },
]

export default function FeaturesSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const carouselRef = useRef(null)

  // Auto-advance carousel
  useEffect(() => {
    if (!isHovered) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % features.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [isHovered])

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    hover: {
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
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
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            ELARA <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Core Features</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-slate-300 text-lg">
            Discover how ELARA revolutionizes learning with cutting-edge AI technology
          </p>
        </motion.div>

        {/* Desktop View - Grid */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true }}
              variants={cardVariants}
            >
              <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group">
                <div className="relative">
                  <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                      <span className="text-2xl">{feature.icon}</span>
                    </div>
                    <CardTitle className={`text-xl ${feature.textColor} transition-colors duration-300`}>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-slate-300 text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Mobile View - Carousel */}
        <div 
          className="md:hidden"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            ref={carouselRef}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
            setApi={(api) => {
              if (api) {
                api.on("select", () => {
                  setActiveIndex(api.selectedScrollSnap())
                })
              }
            }}
          >
            <CarouselContent>
              {features.map((feature, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="h-full border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg overflow-hidden group">
                      <div className="relative">
                        <div className={`absolute inset-0 ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                        <CardHeader>
                          <div className={`w-12 h-12 rounded-full ${feature.color} flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110`}>
                            <span className="text-2xl">{feature.icon}</span>
                          </div>
                          <CardTitle className={`text-xl ${feature.textColor} transition-colors duration-300`}>{feature.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-slate-300 text-base">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                      </div>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-white/10 hover:bg-white/20 text-cyan-300 border-cyan-300/30 backdrop-blur-sm" />
            <CarouselNext className="right-2 bg-white/10 hover:bg-white/20 text-cyan-300 border-cyan-300/30 backdrop-blur-sm" />
          </Carousel>
          
          {/* Custom Indicators */}
          <div className="flex justify-center mt-6 space-x-2">
            {features.map((_, index) => (
              <motion.button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === activeIndex ? "bg-gradient-to-r from-cyan-500 to-blue-500 w-8" : "bg-slate-700"
                }`}
                onClick={() => {
                  if (carouselRef.current) {
                    carouselRef.current.scrollTo(index)
                  }
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link href="/features">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white h-12 px-8 shadow-md hover:shadow-lg transition-all"
            >
              Explore All Features
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

