'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useAnimation } from 'framer-motion';
import { Button } from "@/components/ui/button";
import NavBar from "@/components/navbar";
import Link from 'next/link';
import Image from 'next/image';
import { Brain, Target, Sparkles, Book, Users, Star, ChevronLeft, ChevronRight, Award, Linkedin, Twitter, Github } from 'lucide-react';
import Footer from "@/components/footer";

const CarouselBackground = ({ isActive }) => (
  <motion.div 
    className="absolute inset-0 rounded-2xl overflow-hidden"
    initial={{ opacity: 0 }}
    animate={{ opacity: isActive ? 1 : 0.3 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
      animate={{
        scale: [1, 1.2, 1],
        rotate: [0, 45, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "linear"
      }}
    />
    <div className="absolute inset-0 backdrop-blur-[2px]" />
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)"
      }}
    />
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
  </motion.div>
);

const FloatingIcon = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ scale: 0.5, opacity: 0 }}
    animate={{ 
      scale: 1, 
      opacity: 1,
      y: [-5, 5, -5],
      rotate: [-5, 5, -5]
    }}
    transition={{
      y: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      rotate: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
        delay
      },
      scale: { duration: 0.5 },
      opacity: { duration: 0.5 }
    }}
  >
    {children}
  </motion.div>
);

