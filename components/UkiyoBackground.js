"use client";

export default function UkiyoBackground() {
  return (
    <div className="ukiyo-background" aria-hidden="true">
      <div className="ukiyo-sky-waves" />
      <svg
        className="ukiyo-waves"
        viewBox="0 0 1440 280"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1B365D"
          d="M0,160 C180,120 360,200 540,150 C720,100 900,180 1080,140 C1260,100 1350,130 1440,150 L1440,280 L0,280 Z"
        />
        <path
          fill="#1B365D"
          opacity="0.85"
          d="M0,200 C200,170 400,230 600,190 C800,150 1000,220 1200,180 C1320,160 1380,175 1440,185 L1440,280 L0,280 Z"
        />
        <path
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="2.5"
          strokeLinecap="round"
          d="M0,155 C200,115 400,195 600,145 C800,95 1000,175 1200,135 C1320,110 1380,125 1440,140"
        />
        <path
          fill="none"
          stroke="#FFFDF8"
          strokeWidth="1.5"
          strokeLinecap="round"
          opacity="0.7"
          d="M0,195 C220,165 440,225 660,185 C880,145 1100,215 1320,175 C1380,165 1410,172 1440,178"
        />
      </svg>
      <div className="ukiyo-grain" />
    </div>
  );
}
