// ProjectEntry.jsx

import React from 'react';
import './projectEntry.css';

const ProjectEntry = ({ imageUrl, name, description, learnMoreHref, liveAppHref, technologies }) => {
  return (
    <div className="project-entry">
      <div className="sub-header-container">
        <div className="project-header">
          <h2>{name}</h2>
          <p className="technologies">{technologies}</p>
        </div>
        <div className="project-info">
        <p>{description}</p>
      </div>
        <div className="buttons-container">
          <a
            href={liveAppHref || "/#"}
            target="_blank"
            rel="noopener noreferrer"
            className="try-now-btn"
          >
            Try it now!
          </a>
          <a
            href={learnMoreHref}
            target="_blank"
            rel="noopener noreferrer"
            className="learn-more-btn"
          >
            Learn more
          </a>
        </div>

      </div>
      <div className="reference-image-container">
        <img
          src={imageUrl}
          alt={`Image for ${name}`}
          className="reference-image"
        />
      </div>
    </div>
  );
};

export default ProjectEntry;
