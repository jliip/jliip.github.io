// 示例项目数据索引文件
import { type ProjectListItem } from '../../types/project';

export const projectIndex: ProjectListItem[] = [
  {
    id: 'personal-website',
    title: 'Personal Website',
    description: 'A clean, responsive personal website built with React and TypeScript.',
    technologies: ['React', 'TypeScript', 'CSS', 'Vite'],
    status: 'completed',
    githubUrl: 'https://github.com/jliip/jliip.github.io',
    demoUrl: 'https://jliip.github.io',
    startDate: '2024-01-01',
    endDate: '2024-01-15',
    featured: true,
    slug: 'personal-website',
    category: 'web'
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    description: 'A full-stack task management application with real-time updates.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    status: 'in-progress',
    githubUrl: 'https://github.com/jliip/task-app',
    startDate: '2023-12-01',
    featured: false,
    slug: 'task-management-app',
    category: 'web'
  },
  {
    id: 'data-visualization-dashboard',
    title: 'Data Visualization Dashboard',
    description: 'Interactive dashboard for visualizing complex datasets.',
    technologies: ['React', 'D3.js', 'Python', 'Flask'],
    status: 'completed',
    githubUrl: 'https://github.com/jliip/data-viz',
    demoUrl: 'https://data-viz-demo.com',
    startDate: '2023-10-01',
    endDate: '2023-11-30',
    featured: true,
    slug: 'data-visualization-dashboard',
    category: 'data'
  }
];

// 动态导入项目内容的函数
export const loadProjectContent = async (slug: string): Promise<string> => {
  try {
    const module = await import(`./${slug}/content.md?raw`);
    return module.default;
  } catch (error) {
    console.error(`Failed to load project content for ${slug}:`, error);
    return '';
  }
};

// 获取项目元数据的函数
export const getProjectMetadata = async (slug: string) => {
  try {
    const module = await import(`./${slug}/metadata`);
    return module.metadata;
  } catch (error) {
    console.error(`Failed to load project metadata for ${slug}:`, error);
    return null;
  }
};

// 导出所有项目的函数
export const getAllProjects = (): ProjectListItem[] => {
  return projectIndex.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
};

// 获取特色项目的函数
export const getFeaturedProjects = (): ProjectListItem[] => {
  return projectIndex.filter(project => project.featured);
};

// 根据技术栈筛选项目的函数
export const getProjectsByTechnology = (tech: string): ProjectListItem[] => {
  return projectIndex.filter(project => 
    project.technologies.some(t => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

// 根据状态筛选项目的函数
export const getProjectsByStatus = (status: string): ProjectListItem[] => {
  return projectIndex.filter(project => project.status === status);
};

// 根据分类筛选项目的函数
export const getProjectsByCategory = (category: string): ProjectListItem[] => {
  return projectIndex.filter(project => project.category === category);
};
