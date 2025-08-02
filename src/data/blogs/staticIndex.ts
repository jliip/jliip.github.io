// 静态博客数据索引 - 移除所有动态导入
import { type BlogListItem } from '../../types/blog';

// 静态导入所有博客元数据
import { metadata as gettingStartedMetadata } from './getting-started-react-typescript/metadata';
import { metadata as responsiveWebMetadata } from './responsive-web-applications/metadata';
import { metadata as rdkX5Metadata } from './rdk-x5-tutorial/metadata';

// 静态导入所有博客内容
import gettingStartedContent from './getting-started-react-typescript/content.md?raw';
import responsiveWebContent from './responsive-web-applications/content.md?raw';
import rdkX5Content from './rdk-x5-tutorial/content.md?raw';

// 博客内容映射
const blogContents: Record<string, string> = {
  'getting-started-react-typescript': gettingStartedContent,
  'responsive-web-applications': responsiveWebContent,
  'rdk-x5-tutorial': rdkX5Content
};

// 博客元数据映射
const blogMetadatas: Record<string, BlogListItem> = {
  'getting-started-react-typescript': gettingStartedMetadata,
  'responsive-web-applications': responsiveWebMetadata,
  'rdk-x5-tutorial': rdkX5Metadata
};

// 静态博客内容加载函数（无需async）
export const loadBlogContent = (slug: string): string => {
  return blogContents[slug] || 'Content not found';
};

// 静态博客元数据获取函数（无需async）
export const getBlogMetadata = (slug: string): BlogListItem | null => {
  return blogMetadatas[slug] || null;
};

// 导出所有博客的函数（无需async）
export const getAllBlogs = (): BlogListItem[] => {
  return Object.values(blogMetadatas)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 获取特色博客的函数（无需async）
export const getFeaturedBlogs = (): BlogListItem[] => {
  return getAllBlogs().filter(blog => blog.featured);
};

// 根据标签筛选博客的函数（无需async）
export const getBlogsByTag = (tag: string): BlogListItem[] => {
  return getAllBlogs().filter(blog => blog.tags.includes(tag));
};
