import React from 'react';
import './PersonalInfo.css';

interface PersonalInfoProps {
  name?: string;
  title?: string;
  email?: string;
  phone?: string;
  location?: string;
  avatarUrl?: string;
  bio?: string;
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    scholar?: string;
  };
}

const PersonalInfo: React.FC<PersonalInfoProps> = ({
  name = "Your Name",
  title = "Software Engineer & Researcher",
  email = "your.email@example.com",
  phone = "+1 (555) 123-4567",
  location = "San Francisco, CA",
  avatarUrl = "https://via.placeholder.com/150",
  bio = "Welcome to my personal website. I'm passionate about technology, research, and innovation.",
  socialLinks = {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    twitter: "https://twitter.com/yourusername",
    scholar: "https://scholar.google.com/citations?user=youruserid"
  }
}) => {
  return (
    <div className="personal-info">
      <div className="avatar-container">
        <img 
          src={avatarUrl} 
          alt={`${name}'s avatar`}
          className="avatar"
        />
      </div>
      
      <div className="basic-info">
        <h1 className="name">{name}</h1>
        <h2 className="title">{title}</h2>
        <p className="bio">{bio}</p>
      </div>

      <div className="contact-info">
        <div className="contact-item">
          <span className="icon">📧</span>
          <a href={`mailto:${email}`} className="contact-link">
            {email}
          </a>
        </div>
        
        <div className="contact-item">
          <span className="icon">📱</span>
          <a href={`tel:${phone}`} className="contact-link">
            {phone}
          </a>
        </div>
        
        <div className="contact-item">
          <span className="icon">📍</span>
          <span className="contact-text">{location}</span>
        </div>
      </div>

      <div className="social-links">
        {socialLinks.github && (
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">💻</span>
            GitHub
          </a>
        )}
        
        {socialLinks.linkedin && (
          <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">💼</span>
            LinkedIn
          </a>
        )}
        
        {socialLinks.twitter && (
          <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">🐦</span>
            Twitter
          </a>
        )}
        
        {socialLinks.scholar && (
          <a href={socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="social-link">
            <span className="social-icon">🎓</span>
            Scholar
          </a>
        )}
      </div>
    </div>
  );
};

export default PersonalInfo;
