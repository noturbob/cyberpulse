"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Activity, 
  ArrowRight, 
  Search, 
  Globe, 
  FileText, 
  CheckCircle,
  TrendingUp,
  ShieldAlert,
  Zap,
  AlertTriangle,
  Eye,
  MapPin
} from "lucide-react";

import { Navbar1 } from "@/components/navbar1";
import { AmbientBackground } from "@/components/AmbientBackground";
import { fadeInUp, slideInDown, scaleIn, staggerContainer } from "@/lib/motion"; 

export default function LandingPage() {
  // Use animation presets from motion.ts
  const containerVars = staggerContainer;
  const itemVars = fadeInUp;

  // Steps for "How it works"
  const steps = [
    { icon: Globe, title: "1. Enter URL", desc: "No sign-up needed. Just drop your website link." },
    { icon: Search, title: "2. Multi-point Scan", desc: "We check for malware, phishing, and broken SSLs." },
    { icon: Activity, title: "3. Score Calculation", desc: "Our algorithm generates your Cyber Safety Score (0-100)." },
    { icon: FileText, title: "4. Visual Report", desc: "Get a color-coded, jargon-free summary of your risks." },
    { icon: CheckCircle, title: "5. Action Steps", desc: "Download a PDF with simple remediation tips to fix issues." },
  ];

  return (
    <main className="relative w-full overflow-x-hidden bg-background text-foreground selection:bg-primary selection:text-primary-foreground">
      
      {/* Navbar */}
      <Navbar1 />

      {/* Ambient Background with floating orbs */}
      <AmbientBackground variant="default" intensity="medium" />

      {/* --- CONTENT WRAPPER --- */}
      <div className="relative z-10 flex flex-col w-full">

        {/* SECTION 1: HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-6 pt-32 pb-24 max-w-6xl mx-auto text-center">
          <motion.div variants={containerVars} initial="hidden" animate="visible" className="flex flex-col items-center w-full max-w-4xl">
            
            {/* Badge */}
            <motion.div variants={fadeInUp} className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-cyber-400/30 glass-card text-cyber-300 text-sm font-medium">
              <Activity className="w-4 h-4" />
              <span>Built for Indian MSMEs • 100% Free</span>
            </motion.div>

            {/* Hero Headline - Split color */}
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-display font-bold tracking-tight mb-6 text-balance leading-tight">
              Enterprise Security.{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 via-cyber-300 to-blue-400">
                Simplified for You.
              </span>
            </motion.h1>

            {/* Subheading */}
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl text-balance font-body leading-relaxed">
              Instantly scan your business website for malware, broken links, and SSL issues. Get your Cyber Safety Score in under 60 seconds. No signup required.
            </motion.p>

            {/* Glass URL Input Card */}
            <motion.div variants={fadeInUp} whileHover={{ y: -4 }} className="w-full relative group max-w-2xl" id="scan">
              {/* Glow backdrop */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyber-500/30 to-blue-600/30 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <form onSubmit={(e) => e.preventDefault()} className="relative glass-card bg-black/60 border border-cyber-400/30 rounded-2xl overflow-hidden p-2 shadow-2xl shadow-cyber-500/20">
                <div className="flex items-center w-full">
                  <div className="pl-4 pr-2 text-cyber-400"><ShieldCheck className="w-6 h-6" /></div>
                  <input 
                    type="url" 
                    placeholder="Enter your website URL (e.g., myshop.in)" 
                    required 
                    className="flex-1 bg-transparent border-none outline-none px-2 py-4 text-base font-mono text-white placeholder:text-white/40 w-full" 
                  />
                  <button 
                    type="submit" 
                    className="flex items-center gap-2 bg-gradient-to-r from-cyber-500 to-blue-600 hover:shadow-glow-cyber text-white px-6 py-4 rounded-lg font-semibold transition-all active:scale-95 mr-1"
                  >
                    Scan Now <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </motion.div>

          </motion.div>
        </section>

        {/* SECTION 2: FEATURES (Scroll Triggered) */}
        <section id="features" className="py-24 px-6 w-full">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white">What We Scan</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">Comprehensive security analysis in seconds</p>
            </motion.div>

            <motion.div 
              variants={containerVars} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
            >
              {[
                { icon: Search, title: "Deep Malware Scan", desc: "Powered by Google Safe Browsing to detect malicious code instantly.", color: "from-critical/20" },
                { icon: Lock, title: "SSL & Phishing Check", desc: "Ensures customer data is locked down and prevents browser warnings.", color: "from-high/20" },
                { icon: ShieldAlert, title: "Content Integrity", desc: "Scans for broken links that destroy your SEO and customer trust.", color: "from-medium/20" },
              ].map((feature, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp} 
                  className={`group relative flex flex-col items-center text-center p-8 rounded-2xl glass-card border border-white/10 shadow-xl hover:border-cyber-400/50 hover:bg-white/[0.08] hover:shadow-glow-cyber transition-all duration-300`}
                >
                  {/* Icon background */}
                  <div className={`p-4 rounded-xl mb-6 bg-gradient-to-br ${feature.color} to-white/5 group-hover:shadow-lg transition-all`}>
                    <feature.icon className="w-8 h-8 text-cyber-400" />
                  </div>
                  <h3 className="font-semibold text-xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 3: HOW IT WORKS (Explainer Flow) */}
        <section id="how-it-works" className="py-32 w-full border-y border-white/5 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
          <div className="max-w-6xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-20"
            >
              <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4 text-white">Cybersecurity Simplified</h2>
              <p className="text-lg text-white/60 max-w-2xl mx-auto">Just paste your URL and let us handle the rest</p>
            </motion.div>

            <motion.div 
              variants={containerVars} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 md:grid-cols-5 gap-6 relative"
            >
              {/* Connector line for desktop */}
              <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-gradient-to-r from-cyber-500/20 via-cyber-500/60 to-cyber-500/20 z-0" />

              {steps.map((step, idx) => (
                <motion.div key={idx} variants={fadeInUp} className="relative z-10 flex flex-col items-center text-center">
                  {/* Step number circle */}
                  <div className="w-20 h-20 rounded-full glass-card border-2 border-cyber-400/50 flex items-center justify-center mb-6 shadow-lg shadow-cyber-500/20 group hover:shadow-glow-cyber transition-all">
                    <div className="flex flex-col items-center">
                      <span className="text-2xl font-display font-bold text-cyber-300">{idx + 1}</span>
                      <span className="text-xs text-cyber-400/80">Step</span>
                    </div>
                  </div>
                  <h4 className="font-semibold text-white mb-2 text-sm">{step.title}</h4>
                  <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* SECTION 4: THE MSME IMPACT */}
        <section className="py-32 px-6 w-full">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="p-3 bg-critical/20 rounded-xl w-max mb-6">
                  <TrendingUp className="w-8 h-8 text-critical" />
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-6 leading-tight text-white">
                  70% of Indian MSMEs are online.{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-critical via-high to-critical">
                    Less than 20% are protected.
                  </span>
                </h2>
                <p className="text-lg text-white/70 mb-8 font-body leading-relaxed">
                  Malware infections lead to customer data theft. Expired SSLs result in browser warnings and lost sales. Broken links destroy your SEO ranking.
                </p>
                <ul className="space-y-4 font-medium">
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="text-cyber-400 w-5 h-5 flex-shrink-0" /> 
                    <span>Free, instant risk score</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="text-cyber-400 w-5 h-5 flex-shrink-0" /> 
                    <span>First MSME-focused scanner in India</span>
                  </li>
                  <li className="flex items-center gap-3 text-white/90">
                    <CheckCircle className="text-cyber-400 w-5 h-5 flex-shrink-0" /> 
                    <span>Available in Hindi & English</span>
                  </li>
                </ul>
              </motion.div>

              {/* Right: Score Ring Mockup */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="relative w-full aspect-square flex items-center justify-center">
                  {/* Glow halo */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyber-500/20 to-safe/20 blur-3xl" />
                  
                  {/* Glass card */}
                  <div className="relative glass-card border border-cyber-400/30 rounded-3xl p-12 w-full h-full flex flex-col items-center justify-center shadow-2xl shadow-cyber-500/20">
                    {/* SVG Score Ring */}
                    <div className="relative w-40 h-40 mb-8">
                      <svg className="w-full h-full" viewBox="0 0 160 160">
                        {/* Background ring */}
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                        
                        {/* Score ring - 72% (Medium/Safe range) */}
                        <circle 
                          cx="80" 
                          cy="80" 
                          r="70" 
                          fill="none" 
                          stroke="url(#scoreGradient)" 
                          strokeWidth="8"
                          strokeDasharray="315.42 440"
                          strokeLinecap="round"
                        />
                        
                        <defs>
                          <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="50%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#10b981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      
                      {/* Center text */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="text-5xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-safe via-cyber-400 to-safe">
                          72
                        </div>
                        <div className="text-xs text-white/60 mt-1">Score</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-safe to-cyber-400 mb-2">
                        Safe & Verified
                      </p>
                      <p className="text-sm text-white/70">Your website is secure</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* SECTION 5: FINAL CTA */}
        <section className="py-32 px-6 w-full relative overflow-hidden">
          {/* Background glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-500/10 to-transparent opacity-50" />
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-cyber-500/10 blur-3xl" />
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative z-10 max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white leading-tight">
              Ready to secure your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-400 to-blue-400">storefront?</span>
            </h2>
            <p className="text-xl text-white/70 mb-12 font-body">
              Don't let a simple cyber risk cost you your reputation and customer trust. Check your website health instantly, free, no signup required.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="relative group px-8 py-4 bg-gradient-to-r from-cyber-500 to-blue-600 hover:shadow-glow-cyber text-white text-lg font-semibold rounded-lg transition-all active:scale-95"
            >
              <span className="relative z-10">Start Your Free Scan</span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyber-600 to-blue-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity -z-10" />
            </motion.button>

            <p className="text-sm text-white/50 mt-6">⏱️ Takes less than 60 seconds • 🔐 No signup • 🇮🇳 Made for India MSMEs</p>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="w-full border-t border-white/5 bg-gradient-to-b from-white/[0.02] to-black/40 backdrop-blur-xl pt-16 pb-8 px-6 relative z-20">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-12">
            
            {/* Brand Section */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-2 glass-card border border-cyber-400/30 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-cyber-400" />
                </div>
                <span className="font-display font-bold text-xl text-white tracking-tight">Cyber Shield</span>
              </div>
              <p className="text-white/60 text-sm max-w-md leading-relaxed font-body">
                Empowering Indian MSMEs with free, enterprise-grade cybersecurity scanning. Protecting digital storefronts from modern threats without the complex jargon. Made with 🇮🇳 for India.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-cyber-400 transition-colors">Run Free Scan</button></li>
                <li><a href="#features" className="hover:text-cyber-400 transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="hover:text-cyber-400 transition-colors">How it Works</a></li>
              </ul>
            </div>

            {/* Legal & Support */}
            <div>
              <h4 className="font-semibold mb-4 text-white">Support</h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li><a href="#" className="hover:text-cyber-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-cyber-400 transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-cyber-400 transition-colors">Feedback</a></li>
              </ul>
            </div>

          </div>

          {/* Copyright Bar */}
          <div className="max-w-6xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-white/50 font-medium">
              © 2026 MSME Cyber Shield. All rights reserved. 🇮🇳
            </p>
            <div className="px-4 py-2 glass-card border border-cyber-400/30 rounded-full text-xs font-semibold text-cyber-300">
              Ideathon 2026 Prototype
            </div>
          </div>
        </footer>

      </div>
    </main>
  );
}