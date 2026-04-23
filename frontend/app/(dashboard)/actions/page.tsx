"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  Circle, 
  AlertTriangle, 
  ShieldAlert, 
  Info,
  ChevronRight,
  Wrench
} from "lucide-react";

// Mock Data based on your Prisma Schema
const initialTasks = [
  {
    id: "act_1",
    title: "Force HTTPS Redirection",
    category: "SSL",
    severity: "CRITICAL",
    remedy: "Your website allows traffic over standard HTTP. Log into your hosting provider (e.g., GoDaddy, Hostinger) and toggle 'Force HTTPS' to encrypt customer data.",
    isFixed: false,
  },
  {
    id: "act_2",
    title: "Update Content Security Policy (CSP)",
    category: "HEADERS",
    severity: "WARNING",
    remedy: "Missing CSP headers expose you to Cross-Site Scripting (XSS). Ask your developer to add a basic CSP header allowing only trusted scripts.",
    isFixed: false,
  },
  {
    id: "act_3",
    title: "Fix 3 Broken Links on /about-us",
    category: "CONTENT",
    severity: "WARNING",
    remedy: "Broken links hurt your SEO and make your site look abandoned. Update the links pointing to your old Facebook page.",
    isFixed: false,
  },
  {
    id: "act_4",
    title: "Remove Exposed Email Addresses",
    category: "PHISHING",
    severity: "INFO",
    remedy: "You have plain-text emails on your contact page. Spambots will scrape this. Use a contact form instead.",
    isFixed: true,
  },
];

export default function ActionCenterPage() {
  const [tasks, setTasks] = useState(initialTasks);
  const [filter, setFilter] = useState("ALL"); // ALL, PENDING, FIXED

  const toggleTask = (id: string) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, isFixed: !task.isFixed } : task
    ));
  };

  // Derived stats
  const totalTasks = tasks.length;
  const fixedTasks = tasks.filter(t => t.isFixed).length;
  const progressPercent = Math.round((fixedTasks / totalTasks) * 100);

  const filteredTasks = tasks.filter(task => {
    if (filter === "PENDING") return !task.isFixed;
    if (filter === "FIXED") return task.isFixed;
    return true;
  });

  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case "CRITICAL": return "text-destructive bg-destructive/10 border-destructive/20";
      case "WARNING": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "INFO": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      default: return "text-muted-foreground bg-secondary border-border";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case "CRITICAL": return <ShieldAlert className="w-3.5 h-3.5" />;
      case "WARNING": return <AlertTriangle className="w-3.5 h-3.5" />;
      case "INFO": return <Info className="w-3.5 h-3.5" />;
      default: return null;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-4xl"
    >
      {/* Header & Progress */}
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            Action Center <Wrench className="w-7 h-7 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-1">
            Follow these step-by-step instructions to fix vulnerabilities and increase your Cyber Safety Score.
          </p>
        </div>

        {/* Progress Bar Component */}
        <div className="p-6 rounded-3xl border border-border/50 bg-card/40 backdrop-blur-md shadow-sm">
          <div className="flex justify-between items-end mb-3">
            <div>
              <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Overall Progress</p>
              <p className="text-2xl font-bold">{fixedTasks} of {totalTasks} fixed</p>
            </div>
            <span className="text-3xl font-black text-primary">{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-secondary rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-primary to-emerald-500"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 p-1 bg-secondary/50 backdrop-blur-md rounded-xl w-max border border-border/50">
        {["ALL", "PENDING", "FIXED"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 text-sm font-semibold rounded-lg transition-all ${
              filter === f 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f === "ALL" ? "All Tasks" : f === "PENDING" ? "Needs Attention" : "Resolved"}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="flex flex-col gap-4">
        <AnimatePresence mode="popLayout">
          {filteredTasks.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center p-12 text-center rounded-3xl border border-dashed border-emerald-500/30 bg-emerald-500/5"
            >
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-emerald-600 dark:text-emerald-400">All caught up!</h3>
              <p className="text-muted-foreground">You have successfully resolved all security warnings.</p>
            </motion.div>
          ) : (
            filteredTasks.map((task) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={task.id}
                className={`relative overflow-hidden flex flex-col md:flex-row gap-4 p-5 rounded-2xl border backdrop-blur-md transition-colors ${
                  task.isFixed 
                    ? "bg-card/20 border-border/30 opacity-70" 
                    : "bg-card/60 border-border/60 shadow-sm hover:border-primary/30"
                }`}
              >
                {/* Left: Checkbox & Status */}
                <div className="flex items-start gap-4 flex-1">
                  <button 
                    onClick={() => toggleTask(task.id)}
                    className="mt-0.5 flex-shrink-0 text-muted-foreground hover:text-primary transition-colors focus:outline-none"
                  >
                    {task.isFixed ? (
                      <CheckCircle2 className="w-7 h-7 text-emerald-500" />
                    ) : (
                      <Circle className="w-7 h-7" />
                    )}
                  </button>
                  
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className={`text-lg font-bold ${task.isFixed ? "line-through text-muted-foreground" : "text-foreground"}`}>
                        {task.title}
                      </h3>
                      {!task.isFixed && (
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border ${getSeverityStyles(task.severity)}`}>
                          {getSeverityIcon(task.severity)} {task.severity}
                        </span>
                      )}
                    </div>
                    
                    <p className={`text-sm leading-relaxed ${task.isFixed ? "text-muted-foreground/60" : "text-muted-foreground"}`}>
                      {task.remedy}
                    </p>
                  </div>
                </div>

                {/* Right: Actions / Learn More */}
                {!task.isFixed && (
                  <div className="flex items-center md:pl-4 md:border-l border-border/50 flex-shrink-0 mt-4 md:mt-0">
                    <button className="flex items-center justify-between w-full md:w-auto gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-primary/10 hover:text-primary text-sm font-semibold transition-colors">
                      How to fix <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

    </motion.div>
  );
}