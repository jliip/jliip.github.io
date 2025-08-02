import React, { useState, useEffect } from 'react';
import './ContentArea.css';
import { getAllBlogs } from '../data/blogs';
import { type BlogListItem } from '../types/blog';
import BlogDetail from './BlogDetail';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface ContentAreaProps {
  tabs?: TabItem[];
}

const ContentArea: React.FC<ContentAreaProps> = ({ 
  tabs = [
    {
      id: 'blog',
      label: 'Blog',
      content: <BlogContent />
    },
    {
      id: 'projects',
      label: 'Projects',
      content: <ProjectsContent />
    },
    {
      id: 'publications',
      label: 'Publications',
      content: <PublicationsContent />
    }
  ]
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id || '');

  return (
    <div className="content-area">
      <div className="tab-navigation">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="tab-content">
        {tabs.find(tab => tab.id === activeTab)?.content}
      </div>
    </div>
  );
};

// Blog Content Component
const BlogContent: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBlog, setSelectedBlog] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const blogs = await getAllBlogs();
        setBlogPosts(blogs);
      } catch (error) {
        console.error('Failed to load blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // 如果选择了博客，显示详情页面
  if (selectedBlog) {
    return (
      <BlogDetail 
        slug={selectedBlog} 
        onBack={() => setSelectedBlog(null)} 
      />
    );
  }

  if (loading) {
    return (
      <div className="content-section">
        <h2>Tech & Thought</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <h2>Tech & Thought</h2>
      <div className="blog-posts">
        {blogPosts.map((post) => (
          <article key={post.id} className="blog-post">
            <h3 
              className="post-title clickable" 
              onClick={() => setSelectedBlog(post.slug)}
            >
              {post.title}
            </h3>
            <p className="post-date">{new Date(post.date).toLocaleDateString()}</p>
            <p className="post-excerpt">{post.excerpt}</p>
            <div className="post-tags">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            {post.originalUrl ? (
              <a 
                href={post.originalUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="read-more csdn-link"
              >
                通过CSDN查看
              </a>
            ) : (
              <button 
                onClick={() => setSelectedBlog(post.slug)}
                className="read-more"
              >
                阅读全文
              </button>
            )}
          </article>
        ))}
      </div>
    </div>
  );
};

// Publications Content Component
const PublicationsContent: React.FC = () => {
  return (
    <div className="content-section">
      <h2>Publications</h2>
      <div className="blog-posts">
        <article className="blog-post">
          <h3 className="post-title">TBA</h3>
          <p className="post-date">To Be Announced</p>
          <p className="post-excerpt">
            Publications will be updated here when available.
          </p>
          <div className="post-tags">
            <span className="tag">Coming Soon</span>
          </div>
        </article>
      </div>
    </div>
  );
};

// Projects Content Component
const ProjectsContent: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  
  const projects = [
    {
      id: 1,
      title: "FramTime! An online workflow system",
      description: "Based on the ISDN3300 course, we developed a pixel art-style web application implementing a to-do list, timer, link-up feature, evil goose, and QQ Nóngchǎng. Collaborated with Vicky and Xinhan.",
      technologies: ["Web Development", "JavaScript", "Pixel Art", "Collaborative"],
      github: null, // 没有GitHub仓库
      demo: "https://yunxinz.github.io/farm-time/"
    },
    {
      id: 2,
      title: "Personal Website",
      description: "A clean, responsive personal website built with React and TypeScript. Features a modern design with blog functionality, project showcase, and publications section. Includes image loading optimization and responsive layout.",
      technologies: ["React", "TypeScript", "CSS", "Vite", "Markdown"],
      github: "https://github.com/jliip/jliip.github.io",
      demo: "https://jliip.github.io"
    },
  ];

  // 如果选择了项目，显示详情页面（暂时显示简单信息）
  if (selectedProject) {
    const project = projects.find(p => p.id === selectedProject);
    if (project) {
      return (
        <div className="content-section">
          <button onClick={() => setSelectedProject(null)} className="back-button">
            ← Back
          </button>
          <div className="blog-detail-content">
            <div className="blog-header">
              <h1 className="blog-title">{project.title}</h1>
              <div className="blog-meta">
                <span className="blog-date">Project Details</span>
              </div>
              <div className="blog-tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="blog-tag">{tech}</span>
                ))}
              </div>
            </div>
            <div className="blog-content">
              <p>{project.description}</p>
              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
                  Links
                </h3>
                {project.github && (
                  <p style={{ marginBottom: '0.5rem' }}>
                    <strong>GitHub: </strong>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                      {project.github}
                    </a>
                  </p>
                )}
                <p style={{ marginBottom: '0.5rem' }}>
                  <strong>Live Demo: </strong>
                  <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{ color: '#2563eb', textDecoration: 'none' }}>
                    {project.demo}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <div className="content-section">
      <h2>Projects</h2>
      <div className="blog-posts">
        {projects.map((project) => (
          <article key={project.id} className="blog-post">
            <h3 
              className="post-title clickable" 
              onClick={() => setSelectedProject(project.id)}
            >
              {project.title}
            </h3>
            <p className="post-excerpt">{project.description}</p>
            <div className="post-tags">
              {project.technologies.map((tech) => (
                <span key={tech} className="tag">{tech}</span>
              ))}
            </div>
            <div className="project-actions">
              {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="read-more">
                  GitHub
                </a>
              )}
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="read-more csdn-link">
                Live Demo
              </a>
              <a 
                onClick={() => setSelectedProject(project.id)}
                className="read-more csdn-link"
                style={{ cursor: 'pointer' }}
              >
                Detail
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
