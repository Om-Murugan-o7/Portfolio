import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, GraduationCap, Award, Briefcase, BookOpen, CheckCircle2, Code, Shield } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MagneticButton } from './MagneticButton';

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

      // 6. Certifications & Achievements Reveal
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

  // Handle Resume Download / View
  const handleDownloadResume = () => {
    const resumeWindow = window.open('', '_blank');
    if (!resumeWindow) return;

    resumeWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Resume - ${portfolioData.personal.name}</title>
          <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            h1 { color: #0f172a; margin-bottom: 4px; border-bottom: 2px solid #18181b; padding-bottom: 8px; }
            .subtitle { font-weight: 600; color: #52525b; margin-top: 0; }
            .contact-info { font-size: 0.9rem; color: #475569; margin-bottom: 24px; }
            h2 { color: #0f172a; font-size: 1.2rem; border-bottom: 1px solid #cbd5e1; padding-bottom: 4px; margin-top: 24px; }
            ul { padding-left: 20px; }
            li { margin-bottom: 6px; }
            .item-title { font-weight: bold; }
            .item-sub { color: #64748b; font-size: 0.9rem; }
          </style>
        </head>
        <body>
          <h1>${portfolioData.personal.name}</h1>
          <p className="subtitle">3rd Year B.Tech Undergraduate — Artificial Intelligence & Machine Learning</p>
          <p className="contact-info">Email: ${portfolioData.socialLinks.email} | GitHub: @${portfolioData.socialLinks.githubUsername}</p>

          <h2>Education</h2>
          ${portfolioData.education.map(e => `
            <div>
              <p className="item-title">${e.institution}</p>
              <p className="item-sub">${e.degree} in ${e.field} (${e.period})</p>
            </div>
          `).join('')}

          <h2>Core Skills</h2>
          <p>${portfolioData.skills.map(s => s.skills.join(', ')).join(', ')}</p>

          <h2>Certifications</h2>
          <ul>
            ${portfolioData.certifications.map(c => `<li>${c.title}</li>`).join('')}
          </ul>

          <h2>Achievements</h2>
          <ul>
            ${portfolioData.achievements.map(a => `<li><strong>${a.title}:</strong> ${a.subtitle}</li>`).join('')}
          </ul>
        </body>
      </html>
    `);
    resumeWindow.document.close();
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-[220vh] py-32 md:py-48 lg:py-60 z-10"
    >
      <div className="site-container space-y-36 md:space-y-52 lg:space-y-64">
        {/* 1. Header (Label -> Heading spacing 16px, Heading -> Content spacing 56px) */}
        <div ref={headerRef} className="space-y-4 mb-6 md:mb-10">
          <div className="flex items-center space-x-3">
            <span className="mono-tag text-white font-semibold">01 //</span>
            <span className="mono-tag text-zinc-400">BACKGROUND & EXPERTISE</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] font-display">
            <span className="monochrome-gradient-text">ABOUT ME</span>
          </h2>
        </div>

        {/* 2. Editorial Bio & Resume Download */}
        <div ref={bioRef} className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start pt-2">
          <div className="lg:col-span-8 space-y-6 glass-card p-8 sm:p-10 md:p-12 border border-zinc-800 bg-zinc-950/80">
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-white shrink-0" />
              <span className="font-display">Undergraduate Developer & AI Enthusiast</span>
            </h3>
            <p className="text-zinc-300 text-base md:text-lg leading-[1.75] max-w-[750px]">
              I am currently a 3rd Year B.Tech student concentrating in Artificial Intelligence and Machine Learning at{' '}
              <strong className="text-white font-semibold">St. Joseph's College of Engineering, Chennai</strong>.
            </p>
            <p className="text-zinc-300 text-base md:text-lg leading-[1.75] max-w-[750px]">
              My journey centers around developing intelligent computer vision algorithms, machine learning predictive models, and high-performance software tools. I approach engineering with a focus on problem-solving, clean logic, and continuous learning.
            </p>
            <div className="pt-4 flex flex-wrap gap-3">
              {portfolioData.spokenLanguages.map((lang, idx) => (
                <span key={idx} className="mono-tag text-xs bg-zinc-900 border border-zinc-800 px-4 py-2 rounded-full text-zinc-300">
                  Spoken: {lang}
                </span>
              ))}
              {portfolioData.coreCompetencies.map((comp, idx) => (
                <span key={idx} className="mono-tag text-xs bg-zinc-800/80 border border-zinc-700 px-4 py-2 rounded-full text-white">
                  {comp}
                </span>
              ))}
            </div>
          </div>

          {/* Resume Download Card */}
          <div className="lg:col-span-4 glass-card p-8 sm:p-10 border border-zinc-800 bg-zinc-950/80 flex flex-col justify-between space-y-8 min-h-[320px]">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-white">
                <Download className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white font-display">Curriculum Vitae</h4>
              <p className="text-sm text-zinc-400 leading-[1.6]">
                Download or view my complete official resume detailing my academic records, projects, and skill matrix.
              </p>
            </div>

            <MagneticButton
              onClick={handleDownloadResume}
              className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm tracking-wide flex items-center justify-center space-x-2.5 hover:bg-zinc-200 transition-colors duration-300 shadow-lg"
            >
              <Download className="w-4 h-4" />
              <span>VIEW / DOWNLOAD RESUME</span>
            </MagneticButton>
          </div>
        </div>

        {/* 3. Education Timeline */}
        <div className="pt-20 md:pt-28 lg:pt-32 mt-12 md:mt-16 border-t border-zinc-800/60 space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-10 md:mb-14">
            <GraduationCap className="w-7 h-7 text-white shrink-0" />
            <span className="font-display">Education</span>
          </h3>

          <div ref={eduRef} className="relative pl-6 md:pl-10 border-l-2 border-zinc-800 space-y-14">
            {portfolioData.education.map((item, idx) => (
              <div key={idx} className="edu-item relative space-y-4 group">
                {/* Timeline Dot */}
                <span className="absolute -left-[31px] md:-left-[43px] top-1.5 w-4 h-4 rounded-full bg-black border-2 border-white group-hover:scale-125 group-hover:bg-white transition-all duration-300" />

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <h4 className="text-lg md:text-xl font-bold text-white transition-colors">
                    {item.institution}
                  </h4>
                  <span className="mono-tag text-xs bg-zinc-900 border border-zinc-800 px-3.5 py-1.5 rounded-full text-zinc-300">
                    {item.period}
                  </span>
                </div>

                <p className="text-base font-medium text-white leading-[1.6]">
                  {item.degree} — <span className="text-zinc-400">{item.field}</span>
                </p>
                <p className="text-xs font-mono text-zinc-400 leading-[1.5]">Location: {item.location}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Skills Matrix */}
        <div className="pt-20 md:pt-28 lg:pt-32 mt-12 md:mt-16 border-t border-zinc-800/60 space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-10 md:mb-14">
            <Code className="w-7 h-7 text-white shrink-0" />
            <span className="font-display">Technical Skills</span>
          </h3>

          <div ref={skillsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {portfolioData.skills.map((category, idx) => (
              <div key={idx} className="skill-category glass-card p-8 md:p-10 border border-zinc-800 bg-zinc-950/80 space-y-6">
                <h4 className="mono-tag text-xs font-bold text-white tracking-widest border-b border-zinc-800 pb-4">
                  {category.title}
                </h4>
                <div className="flex flex-wrap gap-3 pt-1">
                  {category.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-200 text-sm font-medium hover:border-zinc-500 hover:text-white transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Internships & Experience */}
        <div className="pt-20 md:pt-28 lg:pt-32 mt-12 md:mt-16 border-t border-zinc-800/60 space-y-12">
          <h3 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3 mb-10 md:mb-14">
            <Briefcase className="w-7 h-7 text-white shrink-0" />
            <span className="font-display">Internships & Training</span>
          </h3>

          <div ref={expRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {portfolioData.experience.map((exp) => (
              <div key={exp.id} className="exp-card glass-card p-8 md:p-10 border border-zinc-800 bg-zinc-950/80 space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="mono-tag text-xs text-white bg-zinc-900 border border-zinc-700 px-3.5 py-1.5 rounded-md inline-block">
                    {exp.roleType}
                  </span>
                  <h4 className="text-lg font-bold text-white leading-snug">{exp.title}</h4>
                </div>

                <div className="pt-5 border-t border-zinc-800 flex items-center justify-between">
                  <span className="text-sm font-medium text-zinc-400">Company:</span>
                  <span className="text-sm font-semibold text-white">{exp.company}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Certifications & Achievements */}
        <div className="pt-20 md:pt-28 lg:pt-32 mt-12 md:mt-16 border-t border-zinc-800/60 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Certifications */}
          <div className="lg:col-span-5 space-y-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8 md:mb-12">
              <Award className="w-6 h-6 text-white shrink-0" />
              <span className="font-display">Certifications</span>
            </h3>

            <div className="space-y-6">
              {portfolioData.certifications.map((cert, idx) => (
                <div key={idx} className="glass-card p-6 md:p-8 border border-zinc-800 bg-zinc-950/80 flex items-center space-x-4">
                  <CheckCircle2 className="w-6 h-6 text-white shrink-0" />
                  <div>
                    <h4 className="text-base font-bold text-white">{cert.title}</h4>
                    <p className="text-xs font-mono text-zinc-400 mt-1">Verified Technical Credential</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Visual Grid */}
          <div className="lg:col-span-7 space-y-10">
            <h3 className="text-2xl font-bold text-white flex items-center gap-3 mb-8 md:mb-12">
              <Shield className="w-6 h-6 text-white shrink-0" />
              <span className="font-display">Key Achievements</span>
            </h3>

            <div ref={achRef} className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
              {portfolioData.achievements.map((ach) => (
                <div key={ach.id} className="ach-card glass-card p-6 sm:p-8 border border-zinc-800 bg-zinc-950/80 space-y-4 hover:border-zinc-500 transition-colors">
                  <span className="font-extrabold text-3xl sm:text-4xl text-white leading-none tracking-tight">
                    {ach.number}
                  </span>
                  <h4 className="text-xs sm:text-sm font-extrabold tracking-wider text-white uppercase">
                    {ach.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-[1.5]">{ach.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
