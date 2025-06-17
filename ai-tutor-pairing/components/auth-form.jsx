"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"

const FormInput = ({ id, type, label, placeholder, disabled = false, name }) => (
  <div className="relative w-full">
    <Input
      type={type}
      id={id}
      name={name || id}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full h-12 bg-white/5 border-white/10 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:ring-cyan-500/20 transition-all"
    />
    <label htmlFor={id} className="absolute -top-6 left-0 text-sm text-slate-300">
      {label}
    </label>
  </div>
)

const Bubble = ({ size, duration, delay, left }) => (
  <motion.div
    className="absolute rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm border border-white/10"
    style={{
      width: size,
      height: size,
      left: `${left}%`,
    }}
    initial={{ y: "110vh", opacity: 0 }}
    animate={{
      y: "-10vh",
      opacity: [0, 1, 1, 0],
      x: [0, left % 2 === 0 ? 50 : -50], // Deterministic side-to-side motion
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
    // Generate bubbles on the client side
    const newBubbles = Array.from({ length: 20 }).map((_, i) => ({
      size: 20 + (i % 3) * 10, // Deterministic sizes: 20, 30, or 40px
      duration: 8 + (i % 5), // Deterministic durations: 8-12s
      delay: i * 0.5, // Evenly spaced delays
      left: (i * 5) % 100, // Evenly distributed across the width
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

const ToggleSwitch = ({ formMode, setFormMode }) => (
  <div className="flex justify-center mb-8">
    <motion.div 
      className="relative flex p-1 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-white/10"
      initial={false}
    >
      <motion.div
        className="absolute inset-1 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 backdrop-blur-sm"
        animate={{ x: formMode === "login" ? 0 : "100%" }}
        transition={{ 
          type: "spring",
          stiffness: 300,
          damping: 30,
          mass: 1
        }}
        style={{ width: "50%" }}
      >
        <motion.div 
          className="absolute inset-0 rounded-lg"
          animate={{ 
            background: [
              "radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, rgba(59, 130, 246, 0.15) 100%)",
              "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, rgba(6, 182, 212, 0.15) 100%)",
            ]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
      {["login", "signup"].map((mode) => (
        <motion.button
          key={mode}
          className={`relative z-10 px-8 py-2 rounded-lg text-sm font-medium transition-colors ${
            formMode === mode ? "text-white" : "text-slate-400"
          }`}
          onClick={() => setFormMode(mode)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {mode === "login" ? "Sign In" : "Sign Up"}
        </motion.button>
      ))}
    </motion.div>
  </div>
)

export default function AuthForm({ mode = "login" }) {
  const [formMode, setFormMode] = useState(mode)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  
  // Check if user is already logged in
  useEffect(() => {
    const userToken = Cookies.get('userToken')
    if (userToken) {
      router.push('/dashboard')
    }
  }, [router])
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
      ...(formMode === "signup" && {
        name: formData.get("name"),
        confirmPassword: formData.get("confirmPassword")
      })
    }

    try {
      // Basic validation
      if (!data.email || !data.password) {
        throw new Error("Please fill in all required fields")
      }

      if (!data.email.includes('@')) {
        throw new Error("Please enter a valid email address")
      }

      if (formMode === "signup") {
        if (!data.name) {
          throw new Error("Please enter your name")
        }
        if (data.name.length < 2) {
          throw new Error("Name must be at least 2 characters long")
        }
        
        // Enhanced password validation
        if (data.password.length < 6) {
          throw new Error("Password must be at least 6 characters long")
        }
        if (!/[A-Z]/.test(data.password)) {
          throw new Error("Password must contain at least one uppercase letter")
        }
        if (!/[a-z]/.test(data.password)) {
          throw new Error("Password must contain at least one lowercase letter")
        }
        if (!/[0-9]/.test(data.password)) {
          throw new Error("Password must contain at least one number")
        }
        if (!/[!@#$%^&*]/.test(data.password)) {
          throw new Error("Password must contain at least one special character (!@#$%^&*)")
        }
        if (data.password !== data.confirmPassword) {
          throw new Error("Passwords do not match")
        }

        // Store user data in cookies for signup
        const userData = {
          name: data.name.trim(),
          email: data.email.toLowerCase(),
          createdAt: new Date().toISOString()
        }
        
        // Check if email already exists
        const existingUsers = JSON.parse(Cookies.get('users') || '[]')
        if (existingUsers.some(user => user.email === data.email.toLowerCase())) {
          throw new Error("This email is already registered. Please use a different email or try logging in")
        }

        // Save new user
        Cookies.set('users', JSON.stringify([...existingUsers, userData]))
        
        // Redirect to login after successful signup
        router.push('/login')
      } else {
        // Login logic
        const users = JSON.parse(Cookies.get('users') || '[]')
        const user = users.find(u => u.email.toLowerCase() === data.email.toLowerCase())
        
        if (!user) {
          throw new Error("Email not registered. Please sign up first")
        }

        // In a real app, you would hash passwords and not store them in plain text
        // This is just for demonstration
        const userToken = btoa(JSON.stringify({
          email: data.email.toLowerCase(),
          timestamp: new Date().getTime()
        }))

        // Set authentication cookie (expires in 7 days)
        Cookies.set('userToken', userToken, { expires: 7 })
        Cookies.set('currentUser', JSON.stringify(user), { expires: 7 })

        // Redirect to dashboard
        router.push('/dashboard')
      }
    } catch (err) {
      setError(err.message || "An error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 to-slate-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl"
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
          className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"
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
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/10 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>

        {/* Continuous Bubble Shower */}
        <BubbleShower />
      </div>

      <motion.div 
        className="w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm rounded-2xl"></div>
          <div className="relative bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
            <div className="text-center mb-8">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <motion.div 
                  className="relative h-12 w-12 rounded-xl overflow-hidden bg-gradient-to-r from-cyan-500 to-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                    E
                  </div>
                </motion.div>
              </Link>
            </div>

            <ToggleSwitch formMode={formMode} setFormMode={setFormMode} />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center"
              >
                {error}
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={formMode}
                  initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(8px)" }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="space-y-6"
                >
                  {formMode === "login" ? (
                    <>
                      <FormInput
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                      />
                      <FormInput
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                      />
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-2">
                          <input type="checkbox" className="form-checkbox bg-white/5 border-white/10 rounded text-cyan-500 focus:ring-cyan-500/20" />
                          <span className="text-sm text-slate-300">Remember me</span>
                        </label>
                        <Link href="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                          Forgot password?
                        </Link>
                      </div>
                    </>
                  ) : (
                    <>
                      <FormInput
                        type="text"
                        id="name"
                        name="name"
                        label="Full Name"
                        placeholder="Enter your full name"
                      />
                      <FormInput
                        type="email"
                        id="email"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                      />
                      <FormInput
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="Create a password"
                      />
                      <FormInput
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                      />
                    </>
                  )}
                </motion.div>
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Please wait...</span>
                  </div>
                ) : (
                  formMode === "login" ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>
          </div>
        </div>
      </motion.div>
    </div>
  )
} 