import React from 'react';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative bg-black text-white min-h-screen selection:bg-white/20 selection:text-white">
      {/* Canvas Layer */}
      <AnimatedBackground />

      {/* Navigation Header */}
      <Navbar />

      {/* Main Single Page Continuous Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>

      {/* Minimal Footer */}
      <Footer />
    </div>
  );
};

export default App;
