"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { 
  BarChart, Calendar, Clock, BookOpen, Target, Award, 
  ArrowUpRight, Activity, TrendingUp, ChevronRight,
  CheckCircle2, Circle, Users, MessageCircle, Share2
} from "lucide-react"

const StatCard = ({ icon: Icon, title, value, change, changeType = "positive" }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="relative bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-400">{title}</p>
          <h3 className="text-2xl font-bold text-white mt-1">{value}</h3>
        </div>
        <motion.div 
          className="h-10 w-10 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="h-5 w-5 text-cyan-400" />
        </motion.div>
      </div>
      {change && (
        <div className={`flex items-center mt-2 text-sm ${
          changeType === "positive" ? "text-emerald-400" : "text-red-400"
        }`}>
          <ArrowUpRight className="h-4 w-4 mr-1" />
          <span>{change} from last week</span>
        </div>
      )}
    </div>
  </motion.div>
)

const ProgressCard = ({ title, progress, total, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    whileHover={{ y: -5, transition: { duration: 0.2 } }}
    className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl overflow-hidden group"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    <div className="relative z-10">
      <div className="flex items-center gap-4">
        <motion.div 
          className="h-12 w-12 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center"
          whileHover={{ scale: 1.1, rotate: 5 }}
        >
          <Icon className="h-6 w-6 text-cyan-400" />
        </motion.div>
        <div>
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <div className="mt-2 relative h-2 w-48 bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(progress / total) * 100}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute h-full bg-gradient-to-r from-cyan-500 to-blue-500"
            />
          </div>
          <p className="text-sm text-slate-400 mt-1">
            {progress} of {total} completed
          </p>
        </div>
      </div>
    </div>
  </motion.div>
)

const ActivityGraph = () => {
  const data = [40, 60, 45, 70, 55, 80, 65]
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  return (
    <div className="relative h-64">
      <div className="absolute bottom-0 left-0 right-0 h-[200px] flex items-end justify-between gap-2">
        {data.map((value, index) => (
          <div key={index} className="relative flex-1">
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${value}%` }}
              transition={{ duration: 1, delay: index * 0.1 }}
              className="w-full bg-gradient-to-t from-cyan-500 to-blue-500 rounded-t-lg opacity-70 hover:opacity-100 transition-opacity"
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-slate-400">
              {days[index]}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

const LearningPath = () => {
  const steps = [
    { title: "Introduction to AI", completed: true },
    { title: "Machine Learning Basics", completed: true },
    { title: "Neural Networks", completed: false },
    { title: "Deep Learning", completed: false },
  ]

  return (
    <div className="space-y-4">
      {steps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center gap-4 group"
        >
          <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
            step.completed 
              ? "bg-cyan-500/20 text-cyan-400" 
              : "bg-slate-800 text-slate-400"
          }`}>
            {step.completed ? <CheckCircle2 className="h-5 w-5" /> : <Circle className="h-5 w-5" />}
          </div>
          <div className="flex-1">
            <h4 className={`font-medium ${
              step.completed ? "text-white" : "text-slate-400"
            }`}>{step.title}</h4>
            {step.completed && (
              <p className="text-xs text-cyan-400">Completed</p>
            )}
          </div>
          <Button 
            variant="ghost" 
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-opacity text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </motion.div>
      ))}
    </div>
  )
}

const UpcomingSession = ({ title, time, icon: Icon }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="flex items-center gap-4 p-4 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group"
  >
    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center">
      <Icon className="h-5 w-5 text-cyan-400" />
    </div>
    <div className="flex-1">
      <p className="text-white font-medium group-hover:text-cyan-300 transition-colors">{title}</p>
      <p className="text-sm text-slate-400">{time}</p>
    </div>
    <Button 
      variant="ghost" 
      size="sm" 
      className="opacity-0 group-hover:opacity-100 transition-opacity"
    >
      Join
    </Button>
  </motion.div>
)

