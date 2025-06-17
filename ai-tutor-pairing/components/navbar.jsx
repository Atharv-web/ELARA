"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ChevronDown, User, Settings, LogOut } from "lucide-react"
import Cookies from "js-cookie"
import { useRouter } from "next/navigation"

const tutors = [
  {
    name: "Urahara Sensei",
    style: "Interactive & Playful",
    description: "Breaking down complex topics with creativity",
    avatar: "/images/tutors/1.jpg",
  },
  {
    name: "Kuchiki Sensei",
    style: "Structured & Precise",
    description: "Disciplined and methodical learning approach",
    avatar: "/images/tutors/2.jpg",
  },
  {
    name: "Yamamoto Sensei",
    style: "Wisdom-based & Thorough",
    description: "Deep understanding through experience",
    avatar: "/images/tutors/3.jpg",
  },
  {
    name: "Nova Starweaver",
    style: "Creative & Narrative",
    description: "Learning through storytelling and connections",
    avatar: "/images/tutors/4.jpg",
  },
]

const features = [
  {
    title: "Meet Our Tutors",
    description: "Explore our diverse team of AI tutors with unique teaching styles",
    icon: "👨‍🏫",
    href: "/tutors"
  },
  {
    title: "Interactive Learning",
    description: "Access quizzes, games, and interactive challenges",
    icon: "🎮",
    href: "/learn"
  },
  {
    title: "Personalized Learning",
    description: "Adapts to individual learning styles and preferences",
    icon: "🧠",
  },
  {
    title: "Multi-Style Tutor Engine",
    description: "25+ learning modes including Storyteller, Simulation Master, and Feynman Explainer",
    icon: "🧩",
  },
  {
    title: "Adaptive Study Plans",
    description: "Generates smart, modular learning roadmaps",
    icon: "📚",
  },
  {
    title: "Community Learning",
    description: "Connect with peers, share knowledge, and learn together in our vibrant community",
    icon: "👥",
    href: "/community"
  },
]

const NavLink = ({ href, children, onClick }) => (
  <Link 
    href={href || "#"}
    onClick={onClick}
    className="relative py-2 text-white transition-colors hover:text-cyan-300 group"
  >
    {children}
    <motion.div 
      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </Link>
)

