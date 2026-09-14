import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Layers, Activity, ShieldCheck, MessageSquare, Eye, ArrowUpRight } from 'lucide-react';
import { portfolioData, type Project } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon } from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0.2, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 85%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      // 2. Safe Project Card Entry & Reveal Timelines (Prevents permanently hidden Project 01)
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.project-showcase-card');

        cards.forEach((card) => {
          const contentLeft = card.querySelector('.project-content-left');
          const previewRight = card.querySelector('.project-preview-right');
          const techBadges = card.querySelectorAll('.tech-badge');

          const cardTl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 42%',
              scrub: 0.6,
            },
          });

          cardTl
            .fromTo(
              card,
              { opacity: 0.25, y: 45 },
              { opacity: 1, y: 0, ease: 'power3.out' }
            )
            .fromTo(
              contentLeft,
              { opacity: 0.3, y: 30 },
              { opacity: 1, y: 0, ease: 'power3.out' },
              '<'
            )
            .fromTo(
              previewRight,
              { opacity: 0.3, scale: 0.94, y: 25 },
              { opacity: 1, scale: 1, y: 0, ease: 'power3.out' },
              '<'
            )
            .fromTo(
              techBadges,
              { opacity: 0.4, y: 15 },
              { opacity: 1, y: 0, stagger: 0.04, ease: 'power3.out' },
              '-=0.2'
            );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // Dynamic Monochrome Project Visual Icon Selector
  const renderProjectIcon = (id: string) => {
    switch (id) {
      case 'proj-1':
        return <Activity className="w-9 h-9 text-white" />;
      case 'proj-2':
        return <Eye className="w-9 h-9 text-white" />;
      case 'proj-3':
        return <MessageSquare className="w-9 h-9 text-white" />;
      case 'proj-4':
        return <ShieldCheck className="w-9 h-9 text-white" />;
      default:
        return <Layers className="w-9 h-9 text-white" />;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-[300vh] py-28 md:py-44 lg:py-60 z-10"
    >
      <div className="site-container space-y-28 md:space-y-40 lg:space-y-48">
        {/* Section Header (Label -> Heading spacing 16px, Heading -> First Card spacing 60px) */}
        <div ref={headerRef} className="space-y-4 mb-4 md:mb-12">
          <div className="flex items-center space-x-3">
            <span className="mono-tag text-white font-semibold">02 //</span>
            <span className="mono-tag text-zinc-400">FEATURED ENGINEERING</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] font-display">
            <span className="monochrome-gradient-text">SELECTED PROJECTS</span>
          </h2>
        </div>

        {/* Showcase Sequence with Ample Purposeful Vertical Breathing Room */}
        <div ref={cardsContainerRef} className="space-y-44 md:space-y-64 lg:space-y-72 pt-2">
          {portfolioData.projects.map((project: Project) => (
            <div
              key={project.id}
              className="project-showcase-card glass-card p-8 sm:p-10 md:p-12 lg:p-13 border border-zinc-800 bg-zinc-950/80 relative overflow-hidden shadow-2xl group hover:border-zinc-600 transition-colors duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* LEFT COLUMN: Project Details (Explicit 10px internal left spacing) */}
                <div className="project-content-left lg:col-span-7 space-y-6 pl-[10px]">
                  <div className="flex items-center space-x-4">
                    <span className="font-mono font-extrabold text-3xl sm:text-4xl text-white tracking-tighter">
                      {project.number}
                    </span>
                    <span className="h-[1px] w-12 bg-zinc-700" />
                    <span className="mono-tag text-xs bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-zinc-300 tracking-wider">
                      {project.category}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight group-hover:text-zinc-100 transition-colors duration-300 font-display">
                      {project.title}
                    </h3>
                    <p className="font-mono text-xs sm:text-sm text-zinc-400 font-medium tracking-wide">
                      {project.tagline}
                    </p>
                  </div>

                  <p className="text-zinc-300 text-sm md:text-base leading-[1.75] font-light">
                    {project.description}
                  </p>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.techStack.map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="tech-badge font-mono text-xs px-3 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:border-zinc-500 hover:text-white transition-colors duration-200"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Live Project Action Link */}
                  {(project.liveUrl || project.githubUrl) && (
                    <div className="flex flex-wrap items-center gap-6 pt-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-white hover:text-zinc-300 transition-colors duration-200"
                        >
                          <span>VIEW LIVE →</span>
                        </a>
                      )}

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-zinc-400 hover:text-white transition-colors duration-200"
                        >
                          <GithubIcon className="w-4 h-4" />
                          <span>GITHUB REPO →</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>

                {/* RIGHT COLUMN: Monochrome Architecture Preview Box (Inner preview scales on hover, outer stays fixed) */}
                <div className="project-preview-right lg:col-span-5 flex justify-center lg:justify-end items-center">
                  <div className="max-w-[460px] w-full h-[260px] sm:h-[285px] md:h-[310px] rounded-2xl bg-zinc-950 border border-zinc-800 p-6 flex flex-col justify-between items-center text-center relative shadow-2xl overflow-hidden group-hover:scale-[1.03] group-hover:border-zinc-500 transition-all duration-300 ease-out">
                    {/* Grid */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

                    {/* Corner Accent Brackets */}
                    <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-white" />
                    <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-white" />
                    <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-white" />
                    <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-white" />

                    {/* Top Tag */}
                    <div className="w-full flex justify-between items-center text-[10px] font-mono text-zinc-400 z-10">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        SYSTEM // PREVIEW
                      </span>
                      <span className="text-white font-semibold">VERIFIED ARCHITECTURE</span>
                    </div>

                    {/* Central Visual Icon */}
                    <div className="relative my-auto z-10 flex flex-col items-center space-y-2">
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center group-hover:scale-110 group-hover:border-white transition-all duration-300 ease-out shadow-lg">
                        {renderProjectIcon(project.id)}
                      </div>
                      <span className="mono-tag text-xs text-zinc-300 font-semibold tracking-wider group-hover:text-white transition-colors duration-300">
                        {project.title.toUpperCase()}
                      </span>
                    </div>

                    {/* Bottom Verification Label */}
                    <div className="w-full pt-2 border-t border-zinc-800 text-[10px] font-mono text-zinc-400 flex items-center justify-between z-10">
                      <span>STACK: INTEGRATED</span>
                      <span className="text-white flex items-center gap-1">
                        <ArrowUpRight className="w-3 h-3" /> ACTIVE NODE
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

