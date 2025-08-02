// 个人信息类型定义
export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  location: string;
  avatarUrl?: string;
  bio: string;
  socialLinks: {
    github?: string;
    openreview?: string;
  };
}

// 个人信息数据
export const personalData: PersonalInfo = {
  name: "jliip",
  title: "UG Student",
  email: "jliip@connect.ust.hk",
  location: "Hong Kong / Shenzhen",
  avatarUrl: "https://github.com/jliip.png?size=200", // 直接使用GitHub头像URL
  bio: "Welcome to my personal website.",
  socialLinks: {
    github: "https://github.com/jliip",
    openreview: "https://openreview.net/profile?id=~Jiayun_Li1"
  }
};

// 默认个人信息（用作备用）
export const defaultPersonalData: PersonalInfo = {
  name: "Your Name",
  title: "Software Engineer & Researcher",
  email: "your.email@example.com",
  location: "San Francisco, CA",
  avatarUrl: "https://via.placeholder.com/150",
  bio: "Welcome to my personal website. I'm passionate about technology, research, and innovation.",
  socialLinks: {
    github: "https://github.com/yourusername",
    openreview: "https://openreview.net/profile?id=~Your_Name"
  }
};