import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, ArrowRight, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import heroPortrait from '../assets/hero-portrait.png';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const leftContentRef = useRef<HTMLDivElement | null>(null);
  const rightVisualRef = useRef<HTMLDivElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const nameRef = useRef<HTMLHeadingElement | null>(null);
  const roleRef = useRef<HTMLDivElement | null>(null);
  const descRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const socialRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Entrance animation sequence (completes within ~1.1s)
      // Hero content stays static afterwards on scroll!
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(labelRef.current, { opacity: 0.15, y: 25 }, { opacity: 1, y: 0, duration: 0.35 }, 0.1)
        .fromTo(nameRef.current, { opacity: 0.15, y: 35, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.45 }, 0.2)
        .fromTo(roleRef.current, { opacity: 0.15, y: 25 }, { opacity: 1, y: 0, duration: 0.35 }, 0.35)
        .fromTo(descRef.current, { opacity: 0.15, y: 25 }, { opacity: 1, y: 0, duration: 0.4 }, 0.5)
        .fromTo(ctaRef.current, { opacity: 0.15, y: 25 }, { opacity: 1, y: 0, duration: 0.4 }, 0.65)
        .fromTo(socialRef.current, { opacity: 0.15, y: 20 }, { opacity: 1, y: 0, duration: 0.35 }, 0.8)
        .fromTo(rightVisualRef.current, { opacity: 0.15, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, 0.3);
    }, heroRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const scrollTo = (targetId: string) => {
    const el = document.getElementById(targetId);
    if (el) {
      gsap.to(window, {
        duration: 1.1,
        scrollTo: { y: el, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen pt-28 pb-20 flex items-center justify-center overflow-hidden z-10"
    >
      <div className="site-container grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
        {/* LEFT COLUMN (50%): Hero Typography & CTAs */}
        <div ref={leftContentRef} className="lg:col-span-6 xl:col-span-6 flex flex-col justify-center">
          {/* Top Typography Block */}
          <div className="space-y-6">
            {/* Small Label */}
            <div ref={labelRef} className="flex items-center space-x-3 mb-1">
              <span className="h-[2px] w-8 bg-white" />
              <span className="mono-tag text-xs sm:text-sm font-semibold tracking-widest text-zinc-300">
                HELLO, I'M
              </span>
            </div>

            {/* Headline with Premium Monochrome Gradient (White -> Light Gray -> Medium Gray) */}
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] font-display"
            >
              <span className="monochrome-gradient-text">OM MURUGAN</span>
            </h1>

            {/* Supporting Role */}
            <div ref={roleRef} className="space-y-2 pt-1">
              <p className="font-mono text-xs sm:text-sm md:text-base text-zinc-400 font-semibold tracking-wider uppercase">
                3rd Year Undergraduate
              </p>
              <p className="text-sm sm:text-base md:text-lg font-semibold text-white tracking-wide flex items-center gap-2">
                <Cpu className="w-4 h-4 md:w-5 md:h-5 text-white shrink-0" />
                <span className="font-display">ARTIFICIAL INTELLIGENCE & MACHINE LEARNING</span>
              </p>
            </div>

            {/* Concise Resume Bio (max-width 580px, line-height 1.8) */}
            <p
              ref={descRef}
              className="text-zinc-300 text-base md:text-lg leading-[1.8] max-w-[580px] font-light pt-1"
            >
              {portfolioData.personal.bio} Driven by a solid foundation in{' '}
              <span className="text-white font-medium">Python, Machine Learning Algorithms, Data Structures</span>, and{' '}
              <span className="text-white font-medium">Computer Vision</span>.
            </p>
          </div>

          {/* Monochrome CTA Buttons (Exact 32px top margin from description above) */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-6 sm:gap-8 mt-8 md:mt-9">
            <MagneticButton
              onClick={() => scrollTo('projects')}
              className="px-7 py-3.5 rounded-full bg-white text-black font-semibold text-sm md:text-base tracking-wide flex items-center space-x-3 hover:bg-zinc-200 transition-colors duration-300 shadow-lg"
            >
              <span>VIEW MY WORK</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 rounded-full border border-zinc-700 bg-transparent text-white font-semibold text-sm md:text-base tracking-wide flex items-center space-x-3 hover:border-white hover:bg-white/10 transition-colors duration-300"
            >
              <span>LET'S CONNECT</span>
              <ArrowRight className="w-4 h-4" />
            </MagneticButton>
          </div>

          {/* Separator Line (Exact 14px top margin from action buttons) */}
          <div className="w-full border-t border-zinc-800/80 mt-3.5 md:mt-4 mb-3" />

          {/* Social Links Row */}
          <div ref={socialRef} className="flex items-center space-x-6 sm:space-x-8 pt-0.5">
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
              aria-label="GitHub Profile"
            >
              <GithubIcon className="w-5 h-5" />
              <span className="font-mono text-xs hidden sm:inline">@{portfolioData.socialLinks.githubUsername}</span>
            </a>

            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon className="w-5 h-5" />
              <span className="font-mono text-xs hidden sm:inline">LinkedIn</span>
            </a>

            <a
              href={`mailto:${portfolioData.socialLinks.email}`}
              className="flex items-center space-x-2 text-zinc-400 hover:text-white transition-colors duration-300"
              aria-label="Email Om Murugan"
            >
              <Mail className="w-5 h-5" />
              <span className="font-mono text-xs hidden sm:inline">{portfolioData.socialLinks.email}</span>
            </a>
          </div>
        </div>

        {/* RIGHT COLUMN (50%): Provided Hero Portrait Asset Integration (Substantially Larger Sizing) */}
        <div ref={rightVisualRef} className="lg:col-span-6 xl:col-span-6 flex justify-center lg:justify-end items-center">
          <div className="relative w-full max-w-[700px] sm:max-w-[850px] lg:max-w-[1050px] xl:max-w-[1200px] flex items-center justify-center lg:-mr-6 xl:-mr-10">
            <img
              src={heroPortrait}
              alt="Om Murugan M - AI & ML Developer Hero Portrait"
              className="w-full h-auto max-h-[96vh] object-contain select-none pointer-events-none drop-shadow-2xl scale-120 sm:scale-130 lg:scale-140 xl:scale-145 origin-center transition-all duration-300"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
