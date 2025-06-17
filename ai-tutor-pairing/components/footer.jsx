"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { motion } from "framer-motion"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-cyan-500/5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-20 w-60 h-60 rounded-full bg-blue-500/5 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-40 h-40 rounded-full bg-sky-500/5 blur-2xl"></div>
        
        {/* Metallic Grid Pattern */}
        <div className="absolute inset-0 opacity-5" style={{ 
          backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative h-12 w-12 rounded-lg overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl">
                  E
                </div>
              </motion.div>
              <span className="font-bold text-xl text-white group-hover:text-cyan-300 transition-colors">
                ELARA
              </span>
            </Link>
            <p className="text-slate-300 text-sm">
              Enhanced Learning through Adaptive Reasoning Agent. Personalized AI tutoring for every student.
            </p>
            <div className="flex space-x-4">
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-10 h-10 rounded-full bg-white/5 backdrop-blur-sm flex items-center justify-center border border-white/10 text-slate-300 hover:text-cyan-300 hover:border-cyan-300/30 transition-all"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/features" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Features
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/tutors" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Our Tutors
                </Link>
              </li>
              <li>
                <Link href="/chat" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Start Learning
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/about" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Community
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-cyan-300 transition-colors flex items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 mr-2"></span>
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Stay Updated</h3>
            <p className="text-slate-300 text-sm mb-4">
              Subscribe to our newsletter for the latest updates and insights.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-400 rounded-r-none focus:ring-cyan-500 focus:border-cyan-500"
              />
              <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white rounded-l-none">
                <Mail className="h-4 w-4 mr-2" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">
            © {new Date().getFullYear()} ELARA. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-slate-400 hover:text-cyan-300 text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

