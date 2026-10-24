import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Activity, Eye, ShieldCheck, MessageSquare, Layers, ArrowRight } from 'lucide-react';
import projectReference from '../assets/project-reference.png';
import workflowPreview from '../assets/workflow-preview.png';
import pockettrackPreview from '../assets/pockettrack-preview.png';
import { githubProjects } from '../data/githubProjects';
import { useReducedMotion } from '../hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

const referencePositions: Record<string, string> = { health: '6.7%', community: '64.8%', security: '93.9%' };

const ProjectPreview: React.FC<{ kind: string }> = ({ kind }) => kind === 'workflow' ? (
  <div className="project-reference-art project-workflow-art"><img src={workflowPreview} alt="Work Flow task scheduling dashboard with monochrome orbit outlines" loading="lazy" /></div>
) : kind === 'finance' ? (
  <div className="project-reference-art project-workflow-art"><img src={pockettrackPreview} alt="PocketTrack Android app concept with account balances, transactions, and spending reports" loading="lazy" /></div>
) : referencePositions[kind] ? (
  <div className="project-reference-art" aria-hidden="true" style={{ backgroundImage: `url(${projectReference})`, backgroundPosition: `${referencePositions[kind]} 39.3%` }} />
) : (
  <div className={`project-art project-art-${kind}`} aria-hidden="true">
    <div className="project-orbit project-orbit-one" /><div className="project-orbit project-orbit-two" />
    <div className="project-mini-app">
      <div className="project-mini-toolbar"><i /><i /><i /><span>{kind === 'community' ? 'Community Hub' : kind === 'security' ? 'Secure workspace' : kind === 'finance' ? 'PocketTrack' : 'Engineering workspace'}</span></div>
      {kind === 'health' ? <div className="project-mini-health"><Activity /><div><span>Community health</span><strong>98.6°</strong><div className="project-chart">▁ ▃ ▂ ▆ ▄ ▇ ▃ ▅</div><small>EARLY WARNING · MONITORING</small></div></div>
      : kind === 'vision' ? <div className="project-mini-vision"><Eye /><strong>PathLens</strong><span>Spatial awareness.<br />Greater independence.</span><div className="project-scan" /></div>
      : kind === 'community' ? <div className="project-mini-community"><div><MessageSquare /><strong>Ideas.<br />People.<br />Impact.</strong><small>A space to connect.</small></div><ul><li># discussions</li><li># community</li><li># projects</li><li># resources</li></ul></div>
      : kind === 'security' ? <div className="project-mini-security"><ShieldCheck /><div><strong>Sign in</strong><span>Email</span><span>Password</span><b>Continue →</b></div></div>
      : kind === 'finance' ? <div className="project-mini-finance"><small>YOUR ACCOUNTS</small><strong>PocketTrack</strong><div className="project-chart">▁ ▃ ▅ ▂ ▆ ▄ ▇</div><span>Income · Expenses · Reports</span></div>
      : <div className="project-mini-generic"><Layers /><strong>{kind === 'workflow' ? 'Plan. Focus. Build.' : 'Explore. Analyze. Create.'}</strong><span>Tools for real-world problems</span><div className="project-mini-lines"><i /><i /><i /></div></div>}
    </div>
  </div>
);

export const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState({ start: true, end: false });
  const updatePosition = () => {
    const row = cardsContainerRef.current;
    if (row) setPosition({ start: row.scrollLeft < 2, end: row.scrollLeft + row.clientWidth >= row.scrollWidth - 2 });
  };
  const move = (direction: number) => {
    const row = cardsContainerRef.current;
    if (row) row.scrollBy({ left: direction * (row.firstElementChild?.getBoundingClientRect().width ?? row.clientWidth) + direction * 24, behavior: prefersReducedMotion ? 'instant' : 'smooth' });
  };
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
            toggleActions: 'play none none reset',
          },
        }
      );

      // 2. Grid Cards Entry Animation
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll('.project-showcase-card');
        gsap.fromTo(
          cards,
          { opacity: 0.2, y: 35 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reset',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section id="projects" ref={sectionRef} className="projects-reference">
      <div ref={headerRef} className="projects-heading">
        <div><p className="projects-eyebrow"><span />02 // FEATURED ENGINEERING</p><h2 className="monochrome-gradient-text">PROJECTS</h2></div>
        <p className="projects-description">A showcase of my work in AI/ML, web development, and real-world problem solving. Each project reflects my passion for building meaningful and impactful solutions.</p>
      </div>
      <div className="projects-controls"><span>{githubProjects.length} projects · scroll to explore</span><div><button type="button" onClick={() => move(-1)} disabled={position.start} aria-label="Previous projects">←</button><button type="button" onClick={() => move(1)} disabled={position.end} aria-label="Next projects">→</button></div></div>
      <div ref={cardsContainerRef} className="projects-track" onScroll={updatePosition} tabIndex={0} role="region" aria-label="Projects, scroll horizontally for more" onKeyDown={event => {
        if (event.target !== event.currentTarget) return;
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); }
      }}>
        {githubProjects.map(project => <article key={project.id} className="about-panel project-showcase-card">
          <div className="project-category">{project.category}</div>
          <ProjectPreview kind={project.preview} />
          <h3>{project.title}</h3>
          <p className="project-summary">{project.description}</p>
          <div className="project-tech">{project.techStack.map(tech => <span key={tech}>{tech}</span>)}</div>
          <div className="project-actions">{project.downloadUrl && <div className="project-apk-download"><a className="project-download-button" href={project.downloadUrl}>DOWNLOAD APK <span aria-hidden="true">↓</span></a><p>{project.downloadInfo}</p><small>Development build</small></div>}<a href={project.liveUrl || project.githubUrl} target="_blank" rel="noopener noreferrer">{project.liveUrl ? 'VIEW LIVE' : 'VIEW CODE'}<ArrowRight size={20} /></a>{project.liveUrl && <a className="project-source" href={project.githubUrl} target="_blank" rel="noopener noreferrer">Source code ↗</a>}</div>
        </article>)}
      </div>
      <div className="projects-bottom"><p><span />● MORE TO COME ●<span /></p><p>BUILDING TODAY FOR A SMARTER TOMORROW</p></div>
    </section>
  );
};
