'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Code, ChefHat, Microscope, Palette, Music, Book, Award, Trophy, Star, Target } from 'lucide-react';
import { Button } from "@/components/ui/button";

const subjects = [
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    icon: <Brain className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    description: 'Learn about AI, Machine Learning, and Neural Networks',
    topics: ['Machine Learning Basics', 'Neural Networks', 'Computer Vision', 'Natural Language Processing']
  },
  {
    id: 'programming',
    name: 'Programming',
    icon: <Code className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    description: 'Master various programming languages and concepts',
    topics: ['Python', 'JavaScript', 'Data Structures', 'Algorithms']
  },
  {
    id: 'cooking',
    name: 'Culinary Arts',
    icon: <ChefHat className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-orange-500 to-red-500',
    description: 'Explore cooking techniques and global cuisines',
    topics: ['Basic Techniques', 'World Cuisines', 'Baking', 'Food Science']
  },
  {
    id: 'science',
    name: 'Science',
    icon: <Microscope className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-emerald-500 to-teal-500',
    description: 'Discover the wonders of science and nature',
    topics: ['Physics', 'Chemistry', 'Biology', 'Astronomy']
  },
  {
    id: 'art',
    name: 'Art & Design',
    icon: <Palette className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-rose-500 to-pink-500',
    description: 'Express creativity through various art forms',
    topics: ['Drawing', 'Painting', 'Digital Art', 'Design Principles']
  },
  {
    id: 'music',
    name: 'Music',
    icon: <Music className="w-8 h-8 text-white" />,
    color: 'bg-gradient-to-r from-indigo-500 to-purple-500',
    description: 'Learn music theory and instrument basics',
    topics: ['Music Theory', 'Instruments', 'Composition', 'Music History']
  }
];

const QuizCard = ({ question, options, onAnswer, isCorrect, showResult }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50"
    >
      <h3 className="text-xl font-semibold text-white mb-4">{question}</h3>
      <div className="space-y-3">
        {options.map((option, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onAnswer(option)}
            className={`w-full p-4 rounded-lg text-left transition-all relative group overflow-hidden
              ${showResult 
                ? option.isCorrect 
                  ? 'bg-emerald-500/20 border-emerald-500/50' 
                  : 'bg-red-500/20 border-red-500/50'
                : 'bg-slate-700/50 hover:bg-slate-600/50 border-slate-600/50'
              } border`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative z-10">{option.text}</span>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

const GameCard = ({ game, onPlay }) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="relative group"
    >
      <div className={`absolute inset-0 bg-gradient-to-r ${game.color} rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity`} />
      <div className="relative bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
        <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5 mb-4">
          <div className="w-full h-full rounded-lg bg-slate-900 flex items-center justify-center">
            <game.icon className="w-6 h-6 text-cyan-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{game.name}</h3>
        <p className="text-slate-300 mb-4">{game.description}</p>
        <Button
          onClick={() => onPlay(game)}
          className={`w-full bg-gradient-to-r ${game.color} text-white relative group overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative z-10">Play Now</span>
        </Button>
      </div>
    </motion.div>
  );
};

const ProgressBar = ({ progress }) => (
  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
    <motion.div
      className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.5 }}
    />
  </div>
);

const RewardBadge = ({ badge }) => (
  <motion.div
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="relative group"
  >
    <div className={`absolute inset-0 bg-gradient-to-r ${badge.color} rounded-full blur opacity-50 group-hover:opacity-100 transition-opacity`} />
    <div className="relative w-16 h-16 rounded-full bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-center">
      <badge.icon className="w-8 h-8 text-cyan-400" />
    </div>
    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-slate-800 px-2 py-1 rounded text-xs text-white whitespace-nowrap">
      {badge.name}
    </div>
  </motion.div>
);

const LeaderboardEntry = ({ rank, name, score, isUser }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className={`flex items-center gap-4 p-4 rounded-lg ${
      isUser ? 'bg-cyan-500/20 border-cyan-500/50' : 'bg-slate-800/50 border-slate-700/50'
    } border`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
      rank <= 3 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' : 'bg-slate-700'
    }`}>
      {rank}
    </div>
    <div className="flex-1">
      <div className="font-medium text-white">{name}</div>
      <div className="text-sm text-slate-400">{score} points</div>
    </div>
    {rank <= 3 && <Trophy className="w-5 h-5 text-yellow-500" />}
  </motion.div>
);

export const InteractiveLearning = () => {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [userProgress, setUserProgress] = useState({});
  const [userBadges, setUserBadges] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [streamlitUrl, setStreamlitUrl] = useState(null);

  useEffect(() => {
    // Simulate loading user progress
    setUserProgress({
      'ai': 45,
      'programming': 70,
      'cooking': 30,
      'science': 60,
      'art': 25,
      'music': 40
    });

    // Simulate loading user badges
    setUserBadges([
      { name: 'AI Explorer', icon: Brain, color: 'from-cyan-500 to-blue-500' },
      { name: 'Code Master', icon: Code, color: 'from-purple-500 to-pink-500' },
      { name: 'Science Whiz', icon: Microscope, color: 'from-emerald-500 to-teal-500' }
    ]);

    // Simulate loading leaderboard
    setLeaderboard([
      { rank: 1, name: 'Alex Chen', score: 2500 },
      { rank: 2, name: 'Maria Garcia', score: 2350 },
      { rank: 3, name: 'John Smith', score: 2200 },
      { rank: 4, name: 'You', score: 2100, isUser: true },
      { rank: 5, name: 'Sarah Johnson', score: 2000 }
    ]);
  }, []);

  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    // Simulate loading a quiz for the selected subject
    setCurrentQuiz({
      question: `Sample question about ${subject.name}?`,
      options: [
        { text: 'Option 1', isCorrect: true },
        { text: 'Option 2', isCorrect: false },
        { text: 'Option 3', isCorrect: false },
        { text: 'Option 4', isCorrect: false }
      ]
    });
  };

  const handleSubjectClick = (subject) => {
    setSelectedSubject(subject);
    // Set the Streamlit quiz app URL for the selected subject
    setStreamlitUrl('http://localhost:8501');
  };

  const handlePlayGames = () => {
    // Set the Streamlit games app URL
    setStreamlitUrl('http://localhost:8502');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {!streamlitUrl ? (
        <>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-gray-600">
              Select a subject to start learning or try our interactive games
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {subjects.map((subject, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`${subject.color} rounded-lg p-6 cursor-pointer shadow-lg`}
                onClick={() => handleSubjectClick(subject)}
              >
                <div className="text-4xl mb-4">{subject.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-white">{subject.name}</h3>
                <p className="text-white/80">{subject.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg"
              onClick={handlePlayGames}
            >
              🎮 Play Interactive Games
            </motion.button>
          </div>
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              {selectedSubject ? selectedSubject.name : 'Interactive Games'}
            </h2>
            <button
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setStreamlitUrl(null)}
            >
              ← Back to Selection
            </button>
          </div>
          <iframe
            src={streamlitUrl}
            width="100%"
            height="800px"
            frameBorder="0"
            title="Streamlit App"
          />
        </div>
      )}
    </div>
  );
}; 