const Carousel3D = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let interval;
    if (isAutoPlay) {
      interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, items.length]);

  const calculatePosition = (index) => {
    const diff = (index - currentIndex + items.length) % items.length;
    const angle = (diff * 360) / items.length;
    return {
      rotateY: angle,
      scale: diff === 0 ? 1 : 0.8,
      z: diff === 0 ? 200 : 0,
      filter: diff === 0 ? 'none' : 'brightness(0.7)',
      zIndex: diff === 0 ? 1 : 0,
    };
  };

  return (
    <div className="relative h-[400px] w-full perspective-1000 my-20">
      {/* Background Effects */}
      <motion.div
        className="absolute inset-0 rounded-3xl overflow-hidden"
        animate={{
          boxShadow: isHovered 
            ? "0 0 50px rgba(6, 182, 212, 0.3)" 
            : "0 0 30px rgba(6, 182, 212, 0.1)"
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </motion.div>

      <div 
        ref={containerRef}
        className="relative w-full h-full transform-style-3d"
        onMouseEnter={() => {
          setIsAutoPlay(false);
          setIsHovered(true);
        }}
        onMouseLeave={() => {
          setIsAutoPlay(true);
          setIsHovered(false);
        }}
      >
        {items.map((item, index) => {
          const isActive = index === currentIndex;
          return (
            <motion.div
              key={index}
              className="absolute inset-0 w-full h-full"
              initial={calculatePosition(index)}
              animate={calculatePosition(index)}
              transition={{ 
                duration: 0.5,
                ease: "easeOut"
              }}
            >
              <div className="w-full h-full bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 relative overflow-hidden">
                <CarouselBackground isActive={isActive} />
                <div className="relative z-10 flex flex-col items-center text-center">
                  <motion.div 
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center relative">
                      <FloatingIcon delay={index * 0.2}>
                        {item.icon}
                      </FloatingIcon>
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: isActive
                            ? "0 0 20px rgba(6, 182, 212, 0.3)"
                            : "0 0 10px rgba(6, 182, 212, 0.1)"
                        }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  </motion.div>
                  <motion.h3 
                    className="text-2xl font-bold text-white mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 }}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-slate-300"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      
      <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentIndex((prev) => (prev - 1 + items.length) % items.length)}
          className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white relative group"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.2 }}
          />
          <ChevronLeft className="w-5 h-5 relative z-10" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCurrentIndex((prev) => (prev + 1) % items.length)}
          className="p-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white relative group"
        >
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
            transition={{ duration: 0.2 }}
          />
          <ChevronRight className="w-5 h-5 relative z-10" />
        </motion.button>
      </div>
    </div>
  );
};

const FloatingOrb = ({ delay = 0, size = 300, color = "from-cyan-500/30 to-blue-500/30", className = "" }) => (
  <motion.div
    className={`absolute rounded-full bg-gradient-to-r ${color} blur-3xl ${className}`}
    style={{ width: size, height: size }}
    animate={{
      y: [20, -20, 20],
      x: [-20, 20, -20],
      rotate: [0, 180, 0],
      scale: [1, 1.1, 1]
    }}
    transition={{
      duration: 20,
      delay,
      repeat: Infinity,
      ease: "linear"
    }}
  />
);

const ParallaxText = ({ children, className }) => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);

  return (
    <motion.div
      style={{ y, opacity }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const FloatingElement = ({ delay = 0, children }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: 5,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};

const GradientCard = ({ children, color = "from-cyan-500 to-blue-500" }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className={`relative p-6 rounded-2xl overflow-hidden bg-slate-900/50 backdrop-blur-xl border border-slate-700/50`}
    >
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${color} opacity-10`}
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.05, 1],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      {children}
    </motion.div>
  );
};

const ParticleEffect = () => {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    })));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950" />
      
      <FloatingOrb delay={0} className="top-0 left-1/4" />
      <FloatingOrb delay={5} color="from-purple-500/30 to-pink-500/30" className="bottom-1/4 right-1/4" />
      <FloatingOrb delay={10} size={200} color="from-emerald-500/30 to-teal-500/30" className="top-1/2 left-1/3" />
      
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  );
};

const AnimatedCounter = ({ value, duration = 2 }) => {
  const [count, setCount] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    let startTimestamp;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [value, duration]);

  return <span className="font-bold text-4xl">{count}</span>;
};

const StatsSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
    >
      <GradientCard color="from-cyan-500 to-blue-500">
        <FloatingElement>
          <div className="text-center">
            <AnimatedCounter value={10000} />
            <h3 className="text-xl font-semibold text-white mt-2">Active Learners</h3>
          </div>
        </FloatingElement>
      </GradientCard>

      <GradientCard color="from-purple-500 to-pink-500">
        <FloatingElement delay={0.2}>
          <div className="text-center">
            <AnimatedCounter value={50} />
            <h3 className="text-xl font-semibold text-white mt-2">AI Tutors</h3>
          </div>
        </FloatingElement>
      </GradientCard>

      <GradientCard color="from-emerald-500 to-teal-500">
        <FloatingElement delay={0.4}>
          <div className="text-center">
            <AnimatedCounter value={95} />
            <span className="text-4xl font-bold">%</span>
            <h3 className="text-xl font-semibold text-white mt-2">Success Rate</h3>
          </div>
        </FloatingElement>
      </GradientCard>
    </motion.div>
  );
};

const GridBackground = () => (
  <div className="absolute inset-0 -z-10">
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
    </div>
    <motion.div
      className="absolute inset-0"
      style={{
        background: "radial-gradient(circle at 50% 50%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5) 100%)",
      }}
      animate={{
        opacity: [0.5, 0.7, 0.5],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
  </div>
);

const FloatingShapes = () => (
  <>
    <motion.div
      className="absolute top-20 right-10 w-32 h-32"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{ duration: 20, repeat: Infinity }}
    >
      <div className="w-full h-full bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full backdrop-blur-lg border border-white/10" />
    </motion.div>
    <motion.div
      className="absolute bottom-40 left-10 w-24 h-24"
      animate={{
        rotate: [0, -360],
        scale: [1, 1.2, 1],
      }}
      transition={{ duration: 15, repeat: Infinity }}
    >
      <div className="w-full h-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg backdrop-blur-lg border border-white/10 transform rotate-45" />
    </motion.div>
    <motion.div
      className="absolute top-1/2 right-20 w-20 h-20"
      animate={{
        y: [-20, 20, -20],
        rotate: [45, 0, 45],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    >
      <div className="w-full h-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-lg backdrop-blur-lg border border-white/10" />
    </motion.div>
  </>
);

const TimelineItem = ({ year, title, description, isLeft = true }) => (
  <motion.div 
    className={`flex items-center gap-8 ${isLeft ? 'flex-row' : 'flex-row-reverse'}`}
    initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
  >
    <div className="w-32 h-32 rounded-2xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-white/10 flex items-center justify-center">
      <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">{year}</span>
    </div>
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const TeamMember = ({ name, role, image, social }) => (
  <motion.div
    whileHover={{ y: -5 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity" />
    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="w-24 h-24 rounded-full mx-auto mb-4 relative">
        <Image
          src={image}
          alt={name}
          fill
          className="rounded-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold text-white text-center mb-1">{name}</h3>
      <p className="text-sm text-slate-300 text-center mb-4">{role}</p>
      <div className="flex justify-center gap-3">
        {social.map((link, i) => (
          <Link key={i} href={link.url} className="text-slate-400 hover:text-white transition-colors">
            {link.icon}
          </Link>
        ))}
      </div>
    </div>
  </motion.div>
);

const ValueCard = ({ icon: Icon, title, description }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="relative group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
    <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 mb-4">
        <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
          <Icon className="w-6 h-6 text-cyan-400" />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-slate-300">{description}</p>
    </div>
  </motion.div>
);

const carouselItems = [
  {
    title: "Personalized Learning",
    description: "AI-powered tutors that adapt to your unique learning style and pace.",
    icon: <Brain className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Expert Guidance",
    description: "Learn from a diverse range of specialized AI tutors across multiple subjects.",
    icon: <Star className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Interactive Sessions",
    description: "Engage in dynamic learning sessions with real-time feedback and adjustments.",
    icon: <Target className="w-8 h-8 text-cyan-400" />
  },
  {
    title: "Community Learning",
    description: "Join study groups and connect with fellow learners worldwide.",
    icon: <Users className="w-8 h-8 text-cyan-400" />
  }
];

export default function AboutPage() {
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const opacity = useSpring(scrollYProgress);

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <ParticleEffect />
      <GridBackground />
      <FloatingShapes />
      <NavBar />

      <main className="container mx-auto px-4 py-24">
        <div className="max-w-4xl mx-auto">
          <ParallaxText className="text-center mb-12">
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">ELARA</span>
            </motion.h1>
            <motion.p 
              className="mt-4 text-xl text-slate-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Revolutionizing education through AI-powered personalized learning
            </motion.p>
          </ParallaxText>

          <Carousel3D items={carouselItems} />

          <StatsSection />

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Story</h2>
            <div className="space-y-12">
              <TimelineItem
                year="2022"
                title="The Beginning"
                description="ELARA was founded with a vision to revolutionize education through AI. Our journey began with a small team of educators and AI researchers."
              />
              <TimelineItem
                year="2023"
                title="Rapid Growth"
                description="Expanded our AI tutor network to 50+ specialized tutors and reached 10,000 active learners worldwide."
                isLeft={false}
              />
              <TimelineItem
                year="2024"
                title="Innovation"
                description="Launched advanced personalization features and adaptive learning paths, setting new standards in AI-powered education."
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ValueCard
                icon={Brain}
                title="Innovation"
                description="Pushing the boundaries of AI technology to create better learning experiences."
              />
              <ValueCard
                icon={Users}
                title="Accessibility"
                description="Making quality education available to everyone, everywhere."
              />
              <ValueCard
                icon={Target}
                title="Excellence"
                description="Maintaining the highest standards in educational content and delivery."
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Our Technology</h2>
            <GradientCard>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Advanced AI Models</h3>
                  <p className="text-slate-300">
                    Powered by state-of-the-art language models and adaptive learning algorithms that evolve with each student's progress.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Real-time Adaptation</h3>
                  <p className="text-slate-300">
                    Our system continuously analyzes learning patterns and adjusts teaching methods in real-time for optimal results.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">Secure Infrastructure</h3>
                  <p className="text-slate-300">
                    Built with enterprise-grade security and privacy measures to protect student data and learning progress.
                  </p>
                </div>
              </div>
            </GradientCard>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMember
                name="Atharv Gangodkar"
                role="Chief AI Officer"
                image="images/avatars/meettutor.png"
                social={[
                  { icon: <Linkedin className="w-5 h-5" />, url: "#" },
                  { icon: <Twitter className="w-5 h-5" />, url: "#" }
                ]}
              />
              <TeamMember
                name="Divyanshu Sharma"
                role="Head of Education"
                image="images/avatars/meettutor.png"
                social={[
                  { icon: <Linkedin className="w-5 h-5" />, url: "#" },
                  { icon: <Twitter className="w-5 h-5" />, url: "#" }
                ]}
              />
              <TeamMember
                name="Janhvi Jha"
                role="Lead Developer"
                image="images/avatars/meettutor.png"
                social={[
                  { icon: <Linkedin className="w-5 h-5" />, url: "#" },
                  { icon: <Github className="w-5 h-5" />, url: "#" }
                ]}
              />
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">Recognition & Awards</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <GradientCard color="from-purple-500 to-pink-500">
                <div className="text-center">
                  <Star className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">EdTech Innovator 2024</h3>
                  <p className="text-slate-300">Recognized for breakthrough achievements in AI-powered education</p>
                </div>
              </GradientCard>
              <GradientCard color="from-emerald-500 to-teal-500">
                <div className="text-center">
                  <Award className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Best Learning Platform</h3>
                  <p className="text-slate-300">Awarded for excellence in personalized learning technology</p>
                </div>
              </GradientCard>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-32"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-8">Get in Touch</h2>
            <GradientCard>
              <div className="text-center space-y-4">
                <p className="text-slate-300">
                  Have questions about ELARA? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
                <div className="flex justify-center gap-4">
                  <Link href="/contact">
                    <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3">
                      Contact Us
                    </Button>
                  </Link>
                  <Link href="/support">
                    <Button variant="outline" className="border-cyan-500/50 text-cyan-400 px-6 py-3">
                      Support
                    </Button>
                  </Link>
                </div>
              </div>
            </GradientCard>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-8 mt-24">
            <GradientCard color="from-cyan-500 to-blue-500">
              <FloatingElement>
                <h2 className="text-2xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-slate-300">
                  To make quality education accessible to everyone through innovative AI technology and personalized learning experiences.
                </p>
              </FloatingElement>
            </GradientCard>

            <GradientCard color="from-purple-500 to-pink-500">
              <FloatingElement delay={0.2}>
                <h2 className="text-2xl font-bold text-white mb-4">Our Vision</h2>
                <p className="text-slate-300">
                  Creating a world where every learner can access personalized, high-quality education tailored to their unique needs.
                </p>
              </FloatingElement>
            </GradientCard>
          </div>

          <motion.div 
            className="mt-24 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Link href="/tutor">
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 text-lg relative group overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.5 }}
                />
                <span className="relative z-10">Start Learning Today</span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

// Add these styles to your globals.css
const styles = `
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .transform-style-3d {
    transform-style: preserve-3d;
  }
`;