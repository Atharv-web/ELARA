"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { User, Mail, Lock, Bell, Book, Settings, LogOut, Crown, CreditCard, Calendar, ChevronRight, Shield, Check } from "lucide-react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import Image from "next/image"

const SettingsCard = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-6 rounded-2xl"
  >
    <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
    {children}
  </motion.div>
)

const MenuItem = ({ icon: Icon, label, active = false, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
      active 
        ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white" 
        : "text-slate-400 hover:text-white hover:bg-white/5"
    }`}
  >
    <Icon className="h-5 w-5" />
    <span>{label}</span>
  </button>
)

const subscriptionPlans = {
  'Basic': {
    price: '$9.99',
    features: [
      'Access to 5 AI Tutors',
      'Basic Learning Analytics',
      'Email Support',
      '10 Sessions per Month'
    ],
    color: 'from-cyan-500 to-blue-500'
  },
  'Pro': {
    price: '$19.99',
    features: [
      'Access to 15 AI Tutors',
      'Advanced Learning Analytics',
      'Priority Email Support',
      'Unlimited Sessions',
      'Custom Learning Paths'
    ],
    color: 'from-purple-500 to-pink-500',
    popular: true
  },
  'Enterprise': {
    price: '$49.99',
    features: [
      'Access to All AI Tutors',
      'Premium Analytics Dashboard',
      '24/7 Priority Support',
      'Unlimited Everything',
      'Custom AI Model Training',
      'Team Management'
    ],
    color: 'from-amber-500 to-orange-500'
  }
};

const menuItems = [
  { icon: User, label: 'Profile', href: '#profile' },
  { icon: Crown, label: 'Subscription', href: '#subscription' },
  { icon: CreditCard, label: 'Billing', href: '#billing' },
  { icon: Bell, label: 'Notifications', href: '#notifications' },
  { icon: Shield, label: 'Security', href: '#security' },
];

export default function AccountPage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [activeSection, setActiveSection] = useState("profile")
  const [currentPlan, setCurrentPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    timezone: '',
    language: 'English',
    learningGoals: '',
    notificationPreferences: {
      email: true,
      push: true,
      sessionReminders: true,
      progressUpdates: true,
      newFeatures: true
    },
    securitySettings: {
      twoFactorEnabled: false,
      lastPasswordChange: null,
      loginHistory: [
        { timestamp: new Date().toISOString(), location: 'Windows PC', device: 'Chrome Browser', status: 'Current Session' },
        { timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), location: 'Mobile Device', device: 'Safari Browser', status: 'Success' },
        { timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(), location: 'Windows PC', device: 'Firefox Browser', status: 'Success' }
      ]
    }
  })
  const [learningStats, setLearningStats] = useState({
    totalSessions: 0,
    totalHours: 0,
    averageScore: 0,
    completedTopics: 0,
    streak: 0
  })

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*, auth.users!inner(*)')
            .eq('id', user.id)
            .single()
          
          // Get the last login time from auth metadata
          const lastLoginAt = user.last_sign_in_at || user.created_at
          
          setUser({ 
            ...user, 
            ...profile,
            lastLoginAt,
            created_at: profile?.created_at || user.created_at 
          })
          setCurrentPlan(profile?.selected_plan || 'Basic')
          
          if (profile) {
            // Update profile data with login history
            const loginHistory = [
              {
                timestamp: lastLoginAt,
                location: 'Current Device',
                device: navigator.userAgent,
                status: 'Current Session'
              },
              ...(profile.login_history || []).slice(0, 4)
            ]

            setProfileData({
              ...profileData,
              fullName: profile.full_name || '',
              bio: profile.bio || '',
              timezone: profile.timezone || '',
              language: profile.language || 'English',
              learningGoals: profile.learning_goals || '',
              notificationPreferences: profile.notification_preferences || profileData.notificationPreferences,
              securitySettings: {
                ...profileData.securitySettings,
                loginHistory,
                lastPasswordChange: profile.last_password_change,
                twoFactorEnabled: profile.two_factor_enabled || false
              }
            })
            setLearningStats(profile.learning_stats || learningStats)
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [])

  const handleProfileUpdate = async (updatedData) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: updatedData.fullName,
          bio: updatedData.bio,
          timezone: updatedData.timezone,
          language: updatedData.language,
          learning_goals: updatedData.learningGoals,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)

      if (error) throw error
      setProfileData(updatedData)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const formatLoginTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60))
    
    if (diffHours < 24) {
      return `${diffHours} hours ago`
    } else if (diffHours < 48) {
      return 'Yesterday'
    } else {
      return date.toLocaleDateString()
    }
  }

  const renderProfileSection = () => (
    <div className="space-y-6">
      <SettingsCard title="Personal Information">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-24 h-24">
              <div className="w-full h-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5">
                <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                  <span className="text-3xl font-bold text-white">
                    {profileData.fullName?.[0] || user?.email?.[0].toUpperCase()}
                  </span>
                </div>
      </div>
              <button className="absolute bottom-0 right-0 p-1.5 rounded-full bg-cyan-500 text-white hover:bg-cyan-600 transition-colors">
                <Settings className="w-4 h-4" />
              </button>
          </div>
            <div className="flex-1">
              <Input
                placeholder="Full Name"
                value={profileData.fullName}
                onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                className="mb-2"
              />
              <textarea
                placeholder="Bio"
                value={profileData.bio}
                onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                className="w-full bg-slate-800/50 border-slate-700/50 rounded-lg p-2 text-slate-300 placeholder-slate-500"
                rows="3"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Timezone</label>
              <Input
                value={profileData.timezone}
                onChange={(e) => setProfileData({ ...profileData, timezone: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Language</label>
              <select
                value={profileData.language}
                onChange={(e) => setProfileData({ ...profileData, language: e.target.value })}
                className="w-full bg-slate-800/50 border border-slate-700/50 rounded-lg p-2 text-slate-300"
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
                <option value="German">German</option>
              </select>
            </div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Learning Statistics">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-slate-400 text-sm">Total Sessions</div>
            <div className="text-2xl font-bold text-white">{learningStats.totalSessions}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-slate-400 text-sm">Hours Learned</div>
            <div className="text-2xl font-bold text-white">{learningStats.totalHours}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-slate-400 text-sm">Average Score</div>
            <div className="text-2xl font-bold text-white">{learningStats.averageScore}%</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-slate-400 text-sm">Topics Completed</div>
            <div className="text-2xl font-bold text-white">{learningStats.completedTopics}</div>
          </div>
          <div className="bg-slate-800/50 rounded-xl p-4">
            <div className="text-slate-400 text-sm">Learning Streak</div>
            <div className="text-2xl font-bold text-white">{learningStats.streak} days</div>
          </div>
        </div>
      </SettingsCard>

      <SettingsCard title="Learning Goals">
        <textarea
          placeholder="What are your learning goals?"
          value={profileData.learningGoals}
          onChange={(e) => setProfileData({ ...profileData, learningGoals: e.target.value })}
          className="w-full bg-slate-800/50 border-slate-700/50 rounded-lg p-2 text-slate-300 placeholder-slate-500"
          rows="4"
        />
        <Button
          onClick={() => handleProfileUpdate(profileData)}
          className="mt-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
        >
          Save Changes
        </Button>
      </SettingsCard>
    </div>
  )

  const renderNotificationsSection = () => (
    <SettingsCard title="Notification Preferences">
      <div className="space-y-4">
        {Object.entries(profileData.notificationPreferences).map(([key, value]) => (
          <div key={key} className="flex items-center justify-between">
            <label className="flex items-center gap-2 text-slate-300">
              <span className="capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
            </label>
            <div className="relative">
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => setProfileData({
                  ...profileData,
                  notificationPreferences: {
                    ...profileData.notificationPreferences,
                    [key]: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </div>
          </div>
        ))}
      </div>
    </SettingsCard>
  )

  const renderSecuritySection = () => (
    <div className="space-y-6">
      <SettingsCard title="Security Settings">
                  <div className="space-y-4">
          <div className="flex items-center justify-between">
                    <div>
              <h4 className="text-slate-300 font-medium">Two-Factor Authentication</h4>
              <p className="text-sm text-slate-400">Add an extra layer of security to your account</p>
            </div>
            <div className="relative">
              <input
                type="checkbox"
                checked={profileData.securitySettings.twoFactorEnabled}
                onChange={(e) => setProfileData({
                  ...profileData,
                  securitySettings: {
                    ...profileData.securitySettings,
                    twoFactorEnabled: e.target.checked
                  }
                })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cyan-500/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
            </div>
                    </div>
                    <div>
            <h4 className="text-slate-300 font-medium mb-2">Password</h4>
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm text-slate-400">
                Last changed: {profileData.securitySettings.lastPasswordChange 
                  ? new Date(profileData.securitySettings.lastPasswordChange).toLocaleDateString()
                  : 'Never'}
              </div>
              <Button
                onClick={() => {/* Handle password change */}}
                className="bg-slate-800 text-slate-300 hover:bg-slate-700"
              >
                Change Password
              </Button>
            </div>
                    </div>
                    <div>
            <h4 className="text-slate-300 font-medium mb-2">Login History</h4>
            <div className="space-y-2">
              {profileData.securitySettings.loginHistory.map((login, index) => (
                <div key={index} className="bg-slate-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-slate-300 font-medium">
                      {login.status === 'Current Session' 
                        ? <span className="text-cyan-400">Current Session</span>
                        : login.status}
                    </span>
                    <span className="text-sm text-slate-400">{formatLoginTime(login.timestamp)}</span>
                    </div>
                  <div className="text-sm text-slate-400 flex items-center gap-4">
                    <span>{login.location}</span>
                    <span>•</span>
                    <span>{login.device}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
                  </div>
                </SettingsCard>
    </div>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <div className="space-y-4 text-center">
          <motion.div
            className="w-12 h-12 rounded-full border-4 border-cyan-500 border-t-transparent"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          <p className="text-slate-300">Loading your account...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-slate-950" />
        <motion.div 
          className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full filter blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div 
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full filter blur-[100px]"
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
                    </div>

      <div className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 p-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">
                        {profileData.fullName?.[0] || user?.email?.[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <div>
                    <h2 className="text-white font-semibold">
                      {profileData.fullName || user?.email}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      Member since {new Date(user?.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-cyan-400 mt-1">
                      Last login: {formatLoginTime(user?.lastLoginAt)}
                    </p>
                  </div>
                </div>

                <nav className="space-y-2">
                  {menuItems.map((item) => (
                    <motion.button
                      key={item.label}
                      whileHover={{ x: 5 }}
                      onClick={() => setActiveSection(item.label.toLowerCase())}
                      className={`flex items-center gap-3 w-full p-3 rounded-lg transition-colors ${
                        activeSection === item.label.toLowerCase()
                          ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white"
                          : "text-slate-400 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                {activeSection === "profile" && renderProfileSection()}
                {activeSection === "subscription" && (
                  <div className="space-y-6">
                    <SettingsCard title="Current Plan">
                      <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                        <div>
                          <div className="text-xl font-semibold text-white">{currentPlan}</div>
                          <div className="text-slate-400">{subscriptionPlans[currentPlan]?.price}/month</div>
                        </div>
                    <Button 
                          onClick={() => router.push('/pricing')}
                          className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white"
                    >
                          Upgrade Plan
                    </Button>
                  </div>
                      <div className="mt-4">
                        <h4 className="text-slate-300 font-medium mb-2">Plan Features</h4>
                        <ul className="space-y-2">
                          {subscriptionPlans[currentPlan]?.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-slate-400">
                              <Check className="w-4 h-4 text-cyan-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </SettingsCard>
                  </div>
                )}
                {activeSection === "notifications" && renderNotificationsSection()}
                {activeSection === "security" && renderSecuritySection()}
                {activeSection === "billing" && (
                  <div className="space-y-6">
                    <SettingsCard title="Payment Method">
                      <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg">
                        <CreditCard className="w-8 h-8 text-slate-400" />
                        <div>
                          <div className="text-slate-300">•••• •••• •••• 4242</div>
                          <div className="text-sm text-slate-400">Expires 12/24</div>
                        </div>
                        <Button className="ml-auto bg-slate-700 text-slate-300 hover:bg-slate-600">
                          Update
                        </Button>
                      </div>
                    </SettingsCard>

                    <SettingsCard title="Billing History">
                      <div className="space-y-2">
                        {[
                          { date: '2024-03-01', amount: '$19.99', status: 'Paid' },
                          { date: '2024-02-01', amount: '$19.99', status: 'Paid' },
                          { date: '2024-01-01', amount: '$19.99', status: 'Paid' },
                        ].map((invoice, index) => (
                          <div key={index} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                            <div>
                              <div className="text-slate-300">{new Date(invoice.date).toLocaleDateString()}</div>
                              <div className="text-sm text-slate-400">{invoice.amount}</div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-green-400">{invoice.status}</span>
                              <Button className="bg-slate-700 text-slate-300 hover:bg-slate-600">
                                Download
                              </Button>
                            </div>
                          </div>
                        ))}
                  </div>
                </SettingsCard>
                  </div>
              )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 