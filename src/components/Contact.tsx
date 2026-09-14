import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Send, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const socialsRef = useRef<HTMLDivElement | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Projects -> Contact Transition Reveal
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
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        titleRef.current,
        { opacity: 0.2, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );

      gsap.fromTo(
        [formRef.current, socialsRef.current],
        { opacity: 0.2, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 82%',
            toggleActions: 'play reverse play reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-[130vh] py-36 md:py-48 lg:py-60 z-10"
    >
      <div className="site-container space-y-20 md:space-y-28">
        {/* Header */}
        <div ref={headerRef} className="space-y-4 mb-10 md:mb-16">
          <div className="flex items-center space-x-3">
            <span className="mono-tag text-white font-semibold">03 //</span>
            <span className="mono-tag text-zinc-400">GET IN TOUCH</span>
          </div>

          <h2
            ref={titleRef}
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] font-display"
          >
            LET'S BUILD <br className="hidden sm:inline" />
            <span className="monochrome-gradient-text">SOMETHING GREAT</span>
          </h2>
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-start pt-6">
        {/* Left Column (5 cols): Direct Social Links & Email */}
        <div ref={socialsRef} className="lg:col-span-5">
          <p className="text-zinc-300 text-base md:text-lg leading-[1.75] font-light mb-9 md:mb-10">
            Whether you have a question, a project opportunity, or just want to discuss Artificial Intelligence, Machine Learning, or Full Stack Software Engineering — my inbox is always open.
          </p>

          <div className="space-y-4 sm:space-y-4.5 md:space-y-4.5">
            {/* Email Card */}
            <a
              href={`mailto:${portfolioData.socialLinks.email}`}
              className="glass-card p-6 sm:p-7 md:p-8 border border-zinc-800 bg-zinc-950/80 flex items-center justify-between group hover:border-zinc-500 transition-colors shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="mono-tag text-[10px] text-zinc-400">DIRECT EMAIL</p>
                  <p className="text-sm sm:text-base font-semibold text-white group-hover:text-zinc-300 transition-colors mt-0.5 break-all">
                    {portfolioData.socialLinks.email}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
            </a>

            {/* LinkedIn Card */}
            <a
              href={portfolioData.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 sm:p-7 md:p-8 border border-zinc-800 bg-zinc-950/80 flex items-center justify-between group hover:border-zinc-500 transition-colors shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
                  <LinkedinIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="mono-tag text-[10px] text-zinc-400">LINKEDIN</p>
                  <p className="text-sm sm:text-base font-semibold text-white group-hover:text-zinc-300 transition-colors mt-0.5 break-all">
                    {portfolioData.socialLinks.linkedinUsername}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
            </a>

            {/* GitHub Card */}
            <a
              href={portfolioData.socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-card p-6 sm:p-7 md:p-8 border border-zinc-800 bg-zinc-950/80 flex items-center justify-between group hover:border-zinc-500 transition-colors shadow-xl"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white shrink-0">
                  <GithubIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="mono-tag text-[10px] text-zinc-400">GITHUB REPOSITORY</p>
                  <p className="text-sm sm:text-base font-semibold text-white group-hover:text-zinc-300 transition-colors mt-0.5 break-all">
                    @{portfolioData.socialLinks.githubUsername}
                  </p>
                </div>
              </div>
              <ArrowUpRight className="w-5 h-5 text-zinc-400 group-hover:text-white group-hover:translate-x-1 group-hover:-translate-y-1 transition-all shrink-0 ml-2" />
            </a>
          </div>
        </div>

        {/* Right Column (7 cols): Contact Form */}
        <div className="lg:col-span-7 pt-8 md:pt-12">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="glass-card p-8 sm:p-10 md:p-12 border border-zinc-800 bg-zinc-950/80 space-y-4 sm:space-y-4.5 md:space-y-4.5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-4.5">
              <div className="space-y-2.5">
                <label className="mono-tag text-[10px] text-zinc-300 font-semibold block" htmlFor="name">
                  YOUR NAME *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:bg-zinc-900 transition-all outline-none text-sm"
                />
              </div>

              <div className="space-y-2.5">
                <label className="mono-tag text-[10px] text-zinc-300 font-semibold block" htmlFor="email">
                  YOUR EMAIL *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:bg-zinc-900 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2.5">
              <label className="mono-tag text-[10px] text-zinc-300 font-semibold block" htmlFor="subject">
                SUBJECT
              </label>
              <input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Project Inquiry / Collaboration"
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:bg-zinc-900 transition-all outline-none text-sm"
              />
            </div>

            <div className="space-y-2.5">
              <label className="mono-tag text-[10px] text-zinc-300 font-semibold block" htmlFor="message">
                MESSAGE *
              </label>
              <textarea
                id="message"
                required
                rows={6}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Hello Om Murugan, I'd like to talk about..."
                className="w-full px-4 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-white focus:bg-zinc-900 transition-all outline-none resize-none text-sm"
              />
            </div>

            {submitted && (
              <div className="p-4 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center space-x-3 text-white font-medium text-xs sm:text-sm">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-white" />
                <span>Thank you! Your message has been prepared for dispatch.</span>
              </div>
            )}

            <MagneticButton
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm tracking-wide flex items-center justify-center space-x-2.5 hover:bg-zinc-200 transition-all duration-300 shadow-lg disabled:opacity-50 mt-2"
            >
              <span>{isSubmitting ? 'DISPATCHING...' : 'SEND MESSAGE'}</span>
              <Send className="w-4 h-4" />
            </MagneticButton>
          </form>
        </div>
      </div>
    </div>
  </section>
);
};
