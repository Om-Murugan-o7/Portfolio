import React, { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface NodeParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  pulsePhase: number;
  baseAlpha: number;
}

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let displayW = window.innerWidth || 1280;
    let displayH = window.innerHeight || 800;

    const setupCanvasSize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      displayW = window.innerWidth || 1280;
      displayH = window.innerHeight || 800;

      canvas.width = displayW * dpr;
      canvas.height = displayH * dpr;
      ctx.scale(dpr, dpr);
    };

    setupCanvasSize();

    const isMobile = displayW < 768;
    const nodeCount = isMobile ? 48 : 210; // Organic dense network clusters
    const distantParticleCount = isMobile ? 50 : 200;
    const fgParticleCount = isMobile ? 16 : 60;

    // LAYER 1: Distant Background Particles (Monochrome)
    const distantParticles = Array.from({ length: distantParticleCount }, () => ({
      x: Math.random() * displayW,
      y: Math.random() * displayH * 6,
      radius: Math.random() * 1.6 + 0.5,
      alpha: Math.random() * 0.5 + 0.25,
      speedY: (Math.random() * 0.14 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
    }));

    // LAYER 2: Main Connected Neural Network Nodes (Clustered & Organic)
    const nodes: NodeParticle[] = Array.from({ length: nodeCount }, (_, idx) => {
      // Create organic cluster concentration across multiple viewport heights
      const clusterBias = idx % 3 === 0;
      const x = clusterBias
        ? (Math.random() * 0.7 + 0.15) * displayW
        : Math.random() * displayW;

      return {
        x,
        y: Math.random() * displayH * 6,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.max(1.6, Math.random() * 2.6 + 1.3),
        pulsePhase: Math.random() * Math.PI * 2,
        baseAlpha: Math.random() * 0.7 + 0.45,
      };
    });

    // LAYER 3: Foreground Accent Points
    const fgParticles = Array.from({ length: fgParticleCount }, () => ({
      x: Math.random() * displayW,
      y: Math.random() * displayH * 6,
      radius: Math.random() * 2.6 + 1.6,
      alpha: Math.random() * 0.45 + 0.25,
      speedY: (Math.random() * 0.2 + 0.1) * (Math.random() > 0.5 ? 1 : -1),
    }));

    const handleResize = () => {
      setupCanvasSize();
    };
    window.addEventListener('resize', handleResize);

    let scrollY = window.scrollY || 0;
    const handleScroll = () => {
      scrollY = window.scrollY || 0;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    let time = 0;
    const render = () => {
      try {
        time += 0.012;

        const pageH = Math.max(1, displayH);
        const progress = scrollY / pageH;

        // Continuous section state transitions
        let act = 1.0;
        if (progress > 2.5) {
          act = 1.0; // Calm
        } else if (progress > 1.2) {
          act = 2.0; // Dynamic visual activity
        } else if (progress > 0.35) {
          act = 1.4; // Reorganized network
        }

        const speedMultiplier = prefersReducedMotion ? 0.02 : act * 0.4;

        ctx.clearRect(0, 0, displayW, displayH);

        // 100% Pure Black Background Environment
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, displayW, displayH);

        const wrapHeight = displayH * 2.5;

        // LAYER 1: Distant Background Layer (Parallax: scrollY * -0.08)
        const l1Y = scrollY * -0.08;
        ctx.fillStyle = '#a1a1aa';
        distantParticles.forEach((p) => {
          if (!prefersReducedMotion) {
            p.y += p.speedY * speedMultiplier;
          }
          const renderY = (p.y + l1Y) % wrapHeight;
          const adjY = renderY < 0 ? renderY + wrapHeight : renderY;

          ctx.globalAlpha = p.alpha * 0.5;
          ctx.beginPath();
          ctx.arc(p.x, adjY, Math.max(0.1, p.radius), 0, Math.PI * 2);
          ctx.fill();
        });

        // LAYER 2: Main Connected Monochrome Network Layer (Parallax: scrollY * -0.28)
        const l2Y = scrollY * -0.28;
        const connectDistance = isMobile ? 160 : 240;

        // Draw distance-based crisp monochrome connecting lines
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const n1 = nodes[i];
            const n2 = nodes[j];

            const y1 = (n1.y + l2Y) % wrapHeight;
            const adjY1 = y1 < 0 ? y1 + wrapHeight : y1;
            const y2 = (n2.y + l2Y) % wrapHeight;
            const adjY2 = y2 < 0 ? y2 + wrapHeight : y2;

            const dx = n1.x - n2.x;
            const dy = adjY1 - adjY2;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < connectDistance) {
              const lineAlpha = Math.max(0, (1 - dist / connectDistance) * 0.7);
              ctx.strokeStyle = `rgba(255, 255, 255, ${lineAlpha})`;
              ctx.lineWidth = 1.35;
              ctx.beginPath();
              ctx.moveTo(n1.x, adjY1);
              ctx.lineTo(n2.x, adjY2);
              ctx.stroke();
            }
          }
        }

        // Draw monochrome network nodes
        nodes.forEach((n) => {
          if (!prefersReducedMotion) {
            n.x += n.vx * speedMultiplier;
            n.y += n.vy * speedMultiplier;

            if (n.x < 0 || n.x > displayW) n.vx *= -1;
          }

          const y = (n.y + l2Y) % wrapHeight;
          const adjY = y < 0 ? y + wrapHeight : y;

          const pulse = Math.sin(time * 2 + n.pulsePhase) * 0.3 + 0.7;
          const alpha = Math.max(0, n.baseAlpha * pulse * 0.95);

          // Crisp White Core Point
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = alpha;
          ctx.beginPath();
          ctx.arc(n.x, adjY, Math.max(1.0, n.radius), 0, Math.PI * 2);
          ctx.fill();
        });

        // LAYER 3: Foreground Accent Particles (Parallax: scrollY * -0.55)
        const l3Y = scrollY * -0.55;
        ctx.fillStyle = '#e4e4e7';
        fgParticles.forEach((fp) => {
          if (!prefersReducedMotion) {
            fp.y += fp.speedY * speedMultiplier;
          }
          const y = (fp.y + l3Y) % wrapHeight;
          const adjY = y < 0 ? y + wrapHeight : y;

          ctx.globalAlpha = fp.alpha * 0.45;
          ctx.beginPath();
          ctx.arc(fp.x, adjY, fp.radius, 0, Math.PI * 2);
          ctx.fill();
        });

        ctx.globalAlpha = 1.0;
      } catch (e) {
        // Safe fallback
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0 }}
      aria-hidden="true"
    />
  );
};
