import React, { useRef, useEffect } from 'react';

//StarryBackground comes from https://codepen.io/LeonGr/pen/QWmRyw with some minor modifications to color, fps, etc.

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const FPS = 5;

    for (let i = 0; i < canvas.width; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random(),
        vx: Math.floor(Math.random() * 10) - 5,
        vy: Math.floor(Math.random() * 10) - 5
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = 'lighter';

      for (let i = 0, x = stars.length; i < x; i++) {
        const s = stars[i];

        ctx.fillStyle = Math.random() > 0.5 ? '#424bad' : '#ad4242'
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
        ctx.fill();
      }
    };

    const update = () => {
      for (let i = 0, x = stars.length; i < x; i++) {
        const s = stars[i];

        s.x += s.vx / FPS;
        s.y += s.vy / FPS;

        if (s.x < 0 || s.x > canvas.width) s.x = -s.x;
        if (s.y < 0 || s.y > canvas.height) s.y = -s.y;
      }
    };

    const tick = () => {
      draw();
      update();
      requestAnimationFrame(tick);
    };

    tick();

    // Cleanup
    return () => cancelAnimationFrame(tick);
  }, []); // Empty dependency array ensures useEffect runs once on mount

  return <canvas ref={canvasRef} style={{ background: '#111' }} />;
};

export default StarryBackground;
