"use client";

import { Book, Menu, X, Sunset, Trees, Zap } from "lucide-react";
import { Show, UserButton } from "@clerk/nextjs";
import { motion } from "framer-motion";
import { useState } from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { slideInDown } from "@/lib/motion";

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface Navbar1Props {
  className?: string;
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
    className?: string;
  };
  menu?: MenuItem[];
  auth?: {
    login: {
      title: string;
      url: string;
    };
    signup: {
      title: string;
      url: string;
    };
  };
}

const Navbar1 = ({
  logo = {
    url: "/",
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg",
    alt: "MSME Cyber Shield",
    title: "Cyber Shield",
  },
  menu = [
    { title: "Home", url: "/" },
    {
      title: "Products",
      url: "#",
      items: [
        {
          title: "Free Scanner",
          description: "Scan any website instantly, no sign-up needed",
          icon: <Zap className="size-5 shrink-0" />,
          url: "/",
        },
        {
          title: "Dashboard",
          description: "Track your security posture over time",
          icon: <Trees className="size-5 shrink-0" />,
          url: "/dashboard",
        },
        {
          title: "API Access",
          description: "Integrate Cyber Shield into your platform",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Resources",
      url: "#",
      items: [
        {
          title: "Security Guide",
          description: "Learn cybersecurity best practices for MSMEs",
          icon: <Book className="size-5 shrink-0" />,
          url: "/guide",
        },
        {
          title: "Help Center",
          description: "Find answers to common questions",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Status Page",
          description: "Check uptime and service status",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    { title: "Pricing", url: "#" },
  ],
  auth = {
    login: { title: "Login", url: "/sign-in" },
    signup: { title: "Sign up", url: "/sign-up" },
  },
  className,
}: Navbar1Props) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "py-4 sticky top-0 z-50 border-b",
        "bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl",
        "border-white/5 shadow-lg shadow-black/20",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Desktop Menu */}
        <nav className="hidden items-center justify-center lg:flex relative w-full">
          {/* Logo - Left */}
          <motion.div
            className="absolute left-0 flex items-center gap-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <a href={logo.url} className="flex items-center gap-2 group">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyber-500 to-blue-600 group-hover:shadow-glow-cyber transition-all">
                <img
                  src={logo.src}
                  className="max-h-6 invert"
                  alt={logo.alt}
                />
              </div>
              <span className="text-lg font-display font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {logo.title}
              </span>
            </a>
          </motion.div>

          {/* Center Menu */}
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <NavigationMenu>
              <NavigationMenuList>
                {menu.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 + idx * 0.05 }}
                  >
                    {renderMenuItem(item)}
                  </motion.div>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </motion.div>

          {/* User Button - Right */}
          <motion.div
            className="absolute right-0 flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Show when="signed-in">
              <div className="flex items-center gap-2 pl-3 border-l border-white/10">
                <UserButton />
              </div>
            </Show>
            <Show when="signed-out">
              <a
                href={auth.login.url}
                className="px-4 py-2 text-sm font-semibold text-white/80 hover:text-white transition-colors"
              >
                {auth.login.title}
              </a>
              <a
                href={auth.signup.url}
                className="px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-cyber-500 to-blue-600 text-white hover:shadow-glow-cyber transition-all active:scale-95"
              >
                {auth.signup.title}
              </a>
            </Show>
          </motion.div>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <a href={logo.url} className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyber-500 to-blue-600">
                <img
                  src={logo.src}
                  className="max-h-6 invert"
                  alt={logo.alt}
                />
              </div>
            </a>
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-lg hover:bg-white/10"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="overflow-y-auto glass-card border-white/10 bg-black/80 backdrop-blur-xl"
                side="right"
              >
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <a href={logo.url} className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-gradient-to-br from-cyber-500 to-blue-600">
                        <img
                          src={logo.src}
                          className="max-h-6 invert"
                          alt={logo.alt}
                        />
                      </div>
                      <span className="font-display font-bold">{logo.title}</span>
                    </a>
                  </SheetTitle>
                </SheetHeader>
                <motion.div
                  className="flex flex-col gap-6 p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>

                  <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                    <Show when="signed-in">
                      <UserButton />
                    </Show>
                    <Show when="signed-out">
                      <a
                        href={auth.login.url}
                        className="px-4 py-2 text-sm font-semibold text-center rounded-lg border border-white/20 hover:bg-white/5 transition-colors"
                      >
                        {auth.login.title}
                      </a>
                      <a
                        href={auth.signup.url}
                        className="px-4 py-2 text-sm font-semibold text-center rounded-lg bg-gradient-to-r from-cyber-500 to-blue-600 text-white hover:shadow-glow-cyber transition-all"
                      >
                        {auth.signup.title}
                      </a>
                    </Show>
                  </div>
                </motion.div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-transparent hover:bg-white/5 text-white/90 hover:text-white transition-colors rounded-lg">
          {item.title}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="glass-card bg-black/90 border-white/10 rounded-xl shadow-2xl">
          <div className="grid grid-cols-1 gap-1 p-2 w-80">
            {item.items.map((subItem) => (
              <NavigationMenuLink asChild key={subItem.title}>
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <NavigationMenuLink
        href={item.url}
        className="group inline-flex h-10 w-max items-center justify-center px-4 py-2 text-sm font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-200"
      >
        {item.title}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-white/10">
        <AccordionTrigger className="text-base py-2 font-semibold text-white/90 hover:text-white hover:no-underline hover:bg-white/5 px-2 rounded-lg transition-colors">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2 space-y-2 pb-0">
          {item.items.map((subItem) => (
            <a
              key={subItem.title}
              href={subItem.url}
              className="flex flex-row gap-3 rounded-lg p-3 leading-none no-underline transition-all duration-200 outline-none select-none hover:bg-white/10"
            >
              <div className="text-cyber-500 mt-0.5">{subItem.icon}</div>
              <div className="flex-1">
                <div className="text-sm font-semibold text-white">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-xs leading-snug text-white/60 mt-0.5">
                    {subItem.description}
                  </p>
                )}
              </div>
            </a>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <a
      key={item.title}
      href={item.url}
      className="block text-base font-semibold text-white/90 hover:text-white px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
    >
      {item.title}
    </a>
  );
};

const SubMenuLink = ({ item }: { item: MenuItem }) => {
  return (
    <a
      className="flex flex-row gap-3 rounded-lg p-3 leading-none no-underline transition-all duration-200 outline-none select-none group hover:bg-white/10 hover:translate-x-1"
      href={item.url}
    >
      <div className="text-cyber-500 group-hover:text-cyber-400 transition-colors mt-1">{item.icon}</div>
      <div className="flex-1">
        <div className="text-sm font-semibold text-white group-hover:text-white transition-colors">{item.title}</div>
        {item.description && (
          <p className="text-xs leading-snug text-white/60 group-hover:text-white/80 transition-colors mt-0.5">
            {item.description}
          </p>
        )}
      </div>
    </a>
  );
};

export { Navbar1 };