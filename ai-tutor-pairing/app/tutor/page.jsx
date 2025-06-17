'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, Select, MenuItem, TextField, Slider, Radio, RadioGroup, FormControlLabel } from '@mui/material';
import { ai_tutor_name_1, ai_tutor_name_2, ai_tutor_name_3, ai_tutor_name_4, ai_tutor_name_5, ai_tutor_name_6, ai_tutor_name_7, ai_tutor_name_8, teaching_templates } from '@/lib/tutorTemplates';
import { Send, Copy, Check, ThumbsUp, ThumbsDown, MoreVertical, Sparkles, Brain, Target } from 'lucide-react';
import Image from 'next/image';
import { teachingChains } from '@/lib/teachingChains';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import remarkGfm from 'remark-gfm';

const tutorProfiles = {
  "Urahara Sensei": {
    name: ai_tutor_name_1,
    image: "images/tutors/1.jpg",
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
    image: "images/tutors/2.jpg",
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
    image: "images/tutors/3.jpg",
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
    image: "images/tutors/4.jpg",
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
    image: "images/tutors/5.jpg",
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
    image: "images/tutors/6.jpg",
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
    image: "images/tutors/7.jpg",
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
    image: "images/tutors/8.jpg",
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

const TutorCard = ({ tutor, name, selected, onSelect }) => {
  const Icon = tutorProfiles[tutor].icon;
  
  return (
    <motion.div
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.98 }}
      className={`cursor-pointer relative ${selected ? 'ring-2 ring-cyan-500' : ''}`}
      onClick={() => onSelect(tutor)}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl" />
      <div className={`absolute inset-0 bg-gradient-to-r ${tutorProfiles[tutor].color} opacity-10 rounded-xl`} />
      <div className="relative p-4 backdrop-blur-sm rounded-xl border border-slate-700/50">
        <div className="flex items-start gap-3">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative h-12 w-12 rounded-lg overflow-hidden">
              <img
                src={tutorProfiles[tutor].image}
                alt={name}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 truncate">
              {name}
            </h3>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{tutorProfiles[tutor].description}</p>
          </div>
          <Icon className="w-5 h-5 text-cyan-500 flex-shrink-0" />
        </div>
        
        <div className="mt-3 grid grid-cols-3 gap-1.5 text-xs text-slate-400">
          {Object.entries(tutorProfiles[tutor].stats).map(([key, value]) => (
            <div key={key} className="p-1.5 rounded-lg bg-slate-800/50 text-center">
              <div className="font-medium text-slate-300 truncate text-[11px]">{value}</div>
              <div className="mt-0.5 opacity-60 truncate text-[10px]">{key}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ChatMessage = ({ message, isUser }) => {
  const variants = {
    hidden: { 
      opacity: 0,
      y: 20,
      scale: 0.95,
      filter: 'blur(8px)'
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        mass: 1
      }
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      filter: 'blur(4px)',
      transition: {
        duration: 0.2
      }
    }
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`flex items-start gap-4 ${isUser ? 'flex-row-reverse' : ''}`}
      layout
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`flex-shrink-0 w-10 h-10 rounded-full overflow-hidden relative group ${
          isUser ? 'bg-gradient-to-br from-cyan-400 to-blue-500' : 'bg-gradient-to-br from-purple-400 to-indigo-500'
        }`}
      >
        {isUser ? (
          <div className="w-full h-full flex items-center justify-center text-white font-medium">
            U
          </div>
        ) : (
          <Image
            src={tutorProfiles[message.role]?.image || '/default-avatar.png'}
            alt={tutorProfiles[message.role]?.name || 'Tutor'}
            width={40}
            height={40}
            className="object-cover w-full h-full transition-transform duration-200 group-hover:scale-110"
          />
        )}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>

      <motion.div 
        className={`flex-1 space-y-1 ${isUser ? 'items-end' : 'items-start'}`}
        initial={{ opacity: 0, x: isUser ? 20 : -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
      >
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-sm font-medium text-slate-300">
            {isUser ? 'You' : tutorProfiles[message.role]?.name || 'Tutor'}
          </span>
          <span className="text-xs text-slate-500">
            {new Date().toLocaleTimeString()}
          </span>
        </div>
        <div 
          className={`relative rounded-2xl px-4 py-3 ${
            isUser 
              ? 'bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/20' 
              : 'bg-gradient-to-br from-purple-500/10 to-indigo-500/10 border border-purple-500/20'
          } backdrop-blur-sm`}
        >
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              children={message.content}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <div className="relative group">
                      <div className="absolute -inset-2 bg-slate-800/50 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
                      <SyntaxHighlighter
                        {...props}
                        children={String(children).replace(/\n$/, '')}
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="relative rounded-lg !bg-slate-800/30 !p-3"
                      />
                    </div>
                  ) : (
                    <code {...props} className="bg-slate-800/30 rounded px-1 py-0.5">
                      {children}
                    </code>
                  );
                }
              }}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
        </div>
      </motion.div>
    </motion.div>
  );
};

