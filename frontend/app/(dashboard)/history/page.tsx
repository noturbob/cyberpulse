"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  ArrowUpRight, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Download,
  ExternalLink
} from "lucide-react";
import { fadeInUp } from "@/lib/motion";

// Mock Data: Shows a user improving their score over time
const mockHistory = [
  {
    id: "scan_104",
    date: "April 23, 2026",
    url: "https://myshop.in",
    score: 92,
    status: "Secure",
    issues: 0,
  },
  {
    id: "scan_092",
    date: "March 15, 2026",
    url: "https://myshop.in",
    score: 74,
    status: "Warning",
    issues: 3,
  },
  {
    id: "scan_081",
    date: "February 10, 2026",
    url: "https://myshop.in",
    score: 45,
    status: "Critical",
    issues: 8,
  },
  {
    id: "scan_044",
    date: "January 05, 2026",
    url: "https://myshop.in",
    score: 41,
    status: "Critical",
    issues: 9,
  },
];

export default function HistoryPage() {
  // Helper function to color-code the score and status
  const getStatusConfig = (score: number) => {
    if (score >= 85) return { color: "text-safe", bg: "bg-safe/20", border: "border-safe/30", icon: CheckCircle };
    if (score >= 60) return { color: "text-medium", bg: "bg-medium/20", border: "border-medium/30", icon: AlertTriangle };
    return { color: "text-critical", bg: "bg-critical/20", border: "border-critical/30", icon: XCircle };
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <motion.div variants={fadeInUp}>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white">Scan History</h1>
          <p className="text-white/70 mt-2 font-body">Track your website's security posture and improvements over time.</p>
        </motion.div>
        <motion.button 
          variants={fadeInUp}
          whileHover={{ scale: 1.02 }}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium rounded-lg glass-card border border-cyber-400/30 hover:border-cyber-400/60 text-cyber-300 hover:text-cyber-200 transition-all w-max whitespace-nowrap shadow-lg hover:shadow-glow-cyber"
        >
          <Download className="w-4 h-4" />
          Export CSV
        </motion.button>
      </div>

      {/* The Data Table */}
      <motion.div variants={fadeInUp} className="w-full rounded-xl glass-card border border-white/10 overflow-hidden shadow-lg hover:border-cyber-400/40 hover:shadow-glow-cyber transition-all">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-white/70 uppercase glass-card border-b border-white/5 bg-white/[0.02]">
              <tr>
                <th scope="col" className="px-6 py-4 font-semibold">Date & Time</th>
                <th scope="col" className="px-6 py-4 font-semibold">Target URL</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Safety Score</th>
                <th scope="col" className="px-6 py-4 font-semibold">Status</th>
                <th scope="col" className="px-6 py-4 font-semibold text-center">Active Issues</th>
                <th scope="col" className="px-6 py-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {mockHistory.map((scan) => {
                const config = getStatusConfig(scan.score);
                const StatusIcon = config.icon;

                return (
                  <motion.tr 
                    key={scan.id} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-white/[0.04] transition-colors group border-white/5"
                  >
                    
                    {/* Date */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-white font-medium">
                        <Calendar className="w-4 h-4 text-white/50" />
                        {scan.date}
                      </div>
                    </td>

                    {/* URL */}
                    <td className="px-6 py-4 whitespace-nowrap text-white/70 font-body">
                      {scan.url}
                    </td>

                    {/* Score */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center font-display font-bold text-lg ${config.color}`}>
                        {scan.score}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border glass-card ${config.bg} ${config.color} ${config.border} transition-all`}>
                        <StatusIcon className="w-3.5 h-3.5" />
                        {scan.status}
                      </div>
                    </td>

                    {/* Issues Count */}
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className={`font-display font-bold ${scan.issues > 0 ? 'text-medium' : 'text-safe'}`}>
                        {scan.issues}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <motion.button 
                        whileHover={{ x: 4 }}
                        className="inline-flex items-center gap-1 text-cyber-400 hover:text-cyber-300 font-medium transition-colors"
                      >
                        View Report
                        <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </motion.button>
                    </td>

                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination / Footer */}
        <div className="p-4 border-t border-white/5 glass-card text-xs text-white/70 flex justify-between items-center bg-white/[0.02]">
          <span>Showing {mockHistory.length} of {mockHistory.length} scans</span>
          <div className="flex items-center gap-2">
            <button className="px-2 py-1 rounded hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Previous</button>
            <button className="px-2 py-1 rounded hover:bg-white/10 transition-colors disabled:opacity-50" disabled>Next</button>
          </div>
        </div>
      </motion.div>

    </motion.div>
  );
}