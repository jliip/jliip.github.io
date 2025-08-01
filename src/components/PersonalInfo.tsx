import React from 'react';
import './PersonalInfo.css';
import { type PersonalInfo as PersonalInfoType, defaultPersonalData } from '../data/personalData';
import { useGitHubAvatar } from '../hooks/useGitHubAvatar';

type PersonalInfoProps = Partial<PersonalInfoType>;

const PersonalInfo: React.FC<PersonalInfoProps> = (props) => {
  // 合并传入的props和默认数据
  const data: PersonalInfoType = {
    ...defaultPersonalData,
    ...props,
    socialLinks: {
      ...defaultPersonalData.socialLinks,
      ...props.socialLinks
    }
  };

  const {
    name,
    title,
    email,
    location,
    avatarUrl: fallbackAvatarUrl,
    bio,
    socialLinks
  } = data;

  // 使用GitHub头像Hook
  const { avatarUrl, loading } = useGitHubAvatar(
    socialLinks.github,
    fallbackAvatarUrl
  );

  return (
    <div className="personal-info">
      <div className="avatar-container">
        <img 
          src={avatarUrl} 
          alt={`${name}'s avatar`}
          className={`avatar ${loading ? 'loading' : ''}`}
          onError={(e) => {
            // 如果GitHub头像加载失败，回退到默认头像
            const target = e.target as HTMLImageElement;
            if (target.src !== fallbackAvatarUrl) {
              target.src = fallbackAvatarUrl || '';
            }
          }}
        />
        {loading && <div className="avatar-loading">加载中...</div>}
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
