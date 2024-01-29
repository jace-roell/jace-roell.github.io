// Assuming this is in a functional component
import React, { useEffect } from 'react';

const Stars = () => {
  useEffect(() => {
    const starsContainer = document.querySelector(".stars-container");

    function createStar() {
      const star = document.createElement("div");
      star.className = "star";
      starsContainer.appendChild(star);

      const size = Math.random() * 3;
      const duration = Math.random() * 5 + 5;
      const delay = Math.random() * 5;
      const top = Math.random() * 100;
      const left = Math.random() * 100;

      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.animation = `moveStar ${duration}s infinite linear ${delay}s`;
      star.style.top = `${top}%`;
      star.style.left = `${left}%`;
    }

    function createStars() {
      for (let i = 0; i < 50; i++) {
        createStar();
      }
    }

    createStars();
  }, []); // Empty dependency array ensures the effect runs once on mount

  return <div className="stars-container" />;
};

export default Stars;
