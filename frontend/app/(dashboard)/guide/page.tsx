"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, 
  Languages, 
  ShieldQuestion, 
  Lightbulb,
  Search
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Educational Data with Real-World MSME Analogies
const guideContent = {
  en: {
    title: "Cyber Suraksha Guide",
    subtitle: "Cybersecurity explained in plain English, using physical storefront analogies.",
    searchPlaceholder: "Search for a term (e.g., Phishing, SSL)...",
    terms: [
      {
        id: "ssl",
        term: "SSL Certificate",
        analogy: "A tamper-proof, sealed envelope for your customer's data.",
        description: "When a customer types their credit card or password into your site, an SSL certificate encrypts it. Without it, browsers show a 'Not Secure' warning, which scares away 80% of buyers.",
      },
      {
        id: "malware",
        term: "Malware",
        analogy: "A thief sneaking into your warehouse and hiding among the boxes.",
        description: "Malicious Software (Malware) is code injected into your website. It can steal customer data, hijack your site to show spam ads, or hold your business hostage for a ransom.",
      },
      {
        id: "phishing",
        term: "Phishing",
        analogy: "A scammer calling you pretending to be your trusted wholesale supplier.",
        description: "A technique where attackers trick you into giving up passwords or bank details by sending fake emails or creating fake login pages that look exactly like Google or your bank.",
      },
      {
        id: "ddos",
        term: "DDoS Attack",
        analogy: "A fake mob blocking the entrance to your shop so real customers can't enter.",
        description: "Distributed Denial of Service (DDoS) is when attackers send millions of fake visitors to your website at once, causing your server to crash and your website to go offline.",
      },
      {
        id: "broken_links",
        term: "Broken Links (404)",
        analogy: "A boarded-up door or a collapsed aisle in your physical store.",
        description: "While not an active 'attack', dead links destroy your Google Search ranking (SEO) and make your business look unprofessional or permanently closed to new customers.",
      }
    ]
  },
  hi: {
    title: "साइबर सुरक्षा गाइड",
    subtitle: "साइबर सुरक्षा को आसान हिंदी में समझें, आपकी अपनी दुकान के उदाहरणों के साथ।",
    searchPlaceholder: "कोई शब्द खोजें (जैसे, Phishing, SSL)...",
    terms: [
      {
        id: "ssl",
        term: "एसएसएल प्रमाणपत्र (SSL)",
        analogy: "आपके ग्राहक के डेटा के लिए एक सीलबंद, सुरक्षित लिफाफा।",
        description: "जब कोई ग्राहक अपनी जानकारी डालता है, तो SSL उसे सुरक्षित करता है। इसके बिना, ब्राउज़र 'सुरक्षित नहीं' (Not Secure) की चेतावनी दिखाता है, जिससे ग्राहक डर कर चले जाते हैं।",
      },
      {
        id: "malware",
        term: "मैलवेयर (Malware)",
        analogy: "आपके गोदाम में पेटियों के बीच छिपा हुआ कोई चोर।",
        description: "मैलवेयर एक खतरनाक सॉफ्टवेयर है। यह ग्राहकों का डेटा चुरा सकता है, आपकी वेबसाइट पर गलत विज्ञापन दिखा सकता है, या आपसे फिरौती (ransom) मांग सकता है।",
      },
      {
        id: "phishing",
        term: "फ़िशिंग (Phishing)",
        analogy: "एक धोखेबाज़ जो आपका भरोसेमंद सप्लायर बनकर आपको फोन करता है।",
        description: "हमलावर नकली ईमेल या बैंक जैसे दिखने वाले नकली पेज बनाकर आपको धोखा देते हैं ताकि आप उन्हें अपने पासवर्ड या बैंक की जानकारी दे दें।",
      },
      {
        id: "ddos",
        term: "डीडोस हमला (DDoS)",
        analogy: "आपकी दुकान के बाहर एक नकली भीड़ जो असली ग्राहकों को अंदर नहीं आने देती।",
        description: "हमलावर एक ही समय में आपकी वेबसाइट पर लाखों नकली विज़िटर भेजते हैं, जिससे आपका सर्वर क्रैश हो जाता है और वेबसाइट बंद हो जाती है।",
      },
      {
        id: "broken_links",
        term: "टूटे हुए लिंक (Broken Links)",
        analogy: "आपकी दुकान का एक बंद या टूटा हुआ दरवाज़ा।",
        description: "यह कोई 'हमला' नहीं है, लेकिन टूटे हुए लिंक आपकी Google रैंकिंग (SEO) को खराब करते हैं और ग्राहकों को लगता है कि आपका बिज़नेस बंद हो गया है।",
      }
    ]
  }
};

