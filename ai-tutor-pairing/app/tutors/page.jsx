'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Brain, Target, Sparkles } from 'lucide-react';
import { ai_tutor_name_1, ai_tutor_name_2, ai_tutor_name_3, ai_tutor_name_4, ai_tutor_name_5, ai_tutor_name_6, ai_tutor_name_7, ai_tutor_name_8 } from '@/lib/tutorTemplates';
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const tutorProfiles = {
  "Urahara Sensei": {
    name: ai_tutor_name_1,
    image: "/images/tutors/1.jpg",
    color: "from-cyan-500 to-blue-500",
    description: "An innovative and playful tutor who makes complex concepts simple and engaging.",
    specialty: "Breaking down complex topics",
    icon: Brain,
    stats: {
      experience: "15+ years",
      subjects: "Science & Technology",
      style: "Interactive & Playful"
    }
  },
  "Kuchiki Sensei": {
    name: ai_tutor_name_2,
    image: "/images/tutors/2.jpg",
    color: "from-blue-500 to-indigo-500",
    description: "A disciplined and methodical tutor focused on precision and mastery.",
    specialty: "Structured learning paths",
    icon: Target,
    stats: {
      experience: "20+ years",
      subjects: "Mathematics & Logic",
      style: "Structured & Precise"
    }
  },
  "Yamamoto Sensei": {
    name: ai_tutor_name_3,
    image: "/images/tutors/3.jpg",
    color: "from-indigo-500 to-purple-500",
    description: "A wise and experienced tutor who emphasizes deep understanding and practical application.",
    specialty: "Comprehensive mastery",
    icon: Sparkles,
    stats: {
      experience: "30+ years",
      subjects: "Philosophy & Strategy",
      style: "Wisdom-based & Thorough"
    }
  },
  "Nova Starweaver": {
    name: ai_tutor_name_4,
    image: "/images/tutors/4.jpg",
    color: "from-purple-500 to-pink-500",
    description: "A charismatic storyteller who weaves narratives across disciplines to illuminate concepts.",
    specialty: "Interdisciplinary connections",
    icon: Sparkles,
    stats: {
      experience: "12+ years",
      subjects: "Cross-disciplinary",
      style: "Creative & Narrative"
    }
  },
  "Dr. Quantum Quest": {
    name: ai_tutor_name_5,
    image: "/images/tutors/5.jpg",
    color: "from-emerald-500 to-cyan-500",
    description: "A dynamic systems thinker who creates interactive simulations and data-driven insights.",
    specialty: "Interactive analysis",
    icon: Brain,
    stats: {
      experience: "18+ years",
      subjects: "Systems & Data",
      style: "Analytical & Experimental"
    }
  },
  "Professor Echo": {
    name: ai_tutor_name_6,
    image: "/images/tutors/6.jpg",
    color: "from-amber-500 to-red-500",
    description: "A master of Socratic dialogue who guides students to discover knowledge through questioning.",
    specialty: "Critical thinking",
    icon: Target,
    stats: {
      experience: "25+ years",
      subjects: "Logic & Reasoning",
      style: "Socratic & Dialectical"
    }
  },
  "Master Zen": {
    name: ai_tutor_name_7,
    image: "/images/tutors/7.jpg",
    color: "from-teal-500 to-emerald-500",
    description: "A mindful guide who breaks complex ideas into simple, digestible concepts.",
    specialty: "Mindful learning",
    icon: Brain,
    stats: {
      experience: "22+ years",
      subjects: "Foundational Concepts",
      style: "Patient & Clear"
    }
  },
  "Coach Phoenix": {
    name: ai_tutor_name_8,
    image: "/images/tutors/8.jpg",
    color: "from-orange-500 to-amber-500",
    description: "An energetic motivator who transforms learning into exciting, gamified challenges.",
    specialty: "Gamified learning",
    icon: Sparkles,
    stats: {
      experience: "10+ years",
      subjects: "Achievement-based",
      style: "Dynamic & Motivational"
    }
  }
};

