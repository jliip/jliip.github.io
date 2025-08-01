# 项目架构设计文档

## 目录结构设计

```
src/
├── components/
│   ├── PersonalInfo/
│   ├── ContentArea/
│   └── common/
├── data/
│   ├── personalData.ts
│   ├── blogs/
│   │   ├── index.ts
│   │   ├── blog-1/
│   │   │   ├── metadata.ts
│   │   │   └── content.md
│   │   └── blog-2/
│   │       ├── metadata.ts
│   │       └── content.md
│   ├── publications/
│   │   ├── index.ts
│   │   ├── publication-1/
│   │   │   ├── metadata.ts
│   │   │   ├── content.md
│   │   │   └── assets/
│   │   └── publication-2/
│   │       ├── metadata.ts
│   │       ├── content.md
│   │       └── assets/
│   └── projects/
│       ├── index.ts
│       ├── project-1/
│       │   ├── metadata.ts
│       │   ├── content.md
│       │   └── assets/
│       └── project-2/
│           ├── metadata.ts
│           ├── content.md
│           └── assets/
├── types/
│   ├── blog.ts
│   ├── publication.ts
│   └── project.ts
├── hooks/
│   ├── useGitHubAvatar.ts
│   ├── useBlogs.ts
│   ├── usePublications.ts
│   └── useProjects.ts
└── pages/
    ├── BlogDetail.tsx
    ├── PublicationDetail.tsx
    └── ProjectDetail.tsx
```

## 架构优势

### 1. 数据驱动架构
- 每个项目/博客/论文都有独立的文件夹
- 元数据和内容分离
- 支持资源文件（图片、PDF等）

### 2. 类型安全
- 为每种内容类型定义严格的TypeScript接口
- 编译时检查数据完整性

### 3. 可扩展性
- 新增内容只需添加新文件夹
- 修改内容不影响代码逻辑
- 支持不同的内容格式（Markdown、HTML等）

### 4. 组件化设计
- 每个详情页面独立组件
- 公共组件复用
- 易于维护和测试

### 5. 路由友好
- 支持深度链接
- SEO友好的URL结构
- 易于集成React Router

## 数据管理模式

### 元数据标准化
```typescript
// Blog元数据示例
interface BlogMetadata {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  author: string;
  readTime: number;
  featured: boolean;
}

// Publication元数据示例
interface PublicationMetadata {
  id: string;
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  abstract: string;
  keywords: string[];
  pdfUrl?: string;
}

// Project元数据示例
interface ProjectMetadata {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  status: 'completed' | 'in-progress' | 'planned';
  githubUrl?: string;
  demoUrl?: string;
  startDate: string;
  endDate?: string;
  featured: boolean;
}
```

### 内容加载策略
1. **静态导入**: 编译时加载所有元数据
2. **动态导入**: 按需加载详细内容
3. **缓存机制**: 避免重复加载

## 实现建议

### 阶段1：数据结构重构
1. 创建类型定义
2. 设置数据文件夹结构
3. 迁移现有硬编码数据

### 阶段2：组件重构
1. 拆分ContentArea组件
2. 创建列表组件
3. 实现详情页面组件

### 阶段3：路由集成
1. 集成React Router
2. 实现详情页面路由
3. 添加面包屑导航

### 阶段4：功能增强
1. 搜索功能
2. 标签过滤
3. 分页支持
4. RSS订阅（博客）

## 是否合理？

这个架构具有以下优点：
✅ **可维护性**: 内容和代码分离
✅ **可扩展性**: 易于添加新内容类型
✅ **类型安全**: TypeScript保障
✅ **性能友好**: 按需加载
✅ **SEO友好**: 支持静态生成
✅ **开发体验**: 清晰的文件组织

建议采用这种架构方式，它能很好地支持您网站的长期发展。
