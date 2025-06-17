"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Brain, Target, Sparkles, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const cards = [
  {
    id: 1,
    title: "Personalized Learning Experience",
    description: "Our AI adapts to your unique learning style, creating a customized educational journey that evolves with you.",
    icon: Brain,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Adaptive learning paths",
      "Real-time adjustments",
      "Progress tracking"
    ]
  },
  {
    id: 2,
    title: "Multi-Style Tutor Engine",
    description: "Access over 25+ teaching styles and learning modes to find the perfect match for your educational needs.",
    icon: Sparkles,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "25+ teaching styles",
      "Interactive sessions",
      "Flexible learning modes"
    ]
  },
  {
    id: 3,
    title: "Adaptive Study Plans",
    description: "Smart, modular learning roadmaps that adjust based on your progress and understanding.",
    icon: Target,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Dynamic scheduling",
      "Goal-based planning",
      "Progress optimization"
    ]
  },
  {
    id: 4,
    title: "Real-Time Feedback",
    description: "Get instant, constructive feedback and recommendations to enhance your learning experience.",
    icon: MessageCircle,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Instant feedback",
      "Performance insights",
      "Improvement suggestions"
    ]
  }
]

const Bubble = ({ size, duration, delay, left }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-white/5"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
    }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 1, 1, 0],
      x: [0, left % 2 === 0 ? 50 : -50],
    }}
    transition={{
      duration: duration,
      delay: delay,
      repeat: Infinity,
      ease: "linear",
    }}
  />
)

const BubbleShower = () => {
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    const newBubbles = Array.from({ length: 15 }).map((_, i) => ({
      size: 20 + (i % 3) * 15,
      duration: 8 + (i % 5),
      delay: i * 0.5,
      left: (i * 7) % 100,
      id: i,
    }))
    setBubbles(newBubbles)
  }, [])

  if (bubbles.length === 0) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} {...bubble} />
      ))}
    </div>
  )
}

const FloatingShape = ({ delay, left, top, size, rotate, shape }) => (
  <motion.div
    className={`absolute ${shape} bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10`}
    style={{
      left: `${left}%`,
      top: `${top}%`,
      width: size,
      height: size,
    }}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
      rotate: [0, rotate, 0],
      y: [-20, 20, -20],
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
)

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
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Shapes */}
      <FloatingShape delay={0} left={10} top={20} size={60} rotate={360} shape="rounded-lg" />
      <FloatingShape delay={1} left={85} top={15} size={40} rotate={-360} shape="rounded-full" />
      <FloatingShape delay={2} left={20} top={80} size={50} rotate={360} shape="rounded-full" />
      <FloatingShape delay={3} left={80} top={70} size={45} rotate={-360} shape="rounded-lg" />
      
      {/* Dynamic Gradient Overlay */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.05) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 20%, rgba(6, 182, 212, 0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Particle Grid */}
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
              delay: i * 0.1,
              repeat: Infinity,
              repeatDelay: particle.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}

const InfoCard = ({ card, isActive }) => {
  const Icon = card.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="relative w-full h-full"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden group">
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
          <div className={`absolute inset-0 bg-gradient-to-r ${card.gradient}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(0,0,0,0.8)_100%)]" />
          
          {/* Animated glow effect */}
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            animate={{
              background: [
                `radial-gradient(circle at 30% 30%, ${card.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.15)' : 'rgba(99, 102, 241, 0.15)'} 0%, transparent 50%)`,
                `radial-gradient(circle at 70% 70%, ${card.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.15)' : 'rgba(99, 102, 241, 0.15)'} 0%, transparent 50%)`,
                `radial-gradient(circle at 30% 30%, ${card.gradient.includes('cyan') ? 'rgba(6, 182, 212, 0.15)' : 'rgba(99, 102, 241, 0.15)'} 0%, transparent 50%)`,
              ],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </div>

        {/* Bubble effect */}
        <BubbleShower />

        <div className="relative p-8 h-full flex flex-col">
          {/* Icon with enhanced animation */}
          <motion.div
            className={`w-16 h-16 rounded-xl bg-gradient-to-r ${card.gradient} p-0.5 relative`}
            whileHover={{ scale: 1.05, rotate: 5 }}
          >
            <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center overflow-hidden">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <Icon className="h-8 w-8 text-white" />
              </motion.div>
            </div>
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          {/* Content with enhanced animations */}
          <motion.div 
            className="mt-6 flex-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {card.title}
            </motion.h3>
            <motion.p 
              className="text-slate-300 mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {card.description}
            </motion.p>
            
            {/* Features with enhanced animations */}
            <div className="space-y-3">
              {card.features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  className="flex items-center gap-2 group/feature"
                >
                  <motion.div 
                    className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${card.gradient}`}
                    whileHover={{ scale: 1.5 }}
                  />
                  <span className="text-slate-300 group-hover/feature:text-white transition-colors">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Enhanced Learn More Button */}
          <motion.button
            className={`mt-6 px-6 py-2 rounded-lg bg-gradient-to-r ${card.gradient} text-white font-medium 
                       opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 
                       group-hover:translate-y-0 relative overflow-hidden`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative z-10 flex items-center justify-center gap-2">
              <span>Learn More</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </div>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100"
              animate={{
                background: [
                  `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
                ],
                left: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default function InfoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  useEffect(() => {
    let interval
    if (!isHovered) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
      }, 5000)
    }
    return () => clearInterval(interval)
  }, [isHovered])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cards.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cards.length) % cards.length)
  }

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX)
  }

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 50
    const isRightSwipe = distance < -50
    
    if (isLeftSwipe) {
      nextSlide()
    }
    if (isRightSwipe) {
      prevSlide()
    }
    
    setTouchStart(null)
    setTouchEnd(null)
  }

  return (
    <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <BackgroundEffects />
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white mb-4">
            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ELARA</span>
          </h2>
          <p className="max-w-[700px] mx-auto text-slate-300 text-lg">
            Discover how our AI tutors adapt to different learning styles and subjects
          </p>
        </motion.div>

        <div 
          className="relative max-w-4xl mx-auto h-[500px]"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence mode="wait">
            <InfoCard 
              key={currentIndex} 
              card={cards[currentIndex]}
              isActive={true}
            />
          </AnimatePresence>

          {/* Enhanced Navigation Buttons */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm ml-4 border border-white/20 relative group"
                onClick={prevSlide}
              >
                <ChevronLeft className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur" />
              </Button>
            </motion.div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-12 w-12 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm mr-4 border border-white/20 relative group"
                onClick={nextSlide}
              >
                <ChevronRight className="h-6 w-6 relative z-10" />
                <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur" />
              </Button>
            </motion.div>
          </div>
        </div>
        
        {/* Enhanced Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {cards.map((_, index) => (
            <motion.button
              key={index}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                index === currentIndex 
                  ? "bg-gradient-to-r from-cyan-500 to-blue-500 w-8" 
                  : "bg-slate-700 hover:bg-slate-600"
              }`}
              onClick={() => setCurrentIndex(index)}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Enhanced Feature Links */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {cards.map((card, index) => {
            const Icon = card.icon
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setCurrentIndex(index)}
                whileHover={{ y: -5 }}
              >
                <div className={`relative p-4 rounded-xl border border-white/10 backdrop-blur-sm 
                                ${currentIndex === index ? 'bg-white/10' : 'bg-white/5'} 
                                hover:bg-white/10 transition-all duration-300`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${card.gradient} p-0.5 relative group-hover:scale-110 transition-transform duration-300`}>
                      <div className="w-full h-full bg-slate-900 rounded-[6px] flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="text-white font-medium group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 