const CommunityActivityCard = () => {
  const recentActivities = [
    {
      type: 'post',
      user: 'Sarah Chen',
      action: 'shared a post about quantum mechanics',
      time: '2 hours ago'
    },
    {
      type: 'group',
      user: 'Alex Thompson',
      action: 'joined Python Programmers group',
      time: '3 hours ago'
    },
    {
      type: 'comment',
      user: 'Maria Garcia',
      action: 'commented on a machine learning discussion',
      time: '5 hours ago'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
    >
      <h3 className="text-lg font-semibold text-white mb-4">Community Activity</h3>
      <div className="space-y-4">
        {recentActivities.map((activity, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-3 group"
          >
            <motion.div
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 flex items-center justify-center flex-shrink-0"
            >
              {activity.type === 'post' && <Share2 className="w-4 h-4 text-cyan-400" />}
              {activity.type === 'group' && <Users className="w-4 h-4 text-cyan-400" />}
              {activity.type === 'comment' && <MessageCircle className="w-4 h-4 text-cyan-400" />}
            </motion.div>
            <div className="flex-1">
              <p className="text-white group-hover:text-cyan-400 transition-colors">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-sm text-slate-400">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </div>
      <motion.div
        whileHover={{ x: 5 }}
        className="mt-4"
      >
        <Link 
          href="/community"
          className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300"
        >
          View All Activity
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [selectedMetric, setSelectedMetric] = useState("week")

  useEffect(() => {
    const userToken = Cookies.get('userToken')
    const currentUser = Cookies.get('currentUser')

    if (!userToken || !currentUser) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(currentUser))
  }, [router])

  if (!user) return null

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
        <motion.div 
          className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1,
          }}
        />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/5 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="relative">
        {/* Add Navigation Bar */}
        <div className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800/50">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-10 w-10 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600" />
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
              </motion.div>
              <span className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                ELARA
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button 
                  variant="ghost" 
                  className="relative group px-6 py-2 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative flex items-center gap-2">
                    <motion.span 
                      className="text-white group-hover:text-cyan-300 transition-colors"
                      whileHover={{ x: -3 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Back to Site
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
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-white mb-2"
            >
              Welcome back, {user.name}! 👋
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-slate-400"
            >
              Here's an overview of your learning progress
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard 
              icon={Clock} 
              title="Study Time" 
              value="12.5 hrs" 
              change="+2.5 hrs"
            />
            <StatCard 
              icon={BookOpen} 
              title="Lessons Completed" 
              value="24" 
              change="+8"
            />
            <StatCard 
              icon={Users} 
              title="Active Groups" 
              value="5" 
              change="+2"
            />
            <StatCard 
              icon={MessageCircle} 
              title="Community Posts" 
              value="28" 
              change="+15"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ProgressCard
              title="Current Course Progress"
              progress={8}
              total={12}
              icon={BookOpen}
            />
            <ProgressCard
              title="Group Projects"
              progress={3}
              total={5}
              icon={Users}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Learning Activity</h3>
                <div className="flex gap-2">
                  {["week", "month", "year"].map((metric) => (
                    <Button
                      key={metric}
                      variant="ghost"
                      size="sm"
                      className={`text-sm ${
                        selectedMetric === metric 
                          ? "bg-cyan-500/20 text-cyan-300" 
                          : "text-slate-400 hover:text-white"
                      }`}
                      onClick={() => setSelectedMetric(metric)}
                    >
                      {metric.charAt(0).toUpperCase() + metric.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <ActivityGraph />
            </motion.div>

            <CommunityActivityCard />
          </div>

          <div className="mt-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Sessions</h3>
              <div className="space-y-2">
                <UpcomingSession
                  title="Advanced Mathematics"
                  time="Today, 2:00 PM"
                  icon={Activity}
                />
                <UpcomingSession
                  title="Physics Fundamentals"
                  time="Tomorrow, 10:00 AM"
                  icon={TrendingUp}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
} 