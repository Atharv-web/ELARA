'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { supabase } from '@/lib/supabase';
import NavBar from "@/components/navbar";
import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle, Heart, Share2, Bookmark, Upload, Mic, Play, Calendar, Users, ThumbsUp, ChevronRight, Sparkles, Book, Code, Calculator, Brain, Globe, Clock } from 'lucide-react';
import Footer from "@/components/footer";

const PostCard = ({ post }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showComments, setShowComments] = useState(false);

  // Add default avatar if none provided
  const avatarSrc = post.author?.avatar || '/default-avatar.png';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden relative group"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Enhanced animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
        animate={{
          opacity: isHovered ? [0.1, 0.2, 0.1] : 0.1,
          scale: isHovered ? [1, 1.05, 1] : 1,
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-xl"
        animate={{
          opacity: isHovered ? [0.2, 0.4, 0.2] : 0,
          scale: isHovered ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <div className="p-6 relative">
        {/* Author section with enhanced animations */}
        <div className="flex items-center gap-4 mb-4">
          <motion.div
            className="relative w-12 h-12 rounded-full overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
              <Image
                src={avatarSrc}
                alt={post.author?.name || 'User'}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-full blur"
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </motion.div>
          <div>
            <motion.h3 
              className="font-semibold text-white"
              animate={{ color: isHovered ? "#22d3ee" : "#ffffff" }}
            >
              {post.author?.name || 'Anonymous'}
            </motion.h3>
            <p className="text-sm text-slate-400">{post.timestamp}</p>
          </div>
        </div>

        {/* Content section */}
        <div className="space-y-4">
          <p className="text-slate-300">{post.content}</p>
          {post.image && post.image !== "" && (
            <motion.div
              className="relative h-48 rounded-xl overflow-hidden"
              whileHover={{ scale: 1.02 }}
            >
              <Image
                src={post.image}
                alt="Post content"
                fill
                className="object-cover"
              />
            </motion.div>
          )}
        </div>

        {/* Tags section */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag, index) => (
              <motion.span
                key={index}
                className="px-3 py-1 rounded-full text-xs font-medium bg-slate-800/50 text-slate-300 border border-slate-700/50"
                whileHover={{ scale: 1.05, y: -2 }}
              >
                #{tag}
              </motion.span>
            ))}
          </div>
        )}

        {/* Interaction buttons */}
        <div className="flex items-center gap-4 mt-6">
          <motion.button
            className={`flex items-center gap-2 text-sm ${isLiked ? 'text-red-500' : 'text-slate-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-red-500' : ''}`} />
            <span>{post.likes || 0}</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-sm text-slate-400"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle className="w-5 h-5" />
            <span>{post.comments?.length || 0}</span>
          </motion.button>

          <motion.button
            className="flex items-center gap-2 text-sm text-slate-400"
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Share2 className="w-5 h-5" />
          </motion.button>

          <motion.button
            className={`flex items-center gap-2 text-sm ml-auto ${isSaved ? 'text-cyan-500' : 'text-slate-400'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsSaved(!isSaved)}
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-cyan-500' : ''}`} />
          </motion.button>
        </div>

        {/* Comments section */}
        <AnimatePresence>
          {showComments && post.comments && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mt-4 space-y-4"
            >
              <div className="h-px bg-slate-800" />
              {post.comments.map((comment, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex-shrink-0 overflow-hidden">
                    <Image
                      src={comment.author?.avatar || '/default-avatar.png'}
                      alt={comment.author || 'Anonymous'}
                      width={32}
                      height={32}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 bg-slate-800/50 rounded-xl p-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-white">{comment.author}</span>
                      <span className="text-xs text-slate-400">{comment.timestamp}</span>
                    </div>
                    <p className="text-sm text-slate-300">{comment.content}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const PodcastTeaser = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 relative overflow-hidden group"
  >
    {/* Background Effects */}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10" />
    
    {/* Content */}
    <div className="relative">
      <div className="flex items-center gap-2 mb-2">
        <span className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm font-medium">
          Coming Soon
        </span>
        <Sparkles className="w-5 h-5 text-purple-400" />
      </div>
      
      <h2 className="text-2xl font-bold text-white mb-4">
        ELARA Learning Podcasts
      </h2>
      
      <p className="text-slate-300 mb-6">
        Get ready for an immersive audio learning experience. Join expert tutors and fellow learners
        in engaging discussions about various topics.
      </p>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center gap-2 text-slate-300">
          <Mic className="w-5 h-5 text-purple-400" />
          <span>Expert-led Sessions</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Calendar className="w-5 h-5 text-purple-400" />
          <span>Weekly Episodes</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <Users className="w-5 h-5 text-purple-400" />
          <span>Community Discussions</span>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <ThumbsUp className="w-5 h-5 text-purple-400" />
          <span>Interactive Learning</span>
        </div>
      </div>
      
      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <span>Get Notified</span>
        <ChevronRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  </motion.div>
);

const UploadModal = ({ isOpen, onClose }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-slate-900 rounded-2xl p-6 w-full max-w-lg mx-4"
        >
          <h2 className="text-xl font-bold text-white mb-4">Create a Post</h2>
          <textarea
            placeholder="What's on your mind?"
            className="w-full h-32 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 mb-4"
          />
          <div className="flex items-center gap-4 mb-6">
            <button className="flex items-center gap-2 text-slate-400 hover:text-cyan-500 transition-colors">
              <Upload className="w-5 h-5" />
              <span>Upload Image</span>
            </button>
            <input
              type="text"
              placeholder="Add tags (comma separated)"
              className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl px-4 py-2 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button onClick={onClose} variant="outline" className="border-slate-700 text-slate-300">
              Cancel
            </Button>
            <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
              Post
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

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

const FloatingShape = ({ delay = 0, className = "", children }) => (
  <motion.div
    className={`absolute ${className}`}
    animate={{
      y: [0, -20, 0],
      rotate: [0, 5, 0]
    }}
    transition={{
      duration: 8,
      delay,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    {children}
  </motion.div>
);

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
      {/* Main gradient background */}
      <div className="absolute inset-0 bg-slate-950" />
      
      {/* Animated gradient orbs */}
      <FloatingOrb delay={0} className="top-0 left-1/4" />
      <FloatingOrb delay={5} color="from-purple-500/30 to-pink-500/30" className="bottom-1/4 right-1/4" />
      <FloatingOrb delay={10} size={200} color="from-emerald-500/30 to-teal-500/30" className="top-1/2 left-1/3" />
      
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />
      
      {/* Animated particles */}
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

const StudyGroupCard = ({ group }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, scale: 1.02 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl overflow-hidden relative group cursor-pointer"
    >
      {/* Enhanced animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10"
        animate={{
          opacity: isHovered ? [0.1, 0.3, 0.1] : 0.1,
          scale: isHovered ? [1, 1.1, 1] : 1,
          rotate: isHovered ? [0, 1, -1, 0] : 0
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced glow effect */}
      <motion.div
        className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 blur-xl"
        animate={{
          opacity: isHovered ? [0.3, 0.6, 0.3] : 0,
          scale: isHovered ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* Enhanced header section */}
      <div className="relative h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 overflow-hidden">
        <motion.div 
          className="absolute inset-0 bg-[url('/grid.svg')] bg-center"
          animate={{
            opacity: isHovered ? [0.1, 0.3, 0.1] : [0.1, 0.2, 0.1],
            scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            rotate: isHovered ? [0, 2, -2, 0] : 0
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Enhanced group icon */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <motion.div
            className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 relative group/icon"
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 rounded-2xl blur"
              animate={{
                opacity: [0, 0.5, 0],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <div className="w-full h-full bg-slate-900 rounded-[14px] flex items-center justify-center relative">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                  color: isHovered ? ["#22d3ee", "#3b82f6", "#22d3ee"] : "#22d3ee"
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {group.icon}
              </motion.div>
            </div>
          </motion.div>
          <div>
            <motion.h3 
              className="text-xl font-bold text-white"
              animate={{ color: isHovered ? "#22d3ee" : "#ffffff" }}
            >
              {group.name}
            </motion.h3>
            <p className="text-sm text-slate-300">{group.members} members</p>
          </div>
        </div>
      </div>

      <div className="p-4 relative z-10">
        <p className="text-slate-300 mb-4">{group.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map((tag, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1, y: -2 }}
              className="px-2 py-1 rounded-full text-xs bg-slate-800/50 text-cyan-400 border border-cyan-500/20"
            >
              #{tag}
            </motion.span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-2 text-slate-400"
            whileHover={{ scale: 1.05, x: 5 }}
          >
            <Clock className="w-4 h-4" />
            <span>{group.schedule}</span>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={() => setIsJoined(!isJoined)}
              className={`relative overflow-hidden ${
                isJoined
                  ? 'bg-slate-800 text-cyan-400 hover:bg-slate-800/80'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
              } transition-colors`}
            >
              <motion.div
                className="absolute inset-0"
                animate={isJoined ? {
                  background: [
                    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0))",
                    "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0), rgba(255,255,255,0.1))",
                    "linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.1), rgba(255,255,255,0))"
                  ],
                  x: ["-100%", "100%", "-100%"]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.span
                className="relative z-10 flex items-center gap-2"
                animate={isJoined ? {
                  scale: [1, 1.1, 1],
                } : {}}
                transition={{ duration: 0.3 }}
              >
                {isJoined ? (
                  <>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 500 }}
                    >
                      ✓
                    </motion.div>
                    Joined
                  </>
                ) : (
                  'Join Group'
                )}
              </motion.span>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const sampleStudyGroups = [
  {
    id: 1,
    name: "Python Programmers",
    description: "A group for Python enthusiasts to learn, share knowledge, and work on projects together. Weekly coding challenges and peer reviews.",
    members: 128,
    icon: <Code className="w-8 h-8 text-cyan-400" />,
    tags: ["python", "programming", "beginners-welcome"],
    schedule: "Tuesdays & Thursdays, 7 PM EST"
  },
  {
    id: 2,
    name: "Math Masters",
    description: "Deep dive into advanced mathematics concepts. Group problem-solving sessions and theorem discussions.",
    members: 95,
    icon: <Calculator className="w-8 h-8 text-cyan-400" />,
    tags: ["mathematics", "calculus", "algebra"],
    schedule: "Mondays & Wednesdays, 6 PM EST"
  },
  {
    id: 3,
    name: "Language Exchange",
    description: "Practice multiple languages with native speakers. Cultural exchange and conversation practice sessions.",
    members: 156,
    icon: <Globe className="w-8 h-8 text-cyan-400" />,
    tags: ["languages", "cultural-exchange", "conversation"],
    schedule: "Daily, 8 PM EST"
  },
  {
    id: 4,
    name: "Science Squad",
    description: "Explore various scientific topics, from quantum physics to molecular biology. Weekly experiments and discussions.",
    members: 112,
    icon: <Brain className="w-8 h-8 text-cyan-400" />,
    tags: ["science", "physics", "biology"],
    schedule: "Fridays, 5 PM EST"
  }
];

export default function CommunityPage() {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState('posts');
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: {
        name: "Sarah Chen",
        avatar: "/avatars/sarah.png"
      },
      timestamp: "2 hours ago",
      content: "Just completed an amazing session on quantum mechanics with Dr. Quantum Quest! The way he explained the double-slit experiment using everyday examples was mind-blowing! 🌟",
      image: "/images/quantum.jpg",
      likes: 42,
      tags: ["physics", "quantum", "learning"],
      comments: [
        {
          author: "Alex Thompson",
          content: "That's awesome! I had a similar experience with the wave function explanation.",
          timestamp: "1 hour ago"
        },
        {
          author: "Maria Garcia",
          content: "Could you share some of those examples? I'm struggling with this concept.",
          timestamp: "30 minutes ago"
        }
      ]
    },
    {
      id: 2,
      author: {
        name: "James Wilson",
        avatar: "/avatars/james.png"
      },
      timestamp: "5 hours ago",
      content: "Working on a group project with Nova Starweaver guiding us through complex algorithms. The collaborative approach is making everything click! 💡",
      likes: 35,
      tags: ["coding", "algorithms", "teamwork"],
      comments: [
        {
          author: "David Kim",
          content: "The visualization techniques really helped me understand Big O notation better!",
          timestamp: "3 hours ago"
        }
      ]
    }
  ]);

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <ParticleEffect />
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">
            Join Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Learning Community</span>
          </h1>
          <p className="max-w-[700px] mx-auto text-slate-300 text-lg">
            Connect with fellow learners, share experiences, and grow together
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setActiveTab('posts')}
                    className={`relative overflow-hidden group ${
                      activeTab === 'posts'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-slate-800/50 text-slate-300 hover:text-white'
                    }`}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                      animate={activeTab === 'posts' ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">Posts</span>
                  </Button>
                </motion.div>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onClick={() => setActiveTab('groups')}
                    className={`relative overflow-hidden group ${
                      activeTab === 'groups'
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white'
                        : 'bg-slate-800/50 text-slate-300 hover:text-white'
                    }`}
                  >
                    <motion.span
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '100%' }}
                      transition={{ duration: 0.5 }}
                    />
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100"
                      animate={activeTab === 'groups' ? {
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.4, 0.2],
                      } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <span className="relative z-10">Study Groups</span>
                  </Button>
                </motion.div>
              </div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={() => setShowUploadModal(true)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative overflow-hidden group"
                >
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20"
                    animate={{
                      opacity: [0.2, 0.4, 0.2],
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="relative z-10 flex items-center"
                    whileHover={{ x: 5 }}
                  >
                    {activeTab === 'posts' ? (
                      <>
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15 }}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                        </motion.div>
                        Create Post
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ rotate: 0 }}
                          whileHover={{ rotate: 15 }}
                        >
                          <Users className="w-4 h-4 mr-2" />
                        </motion.div>
                        Create Group
                      </>
                    )}
                  </motion.div>
                </Button>
              </motion.div>
            </div>

            {activeTab === 'posts' ? (
              <div className="space-y-6">
                {posts.map((post, index) => (
                  <PostCard key={index} post={post} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {sampleStudyGroups.map((group) => (
                  <StudyGroupCard key={group.id} group={group} />
                ))}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="md:w-80 space-y-6">
            <PodcastTeaser />
            
            {/* Community Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-900/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Community Stats</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Active Learners</span>
                  <span className="text-white font-medium">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Posts Today</span>
                  <span className="text-white font-medium">56</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Study Groups</span>
                  <span className="text-white font-medium">28</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
      <Footer />
      <UploadModal isOpen={showUploadModal} onClose={() => setShowUploadModal(false)} />
    </div>
  );
} 