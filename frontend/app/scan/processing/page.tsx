"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Search, Lock, ShieldAlert, FileText, CheckCircle2 } from "lucide-react";
import { AmbientBackground } from "@/components/AmbientBackground";

// The steps the scanner will cycle through to build anticipation
const scanSteps = [
  { text: "Initializing Cyber Shield engine...", icon: Search },
  { text: "Verifying SSL Certificate status...", icon: Lock },
  { text: "Consulting Google Safe Browsing...", icon: ShieldCheck },
  { text: "Scanning for broken links & exposed data...", icon: ShieldAlert },
  { text: "Compiling final safety score...", icon: FileText },
  { text: "Report ready. Redirecting...", icon: CheckCircle2 },
];

export default function ScanProcessingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  // Hardcoded for the prototype demo
  const targetUrl = "myshop.in";

  useEffect(() => {
    // 1. Progress Bar Logic (Fills from 0 to 100 over 6 seconds)
    const totalDuration = 6000; 
    const updateInterval = 50; 
    const steps = totalDuration / updateInterval;
    let currentStepCount = 0;

    const progressTimer = setInterval(() => {
      currentStepCount++;
      setProgress(Math.min((currentStepCount / steps) * 100, 100));
    }, updateInterval);

    // 2. Text Cycling Logic (Changes text every ~1.2 seconds)
    const stepDuration = totalDuration / (scanSteps.length - 1);
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < scanSteps.length - 1) return prev + 1;
        return prev;
      });
    }, stepDuration);

    // 3. Auto-Redirect to Report Page when done
    const redirectTimer = setTimeout(() => {
      // Pushing to the mock ID we used in the History page
      router.push("/report/scan_104"); 
    }, totalDuration + 500);

    return () => {
      clearInterval(progressTimer);
      clearInterval(stepTimer);
      clearTimeout(redirectTimer);
    };
  }, [router]);

  const CurrentIcon = scanSteps[currentStep].icon;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 overflow-hidden relative">
      
      {/* Ambient Background with floating orbs */}
      <AmbientBackground variant="cyber" intensity="intense" />

      <div className="relative z-10 flex flex-col items-center max-w-md w-full">
        
        {/* URL Target Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12 inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-card border border-cyber-400/30 text-sm font-medium"
        >
          <Search className="w-4 h-4 text-cyber-400" />
          <span className="text-white/70">Target:</span>
          <span className="text-cyber-300 font-semibold">{targetUrl}</span>
        </motion.div>

        {/* The Pulsing Radar/Shield Animation */}
        <div className="relative flex items-center justify-center w-48 h-48 mb-12">
          {/* Concentric Pulse Rings */}
          <motion.div
            animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 rounded-full border-2 border-cyber-500/40"
          />
          <motion.div
            animate={{ scale: [1, 2], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            className="absolute inset-0 rounded-full border border-cyber-500/30"
          />
          <motion.div
            animate={{ scale: [1, 1.5], opacity: [0.4, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
            className="absolute inset-0 rounded-full bg-cyber-500/10"
          />
          
          {/* Central Core */}
          <div className="relative z-10 w-24 h-24 glass-card border border-cyber-400/50 rounded-2xl flex items-center justify-center shadow-2xl shadow-cyber-500/30 backdrop-blur-xl">
            <CurrentIcon className="w-10 h-10 text-cyber-400" />
          </div>
        </div>

        {/* Dynamic Text Cycler */}
        <div className="h-12 flex items-center justify-center mb-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-lg font-body font-medium text-center text-white/80"
            >
              {scanSteps[currentStep].text}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full glass-card rounded-full h-2.5 overflow-hidden border border-cyber-400/30">
          <motion.div
            className="h-full bg-gradient-to-r from-cyber-500 via-safe to-cyber-500 rounded-full shadow-glow-cyber"
            style={{ width: `${progress}%` }}
            initial={{ width: "0%" }}
          />
        </div>
        
        {/* Percentage Text */}
        <div className="mt-4 flex justify-between w-full text-xs font-semibold text-white/60 font-display">
          <span>{Math.round(progress)}%</span>
          <span>EST: &lt; 1 min</span>
        </div>

      </div>
    </div>
  );
}