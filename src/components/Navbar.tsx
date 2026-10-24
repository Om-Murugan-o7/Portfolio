import React, { useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'HOME' },
  { id: 'about', label: 'ABOUT' },
  { id: 'projects', label: 'PROJECTS' },
  { id: 'contact', label: 'CONTACT' },
];

export const Navbar: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (navItems.some((item) => item.id === hashId)) {
        setTimeout(() => {
          scrollToSection(hashId, false);
        }, 100);
      }
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    const triggers: ScrollTrigger[] = [];
    const timer = setTimeout(() => {
      navItems.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          const st = ScrollTrigger.create({
            trigger: el,
            start: 'top 50%',
            end: 'bottom 50%',
            onToggle: (self) => {
              if (self.isActive) {
                setActiveSection(item.id);
                if (window.history.replaceState) {
                  window.history.replaceState(null, '', `#${item.id}`);
                }
              }
            },
          });
          triggers.push(st);
        }
      });
    }, 200);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      triggers.forEach((t) => t.kill());
    };
  }, []);

  const scrollToSection = (id: string, closeMobile = true) => {
    if (closeMobile) setMobileMenuOpen(false);
    const target = document.getElementById(id);
    if (!target) return;

    gsap.to(window, {
      duration: 1.1,
      scrollTo: { y: target, offsetY: 80 },
      ease: 'power3.inOut',
    });
  };

  return (
    <header
      className={`portfolio-nav fixed top-0 left-0 w-full h-20 z-40 transition-all duration-300 flex items-center ${
        isScrolled
          ? 'bg-black/90 backdrop-blur-md border-b border-zinc-800/80 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="home-nav-container flex items-center justify-between">
        {/* Left: Brand Name */}
        <button
          onClick={() => scrollToSection('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
          aria-label="Scroll to Home"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white group-hover:scale-125 transition-transform duration-300 shrink-0" />
          <span className="font-extrabold tracking-wider text-base sm:text-lg md:text-xl text-white transition-colors duration-300">
            {portfolioData.personal.shortName}
          </span>
        </button>

        {/* Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-3 sm:gap-4" aria-label="Main Navigation">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => scrollToSection(item.id)}
                className={`home-nav-link px-3.5 py-2 transition-all duration-200 ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-zinc-300 hover:text-white p-2 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-[80px] bg-black/95 backdrop-blur-xl border-b border-zinc-800 px-6 py-6 shadow-2xl flex flex-col space-y-4 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                aria-current={isActive ? 'page' : undefined}
                onClick={() => scrollToSection(item.id)}
                className={`mobile-nav-link font-mono text-left text-sm tracking-widest font-semibold px-4 py-3 transition-colors flex items-center justify-between ${
                  isActive
                    ? 'text-white'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                <span>{item.label}</span>

              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
