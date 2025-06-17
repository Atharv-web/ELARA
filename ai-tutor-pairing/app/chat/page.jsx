'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import ChatInterface from "@/components/chat-interface";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Chat with <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Your Tutor</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Start a conversation with your AI tutor and begin your learning journey.
          </p>
        </motion.div>
        
        <ChatInterface />
      </main>
      <Footer />
    </div>
  );
} 