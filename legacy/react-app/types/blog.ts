// 博客相关类型定义
export interface BlogMetadata {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readTime: number; // 预估阅读时间（分钟）
  featured: boolean;
  slug: string; // URL友好的标识符
  originalUrl?: string; // 原文链接（如CSDN链接）
}

export interface BlogPost extends BlogMetadata {
  content: string; // Markdown内容
  lastModified?: string;
}

// 博客列表项（用于列表页面，不包含完整内容）
export type BlogListItem = BlogMetadata;
