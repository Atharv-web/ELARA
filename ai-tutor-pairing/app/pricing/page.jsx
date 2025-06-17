'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Sparkles, Zap, Star, Crown } from 'lucide-react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { supabase } from '@/lib/supabase';
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";

const plans = [
  {
    name: 'Basic',
    price: 9.99,
    description: 'Perfect for getting started with AI tutoring',
    icon: Zap,
    color: 'from-cyan-500 to-blue-500',
    features: [
      'Access to 2 AI Tutors',
      '10 Learning Sessions/month',
      'Basic Learning Analytics',
      'Email Support',
      'Mobile Access'
    ],
    popular: false
  },
  {
    name: 'Pro',
    price: 19.99,
    description: 'Ideal for dedicated learners seeking comprehensive support',
    icon: Star,
    color: 'from-purple-500 to-pink-500',
    features: [
      'Access to All AI Tutors',
      'Unlimited Learning Sessions',
      'Advanced Learning Analytics',
      'Priority Support',
      'Custom Learning Paths',
      'Progress Tracking',
      'Study Materials Library'
    ],
    popular: true
  },
  {
    name: 'Enterprise',
    price: 49.99,
    description: 'Complete solution for organizations and intensive learners',
    icon: Crown,
    color: 'from-amber-500 to-orange-500',
    features: [
      'Everything in Pro',
      'Custom AI Tutor Creation',
      'Team Management',
      'API Access',
      'Dedicated Support',
      'Custom Integrations',
      'White-label Options'
    ],
    popular: false
  }
];

const PricingCard = ({ plan, selected, onSelect }) => {
  const Icon = plan.icon;
  
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      className={`relative h-full min-h-[600px] rounded-2xl border ${
        selected ? 'border-cyan-500 shadow-lg shadow-cyan-500/20' : 'border-slate-700/50'
      } overflow-hidden group`}
    >
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-xl" />
      <motion.div
        className={`absolute inset-0 bg-gradient-to-r ${plan.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        initial={{ rotate: 0, scale: 1 }}
        animate={{ rotate: 360, scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_transparent_0%,_rgba(0,0,0,0.8)_100%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Popular badge with enhanced animation */}
      {plan.popular && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-4 right-4 z-10"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-500 to-blue-500 text-white relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-white/20"
              animate={{
                x: ["100%", "-100%"],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear",
              }}
            />
            <span className="relative z-10 flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Popular
            </span>
          </motion.div>
        </motion.div>
      )}
      
      <div className="relative p-8 h-full flex flex-col">
        {/* Plan icon with animation */}
        <motion.div
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} p-0.5 mb-4`}
        >
          <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
        </motion.div>

        {/* Plan name and price with animations */}
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-2xl font-semibold text-white mb-2"
        >
          {plan.name}
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-baseline gap-1 mb-6"
        >
          <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            ${plan.price}
          </span>
          <span className="text-slate-400">/month</span>
        </motion.div>
        
        <div className="flex-grow">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-slate-300 mb-6"
          >
            {plan.description}
          </motion.p>
          
          {/* Features list with staggered animations */}
          <ul className="space-y-4">
            {plan.features.map((feature, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 text-slate-300 group/feature"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r ${plan.color} flex items-center justify-center`}
                >
                  <Check className="w-3 h-3 text-white" />
                </motion.div>
                <span className="group-hover/feature:text-white transition-colors">
                  {feature}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
        
        {/* Enhanced select button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(plan.name)}
          className={`w-full mt-8 px-6 py-3 rounded-xl text-white font-medium relative overflow-hidden group/button ${
            selected 
              ? 'bg-gradient-to-r from-cyan-500 to-blue-500' 
              : 'bg-slate-800 hover:bg-slate-700'
          }`}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
            animate={{
              x: ["100%", "-100%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <motion.span 
            className="relative z-10 flex items-center justify-center gap-2"
            animate={selected ? {
              scale: [1, 1.05, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {selected ? (
              <>
                Current Plan
                <Check className="w-4 h-4" />
              </>
            ) : (
              <>
                Select Plan
                <motion.div
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  →
                </motion.div>
              </>
            )}
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

const ParticleEffect = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [null, Math.random() * -500],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
};

const PricingPage = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Check for existing plan selection in cookies
    const savedPlan = Cookies.get('selectedPlan');
    if (savedPlan) {
      setSelectedPlan(savedPlan);
    }
    
    // Check for authenticated user
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };
    
    checkUser();
  }, []);
  
  const handlePlanSelect = async (planName) => {
    setSelectedPlan(planName);
    Cookies.set('selectedPlan', planName, { expires: 7 }); // Store selection for 7 days
    
    if (user) {
      try {
        // Update user profile with selected plan
        await supabase
          .from('profiles')
          .upsert({
            id: user.id,
            selected_plan: planName,
            updated_at: new Date().toISOString()
          });
      } catch (error) {
        console.error('Error updating profile:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <NavBar />
      <main className="container mx-auto px-4 pt-24 pb-12">
        <ParticleEffect />
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white mb-4">
            Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">transparent</span> pricing
          </h1>
          <p className="max-w-[700px] mx-auto text-slate-300 text-lg">
            Choose the perfect plan for your learning journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              selected={selectedPlan === plan.name}
              onSelect={() => handlePlanSelect(plan.name)}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PricingPage; 