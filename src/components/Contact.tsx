import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, ArrowRight, ArrowUpRight } from 'lucide-react';
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
  const [submitted, setSubmitted] = useState(false);

  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // One section trigger keeps the reveal in sync, including anchor jumps.
      // The title inherits its parent's animation rather than fading twice.
      const reveal = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reset',
          invalidateOnRefresh: true,
        },
      });

      reveal
        .fromTo(headerRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.85 })
        .fromTo(socialsRef.current,
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.75 }, 0.15)
        .fromTo(formRef.current,
          { opacity: 0, y: 45 },
          { opacity: 1, y: 0, duration: 0.85 }, 0.2)
        .fromTo('.contact-aside > *',
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.12 }, 0.3);
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = formData.subject || 'Portfolio enquiry';
    const body = `${formData.message}\n\nFrom: ${formData.name}\nEmail: ${formData.email}`;
    window.location.href = `mailto:${portfolioData.socialLinks.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  const { socialLinks } = portfolioData;
  const links = [
    { label: 'EMAIL', text: socialLinks.email, href: `mailto:${socialLinks.email}`, icon: <Mail /> },
    { label: 'LINKEDIN', text: `linkedin.com/in/${socialLinks.linkedinUsername}`, href: socialLinks.linkedin, icon: <LinkedinIcon /> },
    { label: 'GITHUB', text: `github.com/${socialLinks.githubUsername}`, href: socialLinks.github, icon: <GithubIcon /> },
  ];
  const together = [
    { title: 'IDEAS', text: 'Turn ideas into real solutions' },
    { title: 'COLLABORATE', text: 'Work on meaningful projects' },
    { title: 'LEARN', text: 'Share knowledge and grow together' },
    { title: 'CREATE', text: 'Build innovative and impactful solutions' },
  ];

  return (
    <section id="contact" ref={sectionRef} className="contact-reference">
      <div className="contact-layout">
        <div className="contact-intro">
          <div ref={headerRef}>
            <p className="about-eyebrow"><span />04 // GET IN TOUCH</p>
            <h2 ref={titleRef} className="contact-title monochrome-gradient-text">LET’S<br />CONNECT</h2>
            <p className="contact-description">Have a project idea, collaboration opportunity, or just want to say hi? I'm always open to meaningful conversations about technology, AI/ML, and building impactful solutions.</p>
          </div>
          <div ref={socialsRef} className="contact-cards">
            {links.map(link => <a key={link.label} href={link.href} target={link.label === 'EMAIL' ? undefined : '_blank'} rel={link.label === 'EMAIL' ? undefined : 'noopener noreferrer'} className="about-panel contact-card">
              <span className="contact-card-icon">{link.icon}</span>
              <span className="contact-card-copy"><strong>{link.label}</strong><span>{link.text}</span></span>
              <ArrowUpRight className="contact-card-arrow" />
            </a>)}
          </div>
        </div>
        <form ref={formRef} onSubmit={handleSubmit} className="about-panel contact-form">
          <div className="contact-form-heading"><Mail /><div><h3>Send a Message</h3><p>I'll get back to you as soon as possible.</p></div></div>
          <div className="contact-fields">
            <label htmlFor="name">Name<input id="name" name="name" autoComplete="name" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Your name" /></label>
            <label htmlFor="email">Email<input id="email" name="email" type="email" autoComplete="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="your.email@example.com" /></label>
            <label htmlFor="subject">Subject<input id="subject" name="subject" value={formData.subject} onChange={e => setFormData({ ...formData, subject: e.target.value })} placeholder="Project Collaboration" /></label>
            <label htmlFor="message">Message<textarea id="message" name="message" required rows={4} value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} placeholder="Tell me about your project, idea, or just say hi..." /></label>
          </div>
          {submitted && <p className="contact-form-status" role="status">Continue in your email app to send your message.</p>}
          <MagneticButton type="submit" className="contact-submit">Send Message <ArrowRight /></MagneticButton>
        </form>
        <aside className="contact-aside">
          <div className="contact-corner-panel">
            <h3>LET'S BUILD TOGETHER</h3>
            <div className="contact-together">{together.map(item => <div key={item.title}><h4>{item.title}</h4><p>{item.text}</p></div>)}</div>
          </div>
          <div className="contact-corner-panel contact-opportunities">
            <h3>OPEN TO OPPORTUNITIES</h3>
            <ul>{['Full-time Roles', 'Internships', 'Collaborations', 'Research & Open Source'].map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="contact-stats">{[{number:'3+',label:<>YEARS OF<br />LEARNING</>},{number:'5+',label:<>PROJECTS<br />BUILT</>},{number:'2+',label:<>TECH AREAS<br />EXPLORING</>}].map(item => <div className="about-panel" key={item.number}><strong>{item.number}</strong><span>{item.label}</span></div>)}</div>
        </aside>
      </div>
      <div className="home-bottom contact-bottom">
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
