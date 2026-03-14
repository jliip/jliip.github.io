// 博客数据索引文件 - 使用文件夹结构
import { type BlogListItem } from '../../types/blog';

// 所有博客文件夹的列表
const blogSlugs = [
  'getting-started-react-typescript',
  'responsive-web-applications', 
  'rdk-x5-tutorial'
];

// 动态导入博客内容的函数
export const loadBlogContent = async (slug: string): Promise<string> => {
  try {
    console.log(`Attempting to load content for slug: ${slug}`);
    
    // 使用动态导入 - 尝试不同的导入方式
    const contentModule = await import(/* @vite-ignore */ `./${slug}/content.md?raw`);
    console.log('Content module loaded:', contentModule);
    
    // 检查不同的可能属性
    if (contentModule.default) {
      return contentModule.default;
    } else if (typeof contentModule === 'string') {
      return contentModule;
    } else {
      console.error('Unexpected content module structure:', contentModule);
      return 'Content loading failed';
    }
  } catch (error) {
    console.error(`Failed to load blog content for ${slug}:`, error);
    return 'Content not available';
  }
};

// 获取博客元数据的函数
export const getBlogMetadata = async (slug: string) => {
  try {
    const module = await import(/* @vite-ignore */ `./${slug}/metadata.ts`);
    return module.metadata;
  } catch (error) {
    console.error(`Failed to load blog metadata for ${slug}:`, error);
    return null;
  }
};

// 导出所有博客的函数
export const getAllBlogs = async (): Promise<BlogListItem[]> => {
  const blogs: BlogListItem[] = [];
  
  for (const slug of blogSlugs) {
    try {
      const module = await import(/* @vite-ignore */ `./${slug}/metadata.ts`);
      blogs.push(module.metadata);
    } catch (error) {
      console.error(`Failed to load metadata for ${slug}:`, error);
    }
  }
  
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// 获取特色博客的函数
export const getFeaturedBlogs = async (): Promise<BlogListItem[]> => {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => blog.featured);
};

// 根据标签筛选博客的函数
export const getBlogsByTag = async (tag: string): Promise<BlogListItem[]> => {
  const allBlogs = await getAllBlogs();
  return allBlogs.filter(blog => blog.tags.includes(tag));
};
