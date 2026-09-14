import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import gsap from 'gsap';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    gsap.to(window, {
      duration: 1.2,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <footer className="relative border-t border-zinc-800 bg-black py-12 z-10">
      <div className="site-container flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left: Branding & Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-extrabold text-base sm:text-lg text-white tracking-wider">
            {portfolioData.personal.name}
          </p>
          <p className="font-mono text-xs text-zinc-400">
            © 2026 {portfolioData.personal.name}. All Rights Reserved.
          </p>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center space-x-6">
          <a
            href={portfolioData.socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-2"
            aria-label="GitHub Profile"
          >
            <GithubIcon className="w-5 h-5" />
          </a>
          <a
            href={portfolioData.socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-400 hover:text-white transition-colors p-2"
            aria-label="LinkedIn Profile"
          >
            <LinkedinIcon className="w-5 h-5" />
          </a>
          <a
            href={`mailto:${portfolioData.socialLinks.email}`}
            className="text-zinc-400 hover:text-white transition-colors p-2"
            aria-label="Send Email"
          >
            <Mail className="w-5 h-5" />
          </a>
        </div>

        {/* Right: Scroll to Top */}
        <button
          onClick={scrollToTop}
          className="group flex items-center space-x-2 text-xs font-mono text-zinc-400 hover:text-white transition-colors"
          aria-label="Scroll back to top"
        >
          <span>BACK TO TOP</span>
          <span className="p-2 rounded-full bg-zinc-900 border border-zinc-800 group-hover:border-white transition-all">
            <ArrowUp className="w-4 h-4 text-zinc-300 group-hover:text-white" />
          </span>
        </button>
      </div>
    </footer>
  );
};
