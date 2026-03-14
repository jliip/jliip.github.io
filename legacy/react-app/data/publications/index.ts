// 示例论文数据索引文件
import { type PublicationListItem } from '../../types/publication';

export const publicationIndex: PublicationListItem[] = [
  {
    id: 'ml-web-development',
    title: 'Machine Learning Approaches to Web Development',
    authors: ['Li Jiayun', 'Co-Author Name'],
    journal: 'Journal of Web Technologies',
    year: '2024',
    doi: '10.1000/journal.2024.001',
    abstract: 'This paper explores the application of machine learning techniques in modern web development...',
    keywords: ['Machine Learning', 'Web Development', 'Frontend', 'Automation'],
    featured: true,
    slug: 'ml-web-development'
  },
  {
    id: 'react-performance-optimization',
    title: 'Optimizing React Performance in Large Applications',
    authors: ['Li Jiayun', 'Another Author'],
    journal: 'Frontend Development Quarterly',
    year: '2023',
    doi: '10.1000/journal.2023.045',
    abstract: 'An analysis of performance optimization strategies for React applications at scale...',
    keywords: ['React', 'Performance', 'Optimization', 'Large Scale'],
    featured: false,
    slug: 'react-performance-optimization'
  }
];

// 动态导入论文内容的函数
export const loadPublicationContent = async (slug: string): Promise<string> => {
  try {
    const module = await import(`./${slug}/content.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load publication content for ${slug}:`, error);
    return '';
  }
};

// 获取论文元数据的函数
export const getPublicationMetadata = async (slug: string) => {
  try {
    const module = await import(`./${slug}/metadata`);
    return module.metadata;
  } catch (error) {
    console.error(`Failed to load publication metadata for ${slug}:`, error);
    return null;
  }
};

// 导出所有论文的函数
export const getAllPublications = (): PublicationListItem[] => {
  return publicationIndex.sort((a, b) => parseInt(b.year) - parseInt(a.year));
};

// 获取特色论文的函数
export const getFeaturedPublications = (): PublicationListItem[] => {
  return publicationIndex.filter(pub => pub.featured);
};

// 根据关键词筛选论文的函数
export const getPublicationsByKeyword = (keyword: string): PublicationListItem[] => {
  return publicationIndex.filter(pub => 
    pub.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
  );
};
