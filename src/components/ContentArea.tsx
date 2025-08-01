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
      id: 'publications',
      label: 'Publications',
      content: <PublicationsContent />
    },
    {
      id: 'projects',
      label: 'Projects',
      content: <ProjectsContent />
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
        <h2>Recent Blog Posts</h2>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="content-section">
      <h2>Recent Blog Posts</h2>
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
  const publications = [
    {
      id: 1,
      title: "Machine Learning Approaches to Web Development",
      authors: "Your Name, Co-Author Name",
      journal: "Journal of Web Technologies",
      year: "2024",
      doi: "10.1000/journal.2024.001"
    },
    {
      id: 2,
      title: "Optimizing React Performance in Large Applications",
      authors: "Your Name, Another Author",
      journal: "Frontend Development Quarterly",
      year: "2023",
      doi: "10.1000/journal.2023.045"
    },
    {
      id: 3,
      title: "TypeScript Best Practices for Enterprise Applications",
      authors: "Your Name",
      journal: "Software Engineering Review",
      year: "2023",
      doi: "10.1000/journal.2023.123"
    }
  ];

  return (
    <div className="content-section">
      <h2>Publications</h2>
      <div className="publications">
        {publications.map((pub) => (
          <div key={pub.id} className="publication">
            <h3 className="pub-title">{pub.title}</h3>
            <p className="pub-authors">{pub.authors}</p>
            <p className="pub-journal">
              <em>{pub.journal}</em>, {pub.year}
            </p>
            <p className="pub-doi">DOI: {pub.doi}</p>
            <div className="pub-actions">
              <a href="#" className="pub-link">View Paper</a>
              <a href="#" className="pub-link">Citations</a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Projects Content Component
const ProjectsContent: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: "Personal Website",
      description: "A clean, responsive personal website built with React and TypeScript.",
      technologies: ["React", "TypeScript", "CSS", "Vite"],
      github: "https://github.com/username/personal-website",
      demo: "https://yourname.github.io",
      status: "Completed"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A full-stack task management application with real-time updates.",
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      github: "https://github.com/username/task-app",
      demo: "https://task-app-demo.com",
      status: "In Progress"
    },
    {
      id: 3,
      title: "Data Visualization Dashboard",
      description: "Interactive dashboard for visualizing complex datasets.",
      technologies: ["React", "D3.js", "Python", "Flask"],
      github: "https://github.com/username/data-viz",
      demo: "https://data-viz-demo.com",
      status: "Completed"
    }
  ];

  return (
    <div className="content-section">
      <h2>Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <div key={project.id} className="project">
            <div className="project-header">
              <h3 className="project-title">{project.title}</h3>
              <span className={`status ${project.status.toLowerCase().replace(' ', '-')}`}>
                {project.status}
              </span>
            </div>
            <p className="project-description">{project.description}</p>
            <div className="project-technologies">
              {project.technologies.map((tech) => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            <div className="project-links">
              <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-link">
                GitHub
              </a>
              <a href={project.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                Live Demo
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ContentArea;
