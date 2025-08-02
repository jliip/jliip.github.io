import React from 'react';
import './PersonalInfo.css';
import { personalData } from '../data/personalData';

const PersonalInfo: React.FC = () => {
  const {
    name,
    title,
    email,
    location,
    avatarUrl,
    bio,
    socialLinks
  } = personalData;

  return (
    <div className="personal-info">
      <div className="avatar-container">
        <img 
          src={avatarUrl} 
          alt={`${name}'s avatar`}
          className="avatar"
          onError={(e) => {
            // 如果头像加载失败，使用默认头像
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/200x200/4f46e5/ffffff?text=' + name.charAt(0);
          }}
        />
      </div>
      
      <div className="basic-info">
        <h1 className="name">{name}</h1>
        <h2 className="title">{title}</h2>
        <p className="bio">{bio}</p>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <a href={`mailto:${email}`} className="contact-link">
            {email}
          </a>
        </div>
        
        <div className="contact-item">
          <span className="contact-text">{location}</span>
        </div>
      </div>

      <div className="social-links">
        {socialLinks.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
            GitHub
          </a>
        )}
        
        {socialLinks.openreview && (
          <a href={socialLinks.openreview} target="_blank" rel="noopener noreferrer" className="social-link">
            OpenReview
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
