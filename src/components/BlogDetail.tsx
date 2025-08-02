import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { getBlogMetadata, loadBlogContent } from '../data/blogs/staticIndex';
import { type BlogPost } from '../types/blog';
import './BlogDetail.css';

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

// 超简化的图片组件
const BlogImage: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  if (!src) {
    return <div className="image-placeholder">无效的图片链接</div>;
  }

  return (
    <div className="image-container">
      <img 
        src={src} 
        alt={alt || '图片'} 
        loading="lazy"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

const BlogDetail: React.FC<BlogDetailProps> = ({ slug, onBack }) => {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogData = () => {
      try {
        setLoading(true);
        setError(null);
        
        // 改为同步调用
        const metadata = getBlogMetadata(slug);
        const content = loadBlogContent(slug);

        if (metadata) {
          setBlog({
            ...metadata,
            content
          });
        } else {
          setError('博客不存在');
        }
      } catch (err) {
        setError('加载博客内容失败');
        console.error('Failed to load blog:', err);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, [slug]);

  if (loading) {
    return (
      <div className="blog-detail">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <div className="loading">
          <p>正在加载博客内容...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail">
        <button onClick={onBack} className="back-button">
          ← Back
        </button>
        <div className="error">
          <p>{error || '博客内容不存在'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <button onClick={onBack} className="back-button">
         Back
      </button>
      
      <article className="blog-detail-content">
        <header className="blog-header">
          <h1 className="blog-title">{blog.title}</h1>
          <div className="blog-meta">
            <span className="blog-date">
              {new Date(blog.date).toLocaleDateString('zh-CN')}
            </span>
            <span className="blog-read-time">
              预计阅读时间：{blog.readTime} 分钟
            </span>
          </div>
          <div className="blog-tags">
            {blog.tags.map((tag) => (
              <span key={tag} className="blog-tag">{tag}</span>
            ))}
          </div>
        </header>
        
        <div className="blog-content">
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => <BlogImage src={src} alt={alt} />,
              a: ({ href, children }) => (
                <a href={href} target="_blank" rel="noopener noreferrer">
                  {children}
                </a>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
