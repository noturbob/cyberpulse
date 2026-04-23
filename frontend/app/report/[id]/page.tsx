"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SignInButton } from "@clerk/nextjs";
import { 
  ShieldCheck, 
  Lock, 
  Search, 
  Link as LinkIcon, 
  AlertTriangle,
  Download,
  ArrowRight,
  ShieldAlert,
  FileText
} from "lucide-react";
import { fadeInUp, scaleIn } from "@/lib/motion";
import { AmbientBackground } from "@/components/AmbientBackground";

export default function RiskReportPage() {
  // Mock Data for the prototype
  const targetUrl = "myshop.in";
  const score = 74; // Warning level
  const date = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

  // SVG Gauge Animation State
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    // Animate the score counting up from 0
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 300);
    return () => clearTimeout(timer);
  }, [score]);

  // SVG Circle Math
  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  // Determine colors based on score
  const getScoreColor = () => {
    if (score >= 85) return { text: "text-safe", stroke: "stroke-safe", bg: "from-safe/20" };
    if (score >= 60) return { text: "text-medium", stroke: "stroke-medium", bg: "from-medium/20" };
    return { text: "text-critical", stroke: "stroke-critical", bg: "from-critical/20" };
  };

  const scoreColor = getScoreColor();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col relative overflow-hidden">
      
      {/* Ambient Background with floating orbs */}
      <AmbientBackground variant="cyber" intensity="medium" />
      
      {/* Report Header */}
      <motion.header initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="border-b border-white/5 glass-card sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 glass-card border border-cyber-400/30 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-cyber-400" />
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-white">Cyber Shield</span>
          </div>
          
          <div className="flex gap-3">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-cyber-300 hover:text-cyber-200 transition-colors px-3 py-1.5 rounded-lg glass-card border border-cyber-400/30 hover:shadow-glow-cyber"
            >
              <Download className="w-4 h-4" /> PDF Report
            </motion.button>
            {/* The Hook: Pushing them to create an account */}
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                className="text-sm font-semibold bg-gradient-to-r from-cyber-500 to-blue-600 hover:shadow-glow-cyber text-white px-4 py-1.5 rounded-lg transition-all shadow-lg"
              >
                Save Dashboard
              </motion.button>
            </SignInButton>
          </div>
        </div>
      </motion.header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-6 py-12 flex flex-col gap-16 relative z-10">
        
        {/* Top Section: The Gauge */}
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24 justify-center">
          
          {/* Animated SVG Gauge */}
          <motion.div variants={scaleIn} initial="hidden" animate="visible" className="relative flex items-center justify-center w-72 h-72">
            {/* Glow halo */}
            <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${scoreColor.bg} to-transparent blur-3xl opacity-60`} />
            
            {/* SVG */}
            <svg className="w-full h-full transform -rotate-90 relative z-10" viewBox="0 0 280 280">
              <circle
                cx="140"
                cy="140"
                r={radius}
                className="stroke-white/10"
                strokeWidth="24"
                fill="none"
              />
              {/* Animated Progress */}
              <circle
                cx="140"
                cy="140"
                r={radius}
                className={`transition-all duration-1500 ease-out ${scoreColor.stroke}`}
                strokeWidth="24"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            
            {/* Inner Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
              <span className={`text-6xl font-display font-black tracking-tighter ${scoreColor.text}`}>
                {animatedScore}
              </span>
              <span className="text-sm font-semibold text-white/70 uppercase tracking-widest mt-2">
                Score
              </span>
            </div>
          </motion.div>

          {/* Report Summary */}
          <motion.div variants={fadeInUp} initial="hidden" animate="visible" className="flex flex-col max-w-md">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass-card border border-cyber-400/30 text-xs font-semibold w-max mb-6 text-cyber-300">
              <Search className="w-3.5 h-3.5" /> Scanned {date}
            </div>
            <h1 className="text-4xl font-display font-bold tracking-tight mb-3 leading-tight text-white">
              Security Report for{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 to-blue-400">{targetUrl}</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 font-body leading-relaxed">
              Your website has a <strong className="text-medium">moderate risk level</strong>. We found 4 issues that could affect customer trust and SEO.
            </p>
            
            {/* The CTA that triggers Clerk */}
            <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyber-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-glow-cyber transition-all shadow-xl"
              >
                Unlock Fixes in Action Center <ArrowRight className="w-4 h-4" />
              </motion.button>
            </SignInButton>
          </motion.div>
        </div>

        {/* Detailed Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Card 1: Malware */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl glass-card border border-safe/40 hover:border-safe/70 hover:shadow-glow-safe transition-all flex gap-4"
          >
            <div className="p-3 glass-card border border-safe/30 rounded-lg text-safe h-max">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-1 text-white">Malware Check</h3>
              <p className="text-sm text-safe font-semibold mb-2">Clean (0 threats found)</p>
              <p className="text-sm text-white/70 font-body">Scanned against Google Safe Browsing. No malicious code detected.</p>
            </div>
          </motion.div>

          {/* Card 2: SSL */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl glass-card border border-critical/40 hover:border-critical/70 hover:shadow-glow-critical transition-all flex gap-4"
          >
            <div className="p-3 glass-card border border-critical/30 rounded-lg text-critical h-max">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-1 text-white">SSL Certificate</h3>
              <p className="text-sm text-critical font-semibold mb-2">Critical: Missing or Expired</p>
              <p className="text-sm text-white/70 font-body">Your site loads over HTTP. Browsers show "Not Secure" warnings to customers.</p>
            </div>
          </motion.div>

          {/* Card 3: Phishing */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl glass-card border border-medium/40 hover:border-medium/70 hover:shadow-glow-medium transition-all flex gap-4"
          >
            <div className="p-3 glass-card border border-medium/30 rounded-lg text-medium h-max">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-1 text-white">Data Privacy</h3>
              <p className="text-sm text-medium font-semibold mb-2">Warning: Plaintext Emails</p>
              <p className="text-sm text-white/70 font-body">Email addresses exposed in source code make you vulnerable to spam and phishing.</p>
            </div>
          </motion.div>

          {/* Card 4: Links */}
          <motion.div 
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="p-6 rounded-xl glass-card border border-medium/40 hover:border-medium/70 hover:shadow-glow-medium transition-all flex gap-4"
          >
            <div className="p-3 glass-card border border-medium/30 rounded-lg text-medium h-max">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg mb-1 text-white">Content Integrity</h3>
              <p className="text-sm text-medium font-semibold mb-2">Warning: 3 Broken Links</p>
              <p className="text-sm text-white/70 font-body">Dead links hurt your SEO ranking and frustrate users.</p>
            </div>
          </motion.div>

        </div>

        {/* Gamification Teaser */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-8 p-8 rounded-xl glass-card border border-white/10 hover:border-cyber-400/40 hover:shadow-glow-cyber transition-all relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyber-500/5 to-transparent z-0" />
          <div className="relative z-10 max-w-xl">
            <h3 className="text-2xl font-display font-bold mb-2 text-white">Reach 85+ to unlock your Trust Badge</h3>
            <p className="text-white/70 font-body">
              Boost your conversion rate by displaying the verified MSME Cyber Shield badge on your storefront. Create an account to get step-by-step instructions to fix your score.
            </p>
          </div>
          <div className="relative z-10 shrink-0">
             <SignInButton mode="modal" fallbackRedirectUrl="/dashboard">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-gradient-to-r from-cyber-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-glow-cyber transition-all shadow-xl"
              >
                Create Free Account
              </motion.button>
            </SignInButton>
          </div>
        </motion.div>

      </main>
    </div>
  );
}