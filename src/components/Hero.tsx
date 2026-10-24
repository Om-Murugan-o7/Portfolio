import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Mail, ArrowRight, Cpu } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { MagneticButton } from './MagneticButton';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import heroPortrait from '../assets/hero-portrait.png';
import signatureWhite from '../assets/signature-white.png';

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

  const { socialLinks } = portfolioData;

  return (
    <section id="home" ref={heroRef} className="home-hero">
      <div className="home-stage">
        <div ref={leftContentRef} className="home-copy">
          <div ref={labelRef} className="home-greeting"><span />HELLO, I'M</div>
          <h1 ref={nameRef} className="home-name" aria-label="Om Murugan">
            <span>OM</span><span>MURUGAN</span>
          </h1>
          <div ref={roleRef} className="home-role">ARTIFICIAL INTELLIGENCE &amp; MACHINE LEARNING</div>
          <p ref={descRef} className="home-bio">
            Detail-focused and hardworking undergraduate developer concentrating in Artificial Intelligence and Machine Learning. Passionate about building intelligent solutions that create real-world impact.
          </p>
          <div ref={ctaRef} className="home-actions">
            <MagneticButton onClick={() => scrollTo('contact')} className="home-connect">
              <span>LET'S CONNECT</span><ArrowRight size={22} />
            </MagneticButton>
          </div>
          <div ref={socialRef} className="home-socials">
            <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GithubIcon /></a>
            <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedinIcon /></a>
            <a href={`mailto:${socialLinks.email}`} aria-label="Email Om Murugan"><Mail /></a>
            <button onClick={() => scrollTo('projects')} aria-label="Explore AI projects"><Cpu /></button>
          </div>
          <div className="home-stats" aria-label="At a glance">
            <div><strong>3+</strong><span>YEARS OF<br />LEARNING</span></div>
            <div><strong>5+</strong><span>PROJECTS<br />BUILT</span></div>
            <div><strong>2+</strong><span>TECH AREAS<br />EXPLORING</span></div>
          </div>
        </div>
        <div ref={rightVisualRef} className="home-visual">
          <img src={heroPortrait} alt="Om Murugan, surrounded by an illuminated orbit and AI and machine learning annotations" fetchPriority="high" />
          <span className="home-signature" aria-hidden="true"><img src={signatureWhite} alt="" /></span>
        </div>
      </div>
      <div className="home-bottom">
        <div className="home-contact-links">
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer"><GithubIcon /><span>@{socialLinks.githubUsername}</span></a>
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer"><LinkedinIcon /><span>LinkedIn</span></a>
          <a href={`mailto:${socialLinks.email}`}><Mail /><span>{socialLinks.email}</span></a>
        </div>
        <p className="home-motto"><span />BUILDING TODAY FOR A SMARTER TOMORROW</p>
      </div>
    </section>
  );
};
