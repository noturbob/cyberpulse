"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Copy, 
  Check, 
  Code, 
  Award, 
  ExternalLink,
  Info
} from "lucide-react";

export default function BadgePage() {
  const [copied, setCopied] = useState(false);

  // Mock score - in a real app, you'd fetch this from their latest scan
  const currentScore = 92; 
  const isEligible = currentScore >= 85;

  const badgeSnippet = `<a href="https://msmecybershield.in/verify/scan_104" target="_blank" rel="noopener">
  <img 
    src="https://msmecybershield.in/badges/secure-badge.svg" 
    alt="Secured by MSME Cyber Shield" 
    width="160" 
    height="50" 
  />
</a>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(badgeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-8"
    >
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          Trust Badge <Award className="text-primary w-8 h-8" />
        </h1>
        <p className="text-muted-foreground mt-1 max-w-2xl">
          Show your customers that their data is safe. Embed this dynamic seal on your website's footer or checkout page to increase conversion rates.
        </p>
      </div>

      {isEligible ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column: Instructions & Stats */}
          <div className="flex flex-col gap-6">
            <div className="p-6 rounded-3xl border border-primary/20 bg-primary/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/20 rounded-full text-primary">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold">Status: Badge Unlocked</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Congratulations! Your latest Cyber Safety Score is <strong className="text-foreground">{currentScore}</strong>. 
                Because your score is above 85, you are eligible to display the verified Trust Badge.
              </p>
            </div>

            <div className="p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md">
              <h4 className="font-semibold mb-4 flex items-center gap-2">
                <Info className="w-4 h-4 text-primary" /> How to install
              </h4>
              <ol className="space-y-4 text-sm text-muted-foreground list-decimal list-inside">
                <li>Click the "Copy Snippet" button on the right.</li>
                <li>Open your website's code (or CMS like Shopify/WordPress).</li>
                <li>Paste the code into your global footer or right below your checkout button.</li>
                <li>The badge updates automatically. If your score drops below 85, the badge will temporarily hide until you fix the issues.</li>
              </ol>
            </div>
          </div>

          {/* Right Column: Preview & Code */}
          <div className="flex flex-col gap-6">
            
            {/* Visual Preview */}
            <div className="p-8 flex flex-col items-center justify-center rounded-3xl border border-border/50 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-card/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent z-0" />
              
              <span className="relative z-10 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-6">
                Live Preview
              </span>

              {/* The Mock Badge Design */}
              <div className="relative z-10 flex items-center gap-3 bg-background border border-border shadow-xl rounded-xl p-3 pr-5 hover:scale-105 transition-transform cursor-pointer">
                <div className="p-2 bg-emerald-500/10 rounded-lg">
                  <ShieldCheck className="w-6 h-6 text-emerald-500" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider leading-none mb-1">
                    Secured By
                  </span>
                  <span className="text-sm font-black tracking-tight leading-none">
                    MSME Cyber Shield
                  </span>
                </div>
              </div>
            </div>

            {/* Code Snippet Box */}
            <div className="flex flex-col rounded-3xl border border-border/50 bg-[#0d1117] overflow-hidden shadow-lg">
              <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-white/5">
                <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
                  <Code className="w-4 h-4" /> HTML Snippet
                </div>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary-foreground hover:bg-primary px-3 py-1.5 rounded-md transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <div className="p-4 overflow-x-auto">
                <pre className="text-sm font-mono text-emerald-400/90 leading-relaxed">
                  <code>{badgeSnippet}</code>
                </pre>
              </div>
            </div>

          </div>

        </div>
      ) : (
        /* Locked State (If score < 85) */
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-border/50 bg-card/20">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4 opacity-50">
            <Award className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">Badge Locked</h3>
          <p className="text-muted-foreground max-w-md mb-6">
            Your current Cyber Safety Score is {currentScore}. You need a score of 85 or higher to unlock the Trust Badge.
          </p>
          <button className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium flex items-center gap-2 transition-transform hover:scale-105">
            Go to Action Center <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      )}
    </motion.div>
  );
}