const AnimatedBackground = () => {
  const [stars, setStars] = useState([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setStars(Array.from({ length: 50 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 3}s`,
      duration: `${2 + Math.random() * 2}s`
    })));
  }, []);

  if (!mounted) return null;

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
      
      {/* Animated stars */}
      <div className="absolute inset-0">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-twinkle"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.delay,
              animationDuration: star.duration
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add calibration questions
const calibrationQuestions = [
  {
    id: 'learning_approach',
    question: "What's your preferred way of understanding new concepts?",
    type: 'radio',
    weight: 2.0, // Primary learning style has highest weight
    options: [
      { 
        value: 'analytical',
        label: 'Through systematic analysis and experimentation',
        tutors: ['Dr. Quantum Quest', 'Kuchiki Sensei'],
        points: { 'Dr. Quantum Quest': 2, 'Kuchiki Sensei': 1 }
      },
      { 
        value: 'creative',
        label: 'Through stories and creative connections',
        tutors: ['Nova Starweaver', 'Urahara Sensei'],
        points: { 'Nova Starweaver': 2, 'Urahara Sensei': 1 }
      },
      { 
        value: 'philosophical',
        label: 'Through deep reasoning and discussion',
        tutors: ['Professor Echo', 'Yamamoto Sensei'],
        points: { 'Professor Echo': 2, 'Yamamoto Sensei': 1 }
      },
      { 
        value: 'practical',
        label: 'Through hands-on practice and clear steps',
        tutors: ['Master Zen', 'Coach Phoenix'],
        points: { 'Master Zen': 2, 'Coach Phoenix': 1 }
      }
    ]
  },
  {
    id: 'learning_environment',
    question: "What kind of learning environment helps you focus best?",
    type: 'radio',
    weight: 1.5, // Learning environment preference
    options: [
      {
        value: 'structured',
        label: 'Organized and methodical',
        tutors: ['Kuchiki Sensei', 'Master Zen'],
        points: { 'Kuchiki Sensei': 2, 'Master Zen': 1 }
      },
      {
        value: 'dynamic',
        label: 'Interactive and energetic',
        tutors: ['Coach Phoenix', 'Urahara Sensei'],
        points: { 'Coach Phoenix': 2, 'Urahara Sensei': 1 }
      },
      {
        value: 'contemplative',
        label: 'Thoughtful and reflective',
        tutors: ['Yamamoto Sensei', 'Professor Echo'],
        points: { 'Yamamoto Sensei': 2, 'Professor Echo': 1 }
      },
      {
        value: 'explorative',
        label: 'Creative and experimental',
        tutors: ['Nova Starweaver', 'Dr. Quantum Quest'],
        points: { 'Nova Starweaver': 2, 'Dr. Quantum Quest': 1 }
      }
    ]
  },
  {
    id: 'feedback_style',
    question: "How do you prefer to receive feedback?",
    type: 'radio',
    weight: 1.3, // Feedback style preference
    options: [
      {
        value: 'direct',
        label: 'Clear and precise corrections',
        tutors: ['Kuchiki Sensei', 'Dr. Quantum Quest'],
        points: { 'Kuchiki Sensei': 2, 'Dr. Quantum Quest': 1 }
      },
      {
        value: 'guided',
        label: 'Through guiding questions and hints',
        tutors: ['Professor Echo', 'Nova Starweaver'],
        points: { 'Professor Echo': 2, 'Nova Starweaver': 1 }
      },
      {
        value: 'encouraging',
        label: 'Motivational with clear next steps',
        tutors: ['Coach Phoenix', 'Urahara Sensei'],
        points: { 'Coach Phoenix': 2, 'Urahara Sensei': 1 }
      },
      {
        value: 'reflective',
        label: 'Thoughtful and detailed explanations',
        tutors: ['Master Zen', 'Yamamoto Sensei'],
        points: { 'Master Zen': 2, 'Yamamoto Sensei': 1 }
      }
    ]
  },
  {
    id: 'challenge_preference',
    question: "How do you like to approach challenging topics?",
    type: 'radio',
    weight: 1.2, // Challenge approach preference
    options: [
      {
        value: 'systematic',
        label: 'Break down into smaller, manageable parts',
        tutors: ['Dr. Quantum Quest', 'Master Zen'],
        points: { 'Dr. Quantum Quest': 2, 'Master Zen': 1 }
      },
      {
        value: 'holistic',
        label: 'Understand the big picture first',
        tutors: ['Yamamoto Sensei', 'Nova Starweaver'],
        points: { 'Yamamoto Sensei': 2, 'Nova Starweaver': 1 }
      },
      {
        value: 'competitive',
        label: 'Take on progressively harder challenges',
        tutors: ['Coach Phoenix', 'Kuchiki Sensei'],
        points: { 'Coach Phoenix': 2, 'Kuchiki Sensei': 1 }
      },
      {
        value: 'exploratory',
        label: 'Experiment and learn through discovery',
        tutors: ['Urahara Sensei', 'Professor Echo'],
        points: { 'Urahara Sensei': 2, 'Professor Echo': 1 }
      }
    ]
  }
];

const CalibrationQuestion = ({ question, currentAnswer, onAnswer, isActive }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: isActive ? 1 : 0.5, x: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <h3 className="text-xl font-semibold text-white mb-4">{question.question}</h3>
      <RadioGroup
        value={currentAnswer || ''}
        onChange={(e) => onAnswer(question.id, e.target.value)}
        className="space-y-3"
      >
        {question.options.map((option) => (
          <motion.div
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FormControlLabel
              value={option.value}
              control={
                <Radio 
                  sx={{
                    color: 'rgb(6, 182, 212)',
                    '&.Mui-checked': {
                      color: 'rgb(6, 182, 212)',
                    },
                  }}
                />
              }
              label={
                <div className="ml-2 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 backdrop-blur-sm w-full">
                  <span className="text-white">{option.label}</span>
                </div>
              }
              className="w-full m-0"
            />
          </motion.div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

const CalibrationSection = ({ onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [mounted, setMounted] = useState(false);
  const swiperRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAnswer = useCallback((questionId, answer) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
    
    if (currentQuestionIndex < calibrationQuestions.length - 1) {
      setIsTransitioning(true);
      setTimeout(() => {
        if (swiperRef.current?.swiper) {
          swiperRef.current.swiper.slideNext();
          setCurrentQuestionIndex(prev => prev + 1);
        }
        setIsTransitioning(false);
      }, 300);
    }
  }, [currentQuestionIndex]);

  const progress = useMemo(() => 
    (Object.keys(answers).length / calibrationQuestions.length) * 100
  , [answers]);

  if (!mounted) return null;

  return (
    <div className="max-w-3xl mx-auto relative px-4">
      {/* Progress bar */}
      <div className="relative h-2 bg-slate-800 rounded-full overflow-hidden mb-8">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 to-blue-500"
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Question counter */}
      <div className="text-center mb-8">
        <span className="text-lg text-slate-400">
          Question {currentQuestionIndex + 1} of {calibrationQuestions.length}
        </span>
      </div>

      <Swiper
        ref={swiperRef}
        effect="fade"
        grabCursor={false}
        centeredSlides={true}
        slidesPerView={1}
        speed={300}
        allowTouchMove={false}
        pagination={{
          type: 'bullets',
          clickable: true,
          dynamicBullets: true,
        }}
        modules={[Pagination]}
        className="calibration-swiper"
      >
        {calibrationQuestions.map((question, index) => (
          <SwiperSlide key={question.id} className="calibration-slide">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="p-8 md:p-10 backdrop-blur-lg bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700/50 shadow-xl"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 mb-8">
                {question.question}
              </h3>
              
              <div className="space-y-4">
                {question.options.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => !isTransitioning && handleAnswer(question.id, option.value)}
                    className={`w-full transition-all duration-200 ${
                      answers[question.id] === option.value
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/20'
                        : 'bg-slate-800/50 hover:bg-slate-700/50 text-slate-300'
                    } p-6 rounded-xl relative group`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isTransitioning}
                  >
                    <span className="relative z-10 text-lg">{option.label}</span>
                    {answers[question.id] === option.value && (
                      <motion.div
                        layoutId="highlight"
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl -z-10"
                        initial={false}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>

      {Object.keys(answers).length === calibrationQuestions.length && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 flex justify-center"
        >
          <button
            onClick={() => onComplete(answers)}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium
              hover:shadow-lg hover:shadow-cyan-500/20 transition-all duration-200 text-lg"
          >
            Find Your Perfect Tutor
          </button>
        </motion.div>
      )}
    </div>
  );
};

// Move styles definition to a separate useEffect
const StylesInjector = () => {
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes float-slow {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-20px, 20px) rotate(5deg); }
      }
      
      @keyframes float-medium {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(20px, -20px) rotate(-5deg); }
      }
      
      @keyframes float-fast {
        0%, 100% { transform: translate(0, 0) rotate(0deg); }
        50% { transform: translate(-15px, -15px) rotate(3deg); }
      }
      
      @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0); }
        50% { opacity: 1; transform: scale(1); }
      }

      @keyframes pulse-glow {
        0%, 100% { opacity: 0.5; transform: scale(1); }
        50% { opacity: 0.8; transform: scale(1.05); }
      }

      @keyframes gradient-shift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .animate-float-slow {
        animation: float-slow 8s ease-in-out infinite;
      }
      
      .animate-float-medium {
        animation: float-medium 6s ease-in-out infinite;
      }
      
      .animate-float-fast {
        animation: float-fast 4s ease-in-out infinite;
      }
      
      .animate-twinkle {
        animation: twinkle ease-in-out infinite;
      }

      .animate-pulse-glow {
        animation: pulse-glow 4s ease-in-out infinite;
      }

      .gradient-shift-bg {
        background-size: 200% 200%;
        animation: gradient-shift 15s ease infinite;
      }

      .chat-container {
        position: relative;
        overflow: hidden;
      }

      .chat-container::before {
        content: '';
        position: absolute;
        inset: 0;
        background: radial-gradient(circle at 50% 0%, rgba(6, 182, 212, 0.15), transparent 70%);
        pointer-events: none;
      }

      .chat-container::after {
        content: '';
        position: absolute;
        inset: 0;
        background: linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.9));
        pointer-events: none;
      }

      .tutor-match-card {
        position: relative;
        overflow: hidden;
      }

      .tutor-match-card::before {
        content: '';
        position: absolute;
        inset: -50%;
        background: radial-gradient(circle at center, rgba(6, 182, 212, 0.15), transparent 70%);
        opacity: 0.5;
        animation: pulse-glow 4s ease-in-out infinite;
      }

      .chat-message {
        transition: all 0.3s ease;
      }

      .chat-message:hover {
        transform: translateY(-2px);
      }

      .message-input {
        backdrop-filter: blur(8px);
        transition: all 0.3s ease;
      }

      .message-input:focus-within {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px -4px rgba(6, 182, 212, 0.3);
      }
    `;
    document.head.appendChild(styleSheet);
    return () => document.head.removeChild(styleSheet);
  }, []);
  return null;
};

const CalibrationResults = ({ selectedTutor, topMatches, tutorProfiles }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="tutor-match-card bg-gradient-to-br from-slate-900/90 to-slate-800/90 rounded-2xl border border-slate-700/50 shadow-xl p-8 mb-8 max-w-4xl mx-auto gradient-shift-bg"
    >
      <div className="relative z-10">
        <h2 className="text-3xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
          Your Learning Style Match
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
                <Target className="w-5 h-5 text-white" />
              </span>
              Primary Tutor Match
            </h3>
            <motion.div 
              className="p-6 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              <div className="flex items-start gap-6">
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl blur opacity-50 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
                  <div className="relative w-24 h-24 rounded-xl overflow-hidden">
                    <img
                      src={tutorProfiles[selectedTutor].image}
                      alt={selectedTutor}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div className="flex-1">
                  <h4 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                    {tutorProfiles[selectedTutor].name}
                  </h4>
                  <p className="text-slate-300 mt-2">{tutorProfiles[selectedTutor].description}</p>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <div className="p-2 rounded-lg bg-slate-900/50 text-center">
                      <div className="text-sm font-medium text-cyan-400">{tutorProfiles[selectedTutor].stats.experience}</div>
                      <div className="text-xs text-slate-400 mt-1">Experience</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/50 text-center">
                      <div className="text-sm font-medium text-cyan-400">{tutorProfiles[selectedTutor].stats.subjects}</div>
                      <div className="text-xs text-slate-400 mt-1">Focus</div>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-900/50 text-center">
                      <div className="text-sm font-medium text-cyan-400">{tutorProfiles[selectedTutor].stats.style}</div>
                      <div className="text-xs text-slate-400 mt-1">Style</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </span>
              Alternative Tutors
            </h3>
            <div className="space-y-4">
              {topMatches.slice(1).map((tutor, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-slate-800/50 rounded-xl border border-slate-700/50 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-500/10 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <img
                        src={tutorProfiles[tutor].image}
                        alt={tutor}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                        {tutorProfiles[tutor].name}
                      </div>
                      <div className="text-sm text-slate-400 mt-1">{tutorProfiles[tutor].specialty}</div>
                      <div className="text-xs text-slate-500 mt-1">{tutorProfiles[tutor].stats.style}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ChatContainer = ({ messages, input, handleInputChange, handleSendMessage, isLoading, selectedTutor, tutorProfiles }) => {
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [showScrollIndicator, setShowScrollIndicator] = useState(false);
  const [autoScroll, setAutoScroll] = useState(true);
  const [lastMessageCount, setLastMessageCount] = useState(messages.length);

  const scrollToBottom = useCallback(() => {
    if (chatContainerRef.current) {
      const scrollContainer = chatContainerRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (chatContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatContainerRef.current;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
      setShowScrollIndicator(!isNearBottom);
      setAutoScroll(isNearBottom);
    }
  }, []);

  useEffect(() => {
    if (messages.length > lastMessageCount && autoScroll) {
      scrollToBottom();
    }
    setLastMessageCount(messages.length);
  }, [messages.length, lastMessageCount, autoScroll, scrollToBottom]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden relative">
      {/* Gradient Overlay at the top */}
      <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-slate-900 to-transparent z-10 pointer-events-none" />
      
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto px-6 space-y-4 scroll-smooth relative chat-messages"
      >
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message}
              isUser={message.role === 'user'}
            />
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-1.5 pl-14"
            >
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.2 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3 }}
              />
              <motion.div 
                className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-500"
                animate={{ scale: [1, 0.8, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.4 }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Message Input */}
      <motion.div 
        className="sticky bottom-0 left-0 right-0 p-6 border-t border-slate-800/50 bg-slate-900/95 backdrop-blur-xl message-input"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div className="flex gap-3">
          <TextField
            inputRef={inputRef}
            fullWidth
            value={input}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={`Ask ${tutorProfiles[selectedTutor]?.name} a question...`}
            multiline
            maxRows={4}
            className="bg-slate-800/30 rounded-xl"
            sx={{
              '& .MuiOutlinedInput-root': {
                color: 'white',
                padding: '12px',
                '& fieldset': { borderColor: 'rgba(148, 163, 184, 0.1)' },
                '&:hover fieldset': { borderColor: 'rgba(148, 163, 184, 0.2)' },
                '&.Mui-focused fieldset': { 
                  borderColor: 'rgba(6, 182, 212, 0.5)',
                  boxShadow: '0 0 0 2px rgba(6, 182, 212, 0.2)'
                }
              }
            }}
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
            className={`px-4 py-2 rounded-xl bg-gradient-to-r ${tutorProfiles[selectedTutor]?.color || 'from-cyan-500 to-blue-500'} 
              text-white font-medium flex items-center justify-center min-w-[80px] relative group
              disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200
              hover:shadow-lg hover:shadow-cyan-500/20`}
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 blur transition-opacity" />
            {isLoading ? (
              <motion.div 
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            ) : (
              <Send className="w-5 h-5 relative z-10" />
            )}
          </motion.button>
        </div>
      </motion.div>

      {/* Enhanced Scroll-to-Bottom Button */}
      <AnimatePresence>
        {showScrollIndicator && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => {
              setAutoScroll(true);
              scrollToBottom();
            }}
            className="fixed bottom-32 right-8 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/20 transition-all z-50 group"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 blur transition-opacity" />
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 relative z-10" 
              viewBox="0 0 20 20" 
              fill="currentColor"
              animate={{ y: [0, 2, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </motion.svg>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

const Header = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll progress
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
      
      // Check if page is scrolled
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-slate-900/80 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-cyan-500 to-blue-500" 
        style={{ width: `${scrollProgress}%` }} 
      />

      <div className="container mx-auto max-w-7xl">
        <div className="flex items-center justify-between px-4 py-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 p-[2px] group-hover:scale-105 transition-transform relative">
                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/50 to-blue-500/50 blur-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-full h-full rounded-[6px] bg-slate-900 flex items-center justify-center overflow-hidden">
                  <span className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">E</span>
                </div>
              </div>
              <motion.span 
                className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                ELARA
              </motion.span>
            </Link>
          </motion.div>
          
          <div className="flex items-center gap-4">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/pricing"
                className="relative px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium flex items-center gap-2 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <Sparkles className="w-4 h-4" />
                <span className="relative z-10">Upgrade Plan</span>
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/"
                className="relative px-4 py-2 rounded-lg bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white transition-all border border-slate-700/50 hover:border-slate-600/50 flex items-center gap-2 group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-4 h-4 transition-transform group-hover:-translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </motion.svg>
                <motion.span
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  Back to Home
                </motion.span>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

const TutorPage = () => {
  const [calibrationComplete, setCalibrationComplete] = useState(false);
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [topMatches, setTopMatches] = useState([]);
  const [showAllTutors, setShowAllTutors] = useState(false);
  const chatContainerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Check if user has already completed calibration
    const checkCalibration = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('calibration_data')
            .eq('id', user.id)
            .single();

          if (profile?.calibration_data) {
            setCalibrationComplete(true);
            setSelectedTutor(profile.calibration_data.primary_tutor);
            setTopMatches(profile.calibration_data.tutor_matches);
          }
        }
      } catch (error) {
        console.error('Error checking calibration:', error);
      }
    };

    checkCalibration();
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = {
      role: 'user',
      content: input.trim(),
      tutor: selectedTutor
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: input.trim(),
          tutor: selectedTutor,
          history: messages
        }),
      });

      const data = await response.json();

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        tutor: selectedTutor
      }]);

      if (inputRef.current) {
        inputRef.current.focus();
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCalibrationComplete = async (answers) => {
    // Initialize scores for all tutors
    const tutorScores = Object.keys(tutorProfiles).reduce((acc, tutor) => {
      acc[tutor] = 0;
      return acc;
    }, {});

    // Calculate weighted scores based on answers
    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = calibrationQuestions.find(q => q.id === questionId);
      const selectedOption = question.options.find(opt => opt.value === answer);
      
      if (selectedOption) {
        Object.entries(selectedOption.points).forEach(([tutor, points]) => {
          tutorScores[tutor] += points * question.weight;
        });
      }
    });

    // Find primary and secondary matches
    const sortedTutors = Object.entries(tutorScores)
      .sort(([,a], [,b]) => b - a)
      .map(([tutor]) => tutor);

    const primaryMatch = sortedTutors[0];
    const secondaryMatches = sortedTutors.slice(1, 3);

    // Save calibration data to Supabase
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            calibration_data: {
              answers,
              primary_tutor: primaryMatch,
              tutor_matches: [primaryMatch, ...secondaryMatches],
              completed_at: new Date().toISOString()
            }
          });
      }
    } catch (error) {
      console.error('Error saving calibration:', error);
    }

    setSelectedTutor(primaryMatch);
    setTopMatches([primaryMatch, ...secondaryMatches]);
    setCalibrationComplete(true);
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <StylesInjector />
      <AnimatedBackground />
      <Header />
      
      <div className="container mx-auto px-4 py-8 pt-24 relative max-w-7xl">
        {!calibrationComplete ? (
          <CalibrationSection onComplete={handleCalibrationComplete} />
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div className="lg:col-span-2">
                <CalibrationResults
                  selectedTutor={selectedTutor}
                  topMatches={topMatches}
                  tutorProfiles={tutorProfiles}
                />
                
                <div className="max-w-4xl mx-auto">
                  <Card className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-xl shadow-cyan-500/5">
                    <CardContent className="h-full p-0 flex flex-col">
                      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800/50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-[10px] bg-slate-900/90 flex items-center justify-center overflow-hidden">
                              <img
                                src={tutorProfiles[selectedTutor]?.image}
                                alt={tutorProfiles[selectedTutor]?.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {tutorProfiles[selectedTutor]?.name}
                            </h3>
                            <p className="text-sm text-slate-400">{tutorProfiles[selectedTutor]?.specialty}</p>
                          </div>
                        </div>
                      </div>
                      
                      <ChatContainer
                        messages={messages}
                        input={input}
                        handleInputChange={handleInputChange}
                        handleSendMessage={handleSendMessage}
                        isLoading={isLoading}
                        selectedTutor={selectedTutor}
                        tutorProfiles={tutorProfiles}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-4 space-y-4">
                  <div className="bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-xl border border-slate-800/50 rounded-2xl shadow-xl shadow-cyan-500/5 p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-white">Available Tutors</h3>
                      <button
                        onClick={() => setShowAllTutors(!showAllTutors)}
                        className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                      >
                        {showAllTutors ? 'Show Less' : 'Show All'}
                      </button>
                    </div>
                    <div className="space-y-3">
                      {Object.entries(tutorProfiles)
                        .slice(0, showAllTutors ? undefined : 3)
                        .map(([tutor, profile]) => (
                          <TutorCard
                            key={tutor}
                            tutor={tutor}
                            name={profile.name}
                            selected={selectedTutor === tutor}
                            onSelect={setSelectedTutor}
                          />
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TutorPage;