export default function GuidePage() {
  const [lang, setLang] = useState<"en" | "hi">("en");
  const [searchQuery, setSearchQuery] = useState("");

  const content = guideContent[lang];

  // Filter terms based on search
  const filteredTerms = content.terms.filter(t => 
    t.term.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.analogy.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-8 max-w-4xl"
    >
      {/* Header & Language Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            {content.title} <BookOpen className="w-7 h-7 text-primary" />
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            {content.subtitle}
          </p>
        </div>

        {/* The Toggle Switch */}
        <div className="flex items-center p-1 bg-secondary/50 backdrop-blur-md rounded-xl border border-border/50 w-max shrink-0">
          <button
            onClick={() => setLang("en")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              lang === "en" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLang("hi")}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              lang === "hi" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Languages className="w-4 h-4" /> हिन्दी
          </button>
        </div>
      </div>

      {/* Empathy Callout */}
      <div className="p-5 rounded-2xl border border-amber-500/30 bg-amber-500/5 backdrop-blur-md flex gap-4 items-start">
        <div className="mt-1 p-2 bg-amber-500/20 rounded-full text-amber-500 shrink-0">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-semibold text-amber-600 dark:text-amber-400">
            {lang === "en" ? "You don't need an IT degree." : "आपको आईटी डिग्री की जरूरत नहीं है।"}
          </h4>
          <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
            {lang === "en" 
              ? "Cybersecurity industry jargon is designed to confuse business owners. We believe in keeping it simple. Use this dictionary to decode what your developers or IT agencies are telling you." 
              : "साइबर सुरक्षा की भाषा अक्सर दुकानदारों को भटकाने के लिए होती है। हमारा मानना है कि इसे आसान रखना चाहिए। अपने डेवलपर्स या आईटी एजेंसियों की बातों को समझने के लिए इस डिक्शनरी का उपयोग करें।"}
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
        </div>
        <input
          type="text"
          placeholder={content.searchPlaceholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-4 py-4 rounded-2xl bg-card/40 border border-border/50 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all backdrop-blur-md text-foreground placeholder:text-muted-foreground shadow-sm"
        />
      </div>

      {/* Accordion Dictionary */}
      <div className="rounded-3xl border border-border/50 bg-card/20 backdrop-blur-md p-2 md:p-6 shadow-sm min-h-[400px]">
        <AnimatePresence mode="wait">
          {filteredTerms.length > 0 ? (
            <motion.div
              key={lang} // Forces re-animation when language changes
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
            >
              <Accordion type="single" collapsible className="w-full flex flex-col gap-3">
                {filteredTerms.map((item) => (
                  <AccordionItem 
                    key={item.id} 
                    value={item.id}
                    className="border border-border/40 bg-background/50 rounded-2xl px-2 md:px-4 data-[state=open]:bg-secondary/30 transition-colors"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex flex-col items-start text-left gap-1 pr-4">
                        <h3 className="font-bold text-lg">{item.term}</h3>
                        <p className="text-sm text-primary/80 font-medium line-clamp-1">
                          "{item.analogy}"
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-5 pt-2 text-muted-foreground leading-relaxed">
                      <div className="pl-4 border-l-2 border-primary/30 ml-2">
                        {item.description}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center h-48 text-muted-foreground"
            >
              <ShieldQuestion className="w-12 h-12 mb-3 opacity-20" />
              <p>{lang === "en" ? "No terms found." : "कोई शब्द नहीं मिला।"}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}