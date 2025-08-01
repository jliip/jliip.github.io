// 示例博客数据索引文件
import { type BlogListItem } from '../../types/blog';

export const blogIndex: BlogListItem[] = [
  {
    id: 'getting-started-react-typescript',
    title: 'Getting Started with React and TypeScript',
    excerpt: 'Learn how to set up a modern React project with TypeScript and best practices.',
    date: '2024-01-15',
    tags: ['React', 'TypeScript', 'Frontend'],
    author: 'Li Jiayun',
    readTime: 8,
    featured: true,
    slug: 'getting-started-react-typescript'
  },
  {
    id: 'responsive-web-applications',
    title: 'Building Responsive Web Applications',
    excerpt: 'Tips and techniques for creating web applications that work on all devices.',
    date: '2024-01-10',
    tags: ['CSS', 'Responsive', 'Web Design'],
    author: 'Li Jiayun',
    readTime: 6,
    featured: false,
    slug: 'responsive-web-applications'
  }
];

// 动态导入博客内容的函数
export const loadBlogContent = async (slug: string): Promise<string> => {
  try {
    const module = await import(`./${slug}/content.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return '';
  }
};

// 获取博客元数据的函数
export const getBlogMetadata = async (slug: string) => {
  try {
    const module = await import(`./${slug}/metadata`);
    return module.metadata;
  } catch (error) {
    console.error(`Failed to load blog metadata for ${slug}:`, error);
    return null;
  }
};

// 导出所有博客的函数
export const getAllBlogs = (): BlogListItem[] => {
  return blogIndex.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 获取特色博客的函数
export const getFeaturedBlogs = (): BlogListItem[] => {
  return blogIndex.filter(blog => blog.featured);
};

// 根据标签筛选博客的函数
export const getBlogsByTag = (tag: string): BlogListItem[] => {
  return blogIndex.filter(blog => blog.tags.includes(tag));
};