const DropdownButton = ({ children, isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="relative py-2 flex items-center space-x-1 text-white transition-colors hover:text-cyan-300 group"
  >
    <span>{children}</span>
    <motion.div
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <ChevronDown className="w-4 h-4" />
    </motion.div>
    <motion.div 
      className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100"
      initial={{ scaleX: 0 }}
      whileHover={{ scaleX: 1 }}
      transition={{ duration: 0.3 }}
    />
  </button>
)

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const currentUser = Cookies.get('currentUser')
    if (currentUser) {
      setUser(JSON.parse(currentUser))
    }
  }, [])

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown)
  }

  const closeDropdowns = () => {
    setActiveDropdown(null)
  }

  const handleLogout = () => {
    Cookies.remove('userToken')
    Cookies.remove('currentUser')
    setUser(null)
    router.push('/login')
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-slate-900/80 backdrop-blur-md shadow-lg border-b border-slate-800/50" 
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <nav className="flex h-20 items-center justify-between">
          {/* Logo */}
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <NavLink href="/">Home</NavLink>
              
              <div className="relative">
                <DropdownButton 
                  isOpen={activeDropdown === 'tutors'} 
                  onClick={() => toggleDropdown('tutors')}
                >
                  Tutors
                </DropdownButton>
                
                <AnimatePresence>
                  {activeDropdown === 'tutors' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -left-[200px] top-full pt-2"
                    >
                      <div className="w-[600px] bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          {tutors.map((tutor, index) => (
                            <Link
                              key={index}
                              href="/tutors"
                              className="group grid grid-cols-[80px_1fr] gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                              onClick={closeDropdowns}
                            >
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                                <Image
                                  src={tutor.avatar}
                                  alt={tutor.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                  {tutor.name}
                                </h3>
                                <p className="text-sm text-cyan-300 mb-1">{tutor.style}</p>
                                <p className="text-sm text-slate-400 line-clamp-2">
                                  {tutor.description}
                                </p>
                              </div>
                            </Link>
                          ))}
                          <Link
                            href="/tutors"
                            className="col-span-2 mt-2 text-center py-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20 text-cyan-300 hover:text-white hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-500 transition-all duration-300"
                            onClick={closeDropdowns}
                          >
                            View All Tutors
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <DropdownButton 
                  isOpen={activeDropdown === 'features'} 
                  onClick={() => toggleDropdown('features')}
                >
                  Features
                </DropdownButton>
                
                <AnimatePresence>
                  {activeDropdown === 'features' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute -left-[200px] top-full pt-2"
                    >
                      <div className="w-[600px] bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                          {features.map((feature, index) => (
                            <Link
                              key={index}
                              href={feature.href || `/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                              className="group grid grid-cols-[20px_1fr] gap-3 p-3 rounded-lg hover:bg-slate-800/50 transition-colors"
                              onClick={closeDropdowns}
                            >
                              <span className="text-2xl">{feature.icon}</span>
                              <div>
                                <div className="font-medium text-white group-hover:text-cyan-300 transition-colors">
                                  {feature.title}
                                </div>
                                <div className="text-sm text-slate-300">
                                  {feature.description}
                                </div>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <NavLink href="/pricing">Pricing</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="relative">
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-white hover:text-cyan-300 hover:bg-slate-800/50"
                    onClick={() => toggleDropdown('profile')}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium">
                      {user.name[0].toUpperCase()}
                    </div>
                    <span>{user.name}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>

                  <AnimatePresence>
                    {activeDropdown === 'profile' && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-48 py-2 bg-slate-900/95 backdrop-blur-md border border-slate-800/50 rounded-lg shadow-xl"
                      >
                        <Link
                          href="/dashboard"
                          className="flex items-center px-4 py-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                          onClick={closeDropdowns}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Link>
                        <Link
                          href="/account"
                          className="flex items-center px-4 py-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                          onClick={closeDropdowns}
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Account Settings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-slate-300 hover:text-cyan-300 hover:bg-slate-800/50"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <>
                  <Link href="/login">
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
                          Log In
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
                  <Link href="/signup">
                    <Button 
                      className="relative group px-6 py-2 overflow-hidden bg-transparent"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <div className="relative flex items-center gap-2">
                        <motion.span 
                          className="text-white font-medium"
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Sign Up
                        </motion.span>
                        <motion.div
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        >
                          →
                        </motion.div>
                      </div>
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-slate-900/95 backdrop-blur-md border-t border-slate-800/50"
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              <NavLink href="/" onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </NavLink>
              
              <div className="space-y-2">
                <DropdownButton 
                  isOpen={activeDropdown === 'features'} 
                  onClick={() => toggleDropdown('features')}
                >
                  Features
                </DropdownButton>
                <AnimatePresence>
                  {activeDropdown === 'features' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2"
                    >
                      {features.map((feature, index) => (
                        <Link
                          key={index}
                          href={feature.href || `/features#${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center py-2 text-slate-300 hover:text-cyan-300"
                          onClick={() => {
                            closeDropdowns()
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <span className="mr-2">{feature.icon}</span>
                          {feature.title}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-2">
                <DropdownButton 
                  isOpen={activeDropdown === 'tutors'} 
                  onClick={() => toggleDropdown('tutors')}
                >
                  Tutors
                </DropdownButton>
                <AnimatePresence>
                  {activeDropdown === 'tutors' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="pl-4 space-y-2"
                    >
                      {tutors.map((tutor, index) => (
                        <Link
                          key={index}
                          href="/tutors"
                          className="flex items-center py-2 text-slate-300 hover:text-cyan-300"
                          onClick={() => {
                            closeDropdowns()
                            setIsMobileMenuOpen(false)
                          }}
                        >
                          <div className="relative w-8 w-8 rounded-full overflow-hidden mr-2">
                            <Image
                              src={tutor.avatar}
                              alt={tutor.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <div className="font-medium">{tutor.name}</div>
                            <div className="text-xs text-cyan-300">{tutor.style}</div>
                          </div>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <NavLink href="/pricing" onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </NavLink>
              
              <NavLink href="/about" onClick={() => setIsMobileMenuOpen(false)}>
                About
              </NavLink>
              
              {user ? (
                <>
                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium text-lg">
                        {user.name[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-sm text-slate-400">{user.email}</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Link href="/dashboard" className="block w-full">
                        <Button 
                          variant="outline" 
                          className="w-full border-cyan-500 text-cyan-300 hover:bg-slate-800/50"
                        >
                          <User className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/account" className="block w-full">
                        <Button 
                          variant="outline" 
                          className="w-full border-cyan-500 text-cyan-300 hover:bg-slate-800/50"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Account Settings
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="w-full border-red-500 text-red-400 hover:bg-red-500/10"
                        onClick={handleLogout}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="pt-4 border-t border-slate-800 space-y-2">
                  <Link href="/login" className="block w-full">
                    <Button 
                      variant="outline" 
                      className="relative group w-full overflow-hidden border-cyan-500/50 bg-transparent backdrop-blur-sm"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center gap-2">
                        <motion.span 
                          className="text-cyan-300 group-hover:text-cyan-200 transition-colors"
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Log In
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
                  <Link href="/signup" className="block w-full">
                    <Button 
                      className="relative group w-full overflow-hidden bg-transparent"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 transition-transform duration-300 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/50 to-blue-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                      <div className="relative flex items-center justify-center gap-2">
                        <motion.span 
                          className="text-white font-medium"
                          whileHover={{ x: -3 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Sign Up
                        </motion.span>
                        <motion.div
                          className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                        >
                          →
                        </motion.div>
                      </div>
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

