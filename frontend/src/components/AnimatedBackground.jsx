import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animId;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 80 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.2,
      hue: i < 40 ? 230 + Math.random() * 30 : 270 + Math.random() * 30,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      t += 0.008;

      // Left wave cluster (blue)
      for (let i = 0; i < 4; i++) {
        const waveY = canvas.height * 0.5 + Math.sin(t + i * 1.2) * 120;
        const waveX = canvas.width * 0.15 + Math.cos(t * 0.7 + i) * 60;
        const grad = ctx.createRadialGradient(waveX, waveY, 0, waveX, waveY, 280 - i * 40);
        grad.addColorStop(0, `rgba(79, 91, 255, ${0.18 - i * 0.03})`);
        grad.addColorStop(0.5, `rgba(99, 102, 241, ${0.08 - i * 0.015})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(waveX, waveY, 280 - i * 40, 200 - i * 30, Math.sin(t * 0.3) * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flowing wave lines (left side)
      for (let w = 0; w < 5; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(79, 91, 255, ${0.12 - w * 0.02})`;
        ctx.lineWidth = 1.5 - w * 0.2;
        for (let x = 0; x < canvas.width * 0.55; x += 4) {
          const y = canvas.height * (0.3 + w * 0.12)
            + Math.sin(x * 0.008 + t + w) * 50
            + Math.cos(x * 0.005 + t * 0.7) * 30;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Right wave cluster (purple)
      for (let i = 0; i < 3; i++) {
        const waveY = canvas.height * 0.45 + Math.sin(t * 0.8 + i * 1.5) * 100;
        const waveX = canvas.width * 0.82 + Math.cos(t * 0.6 + i * 0.8) * 50;
        const grad = ctx.createRadialGradient(waveX, waveY, 0, waveX, waveY, 250 - i * 50);
        grad.addColorStop(0, `rgba(147, 51, 234, ${0.2 - i * 0.04})`);
        grad.addColorStop(0.5, `rgba(124, 58, 237, ${0.08 - i * 0.02})`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(waveX, waveY, 250 - i * 50, 180 - i * 30, Math.cos(t * 0.4) * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Flowing wave lines (right side)
      for (let w = 0; w < 4; w++) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(147, 51, 234, ${0.1 - w * 0.02})`;
        ctx.lineWidth = 1.2;
        for (let x = canvas.width * 0.5; x < canvas.width + 20; x += 4) {
          const y = canvas.height * (0.35 + w * 0.12)
            + Math.sin(x * 0.007 - t + w * 0.8) * 55
            + Math.cos(x * 0.004 - t * 0.6) * 25;
          if (x === Math.ceil(canvas.width * 0.5)) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      // Particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        const osc = Math.sin(t * 2 + p.x * 0.01) * 0.2 + p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${Math.max(0, osc)})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default AnimatedBackground;
