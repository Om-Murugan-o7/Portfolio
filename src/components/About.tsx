import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Code, Shield, ArrowRight, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { GithubIcon, LinkedinIcon } from './SocialIcons';

gsap.registerPlugin(ScrollTrigger);

export const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const bioRef = useRef<HTMLDivElement | null>(null);
  const eduRef = useRef<HTMLDivElement | null>(null);
  const skillsRef = useRef<HTMLDivElement | null>(null);
  const expRef = useRef<HTMLDivElement | null>(null);
  const achRef = useRef<HTMLDivElement | null>(null);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal
      gsap.fromTo(headerRef.current, { opacity: 0.2, y: 35 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 82%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // 2. Bio Reveal
      gsap.fromTo(bioRef.current, { opacity: 0.2, y: 35 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: bioRef.current,
          start: 'top 82%',
          toggleActions: 'play reverse play reverse',
        },
      });

      // 3. Education Timeline Reveal
      if (eduRef.current) {
        const items = eduRef.current.querySelectorAll('.edu-item');
        gsap.fromTo(items, { opacity: 0.2, x: -25 }, {
          opacity: 1,
          x: 0,
          duration: 0.75,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: eduRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }

      // 4. Skills Stagger Reveal
      if (skillsRef.current) {
        const categories = skillsRef.current.querySelectorAll('.skill-category');
        gsap.fromTo(categories, { opacity: 0.2, y: 35 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }

      // 5. Internships / Experience Reveal
      if (expRef.current) {
        const expCards = expRef.current.querySelectorAll('.exp-card');
        gsap.fromTo(expCards, { opacity: 0.2, y: 35 }, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: expRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }

      // 7. Achievements Reveal
      if (achRef.current) {
        const achCards = achRef.current.querySelectorAll('.ach-card');
        gsap.fromTo(achCards, { opacity: 0.2, scale: 0.94, y: 25 }, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: achRef.current,
            start: 'top 80%',
            toggleActions: 'play reverse play reverse',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const focus = ['Problem Solving', 'Continuous Learning', 'Real-world Impact', 'Open Source', 'Innovation', 'Collaboration'];
  const skills = [...new Set(portfolioData.skills.flatMap(category => category.skills))];
  const education = portfolioData.education.find(item => item.isCurrent) ?? portfolioData.education[0];
  const { socialLinks } = portfolioData;

  return (
    <section id="about" ref={sectionRef} className="about-reference">
      <div className="about-layout">
        <div className="about-intro">
          <div ref={headerRef}>
            <p className="about-eyebrow"><span />01 // ABOUT ME</p>
            <h2 className="about-title monochrome-gradient-text">ABOUT ME</h2>
            <p className="about-subtitle">Undergraduate Developer &amp; AI Enthusiast</p>
          </div>
          <div ref={bioRef}>
            <p className="about-description">I'm a 3rd year undergraduate passionate about building intelligent solutions through Artificial Intelligence, Machine Learning, and full-stack development. I love turning ideas into real-world applications that create meaningful impact.</p>
            <div className="about-stats">
              <div><strong>3+</strong><span>YEARS OF<br />LEARNING</span></div>
              <div><strong>5+</strong><span>PROJECTS<br />BUILT</span></div>
              <div><strong>2+</strong><span>TECH AREAS<br />EXPLORING</span></div>
            </div>
            <div className="about-focus">
              <h3><Shield aria-hidden="true" />MY FOCUS</h3>
              <div className="about-tags">{focus.map(item => <span key={item}>{item}</span>)}</div>
            </div>
            <a href="#contact" className="about-connect" onClick={event => {
              event.preventDefault();
              gsap.to(window, { duration: prefersReducedMotion ? 0 : 1.1, scrollTo: { y: '#contact', offsetY: 80 }, ease: 'power3.inOut' });
            }}>LET'S CONNECT <ArrowRight size={23} /></a>
          </div>
        </div>
        <div className="about-panels">
          <article ref={eduRef} className="about-panel about-education">
            <h3><GraduationCap aria-hidden="true" />EDUCATION</h3>
            <div className="edu-item about-panel-body">
              <p>{education.degree} in {education.field} ({education.period})</p>
              <p className="about-school">{education.institution}<br />{education.location}</p>
              <details className="about-earlier"><summary>Earlier education</summary>{portfolioData.education.filter(item => item !== education).map(item => <p key={item.institution}>{item.institution} — {item.degree}<br />{item.location} · {item.period}</p>)}</details>
            </div>
          </article>
          <article ref={skillsRef} className="about-panel about-skills">
            <h3><Code aria-hidden="true" />TECHNICAL SKILLS</h3>
            <div className="skill-category about-tags about-panel-body">{skills.map(skill => <span key={skill}>{skill}</span>)}</div>
          </article>
          <article ref={expRef} className="about-panel about-experience">
            <h3><Briefcase aria-hidden="true" />INTERNSHIPS &amp; TRAINING</h3>
            <ul className="about-panel-body">{portfolioData.experience.map(exp => <li className="exp-card" key={exp.id}>{exp.title}<span className="about-company">{exp.company}</span></li>)}</ul>
          </article>
          <article ref={achRef} className="about-panel about-achievements">
            <h3><Shield aria-hidden="true" />KEY ACHIEVEMENTS</h3>
            <div className="about-achievement-grid">{portfolioData.achievements.map(item => <div className="ach-card" key={item.id}><h4>{item.number} · {item.title}</h4><p>{item.subtitle}</p></div>)}</div>
          </article>
        </div>
      </div>
      <div className="home-bottom about-bottom">
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
