"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  AlertTriangle, 
  TrendingUp, 
  Activity, 
  ArrowRight,
  ShieldAlert,
  Clock,
  ExternalLink
} from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/motion";

export default function DashboardHome() {
  // Mock Data for the Ideathon prototype
  const safetyScore = 92;
  const previousScore = 74;
  const scoreDiff = safetyScore - previousScore;
  
  // Fake chart data for the visual trend
  const chartData = [41, 45, 55, 62, 74, 80, 85, 92];

  return (
    <motion.div 
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <motion.div variants={fadeInUp}>
        <h1 className="text-3xl font-display font-bold tracking-tight text-white">Dashboard Overview</h1>
        <p className="text-white/70 mt-2 font-body">Welcome back. Here is the current security status for <span className="font-semibold text-cyber-300">myshop.in</span>.</p>
      </motion.div>

      {/* Top KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Main Score Card */}
        <motion.div variants={fadeInUp} className="relative group overflow-hidden rounded-2xl glass-card border border-safe/50 p-6 shadow-lg shadow-safe/20 hover:border-safe hover:shadow-glow-safe transition-all">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-safe/20 rounded-full blur-3xl pointer-events-none group-hover:opacity-80 opacity-50 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-semibold text-safe flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> Cyber Safety Score
            </h3>
            <span className="flex items-center gap-1 text-xs font-bold text-safe bg-safe/20 px-3 py-1 rounded-full border border-safe/30">
              <TrendingUp className="w-3 h-3" /> +{scoreDiff}
            </span>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-5xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-safe to-cyber-400 tracking-tighter">{safetyScore}</span>
            <span className="text-white/60 font-body">/100</span>
          </div>
          <p className="text-sm text-white/70 mt-4 relative z-10 font-body">
            Status: <strong className="text-safe font-semibold">Secure & Verified</strong>
          </p>
        </motion.div>

        {/* Active Threats Card */}
        <motion.div variants={fadeInUp} className="relative group rounded-2xl glass-card border border-white/10 p-6 shadow-lg hover:border-cyber-400/50 hover:shadow-glow-cyber transition-all">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-cyber-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-semibold text-white/90 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-critical" /> Active Threats
            </h3>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-5xl font-display font-black text-safe tracking-tighter">0</span>
          </div>
          <p className="text-sm text-safe font-medium mt-4 flex items-center gap-1 font-body">
            <ShieldCheck className="w-4 h-4" /> No malware detected
          </p>
        </motion.div>

        {/* Pending Actions Card */}
        <motion.div variants={fadeInUp} className="relative group rounded-2xl glass-card border border-white/10 p-6 shadow-lg hover:border-medium/50 hover:shadow-glow-medium transition-all">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-medium/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex items-center justify-between mb-4 relative z-10">
            <h3 className="font-semibold text-white/90 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-medium" /> Pending Actions
            </h3>
          </div>
          <div className="flex items-baseline gap-2 relative z-10">
            <span className="text-5xl font-display font-black text-medium tracking-tighter">2</span>
          </div>
          <p className="text-sm text-medium font-medium mt-4 flex items-center gap-1 font-body">
            <Clock className="w-4 h-4" /> Non-critical warnings
          </p>
        </motion.div>

      </div>

      {/* Main Grid: Charts & Action Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Trend Chart (Takes up 2 columns) */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 rounded-2xl glass-card border border-white/10 p-6 shadow-lg hover:border-cyber-400/40 hover:shadow-glow-cyber transition-all flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-display font-bold text-white">Security Posture Trend</h3>
              <p className="text-sm text-white/60 mt-1 font-body">Your progress over the last 8 scans.</p>
            </div>
            <button className="text-sm font-medium text-cyber-400 hover:text-cyber-300 transition-colors flex items-center gap-1">
              View History <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* CSS-based Bar Chart */}
          <div className="flex-1 flex items-end justify-between gap-2 mt-auto h-48 pt-6 border-b border-white/5 pb-4">
            {chartData.map((val, idx) => (
              <div key={idx} className="relative flex flex-col items-center justify-end w-full group">
                {/* Tooltip on hover */}
                <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-black text-xs font-bold py-1.5 px-2.5 rounded-lg pointer-events-none shadow-lg">
                  {val}
                </div>
                {/* The Bar */}
                <div 
                  className={`w-full max-w-[3rem] rounded-t-md transition-all duration-500 ease-out ${
                    val >= 85 ? 'bg-gradient-to-t from-safe to-safe/60 hover:shadow-glow-safe' : 
                    val >= 60 ? 'bg-gradient-to-t from-medium to-medium/60 hover:shadow-glow-medium' : 
                    'bg-gradient-to-t from-critical to-critical/60 hover:shadow-glow-critical'
                  }`}
                  style={{ height: `${val}%` }}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 text-xs text-white/50 font-medium">
            <span>Jan 2026</span>
            <span>Current</span>
          </div>
        </motion.div>

        {/* Action Center Mini */}
        <motion.div variants={fadeInUp} className="rounded-2xl glass-card border border-white/10 p-6 shadow-lg hover:border-medium/40 hover:shadow-glow-medium transition-all flex flex-col">
          <h3 className="text-lg font-display font-bold text-white mb-1">Needs Attention</h3>
          <p className="text-sm text-white/60 mb-6 font-body">Tasks required to reach 100/100.</p>
          
          <div className="flex flex-col gap-4 flex-1">
            {/* Task 1 */}
            <div className="p-4 rounded-xl glass-card border border-medium/30 hover:border-medium/60 hover:bg-white/[0.08] transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-2.5 h-2.5 rounded-full bg-medium flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-medium transition-colors">Fix 3 Broken Links</h4>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2 font-body">Broken links detected on /about-us page. Hurts SEO and user trust.</p>
                </div>
              </div>
            </div>

            {/* Task 2 */}
            <div className="p-4 rounded-xl glass-card border border-medium/30 hover:border-medium/60 hover:bg-white/[0.08] transition-all cursor-pointer group">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 w-2.5 h-2.5 rounded-full bg-medium flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-sm text-white group-hover:text-medium transition-colors">Update CSP Headers</h4>
                  <p className="text-xs text-white/60 mt-1 line-clamp-2 font-body">Missing CSP headers expose you to XSS attacks.</p>
                </div>
              </div>
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-6 py-3 px-4 rounded-lg bg-gradient-to-r from-medium to-high hover:shadow-glow-medium text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all"
          >
            Open Action Center <ExternalLink className="w-4 h-4" />
          </motion.button>
        </motion.div>

      </div>
    </motion.div>
  );
}