const TutorCard = ({ tutor, name }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated background glow */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-0 transition-opacity duration-500"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1.1 : 1,
        }}
      />
      
      <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 overflow-hidden">
        {/* Image Container with Original Size */}
        <div className="relative w-full aspect-[4/3] overflow-hidden">
          <motion.div
            animate={{
              scale: isHovered ? 1.05 : 1,
            }}
            transition={{ duration: 0.4 }}
            className="relative w-full h-full"
          >
            <Image
              src={tutor.image}
              alt={name}
              fill
              className="object-cover"
              priority
            />
            {/* Gradient Overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent"
              animate={{
                opacity: isHovered ? 0.7 : 0.5,
              }}
            />
            
            {/* Floating Stats on Image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isHovered ? 1 : 0 }}
              className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-2 border border-slate-700/50"
            >
              <div className="text-sm font-medium text-cyan-400">{tutor.specialty}</div>
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section with Enhanced Animations */}
        <div className="p-6 relative">
          <motion.div
            initial={false}
            animate={{ y: isHovered ? -5 : 0, opacity: 1 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <motion.h3 
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                animate={{
                  backgroundPosition: isHovered ? ["0% 0%", "100% 100%"] : "0% 0%",
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                {name}
              </motion.h3>
              <motion.div
                whileHover={{ rotate: 15, scale: 1.1 }}
                className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tutor.color} p-2 relative group`}
              >
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                <tutor.icon className="w-full h-full text-white relative z-10" />
              </motion.div>
            </div>
            
            <motion.p 
              className="text-slate-300"
              animate={{
                opacity: isHovered ? 1 : 0.8,
              }}
            >
              {tutor.description}
            </motion.p>
            
            {/* Enhanced Stats Grid */}
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(tutor.stats).map(([key, value], index) => (
                <motion.div
                  key={key}
                  whileHover={{ scale: 1.05, y: -2 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-3 rounded-xl bg-gradient-to-br ${tutor.color} bg-opacity-10 backdrop-blur-sm 
                    border border-slate-700/50 text-center relative group overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  <div className="text-sm font-medium text-cyan-400">{value}</div>
                  <div className="text-xs text-slate-400 mt-1">{key}</div>
                </motion.div>
              ))}
            </div>

            {/* Enhanced CTA Button */}
            <Link href={`/chat/${encodeURIComponent(name)}`}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                className={`w-full py-3 rounded-xl bg-gradient-to-r ${tutor.color} text-white font-medium
                  relative group overflow-hidden cursor-pointer`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Start Learning
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </span>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ParticleBackground = () => {
  const [particles, setParticles] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setParticles(Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      duration: `${5 + Math.random() * 5}s`,
      size: `${Math.random() * 2 + 1}px`
    })));
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Animated gradient orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-full filter blur-[100px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-full filter blur-[100px]"
      />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      {/* Animated particles */}
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: particle.top,
            left: particle.left,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: parseFloat(particle.duration),
            delay: parseFloat(particle.delay),
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const StatsSection = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
    {[
      { label: "Active Students", value: "1,000+", icon: Brain },
      { label: "Expert Tutors", value: "25+", icon: Sparkles },
      { label: "Subjects Covered", value: "50+", icon: Target },
      { label: "Success Rate", value: "95%", icon: Brain }
    ].map((stat, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="relative p-6 bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-700/50">
          <stat.icon className="w-8 h-8 text-cyan-400 mb-4" />
          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-slate-400">{stat.label}</div>
        </div>
      </motion.div>
    ))}
  </div>
);

export default function TutorsPage() {
  const tutors = Object.entries(tutorProfiles).map(([id, profile]) => ({
    id,
    ...profile
  }));

  return (
    <div className="min-h-screen bg-slate-950">
      <ParticleBackground />
      <NavBar />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Meet Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Expert Tutors</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Discover your perfect learning companion from our diverse roster of AI tutors,
            each specialized in different teaching styles and subjects.
          </p>
        </motion.div>

        <StatsSection />

        {/* Updated Featured Tutors Carousel */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-8">Featured Tutors</h2>
          <Swiper
            effect="coverflow"
            grabCursor={false}
            centeredSlides={true}
            slidesPerView="auto"
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
              slideShadows: false,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }}
            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
            className="w-full py-12"
            loop={true}
            preventClicks={false}
            preventClicksPropagation={false}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20
              },
              640: {
                slidesPerView: 1.5,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 40
              }
            }}
          >
            {tutors.map((tutor) => (
              <SwiperSlide 
                key={tutor.id} 
                className="max-w-[500px]"
                style={{ userSelect: 'none' }}
              >
                <div onContextMenu={(e) => e.stopPropagation()}>
                  <TutorCard tutor={tutor} name={tutor.name} />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next !text-white after:!text-2xl"></div>
            <div className="swiper-button-prev !text-white after:!text-2xl"></div>
          </Swiper>
        </div>

        {/* All Tutors Grid */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-8">All Tutors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tutors.map((tutor) => (
              <TutorCard key={tutor.id} tutor={tutor} name={tutor.name} />
            ))}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
} 