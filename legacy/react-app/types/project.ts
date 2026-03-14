// 项目相关类型定义
export type ProjectStatus = 'completed' | 'in-progress' | 'planned' | 'archived';

export interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: ProjectStatus;
  githubUrl?: string;
  demoUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
  slug: string;
  category?: string; // 项目分类，如 'web', 'mobile', 'ml', 'tool'
}

export interface Project extends ProjectMetadata {
  content: string; // 项目详细描述（Markdown）
  images?: string[]; // 项目截图
  achievements?: string[]; // 项目成果
  challenges?: string[]; // 遇到的挑战
}

export type ProjectListItem = ProjectMetadata;
