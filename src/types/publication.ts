// 论文相关类型定义
export interface PublicationMetadata {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
  citationCount?: number;
  openAccessUrl?: string;
  featured: boolean;
  slug: string;
}

export interface Publication extends PublicationMetadata {
  content?: string; // 详细内容（可选）
  bibtex?: string; // BibTeX格式引用
}

export type PublicationListItem = PublicationMetadata;
