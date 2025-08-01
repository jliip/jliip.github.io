import React, { useState, useEffect, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { getBlogMetadata, loadBlogContent } from '../data/blogs';
import { type BlogPost } from '../types/blog';
import './BlogDetail.css';

interface BlogDetailProps {
  slug: string;
  onBack: () => void;
}

// 独立的图片组件
const BlogImage: React.FC<{ src?: string; alt?: string }> = ({ src, alt }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(src);

  // 图片代理服务列表
  const getProxyUrls = (originalSrc: string) => {
    if (!originalSrc) return [];
    
    const encodedSrc = encodeURIComponent(originalSrc);
    return [
      originalSrc, // 先尝试原始链接
      `https://images.weserv.nl/?url=${encodedSrc}`, // 公共代理服务1
      `https://cors-anywhere.herokuapp.com/${originalSrc}`, // CORS代理
    ];
  };

  const [proxyUrls] = useState(() => getProxyUrls(src || ''));
  const [currentUrlIndex, setCurrentUrlIndex] = useState(0);

  const handleImageError = useCallback(() => {
    console.warn(`Failed to load image: ${currentSrc}`);
    
    // 尝试下一个代理URL
    if (currentUrlIndex < proxyUrls.length - 1) {
      const nextIndex = currentUrlIndex + 1;
      const nextUrl = proxyUrls[nextIndex];
      console.log(`Trying next proxy URL (${nextIndex + 1}/${proxyUrls.length}): ${nextUrl}`);
      setCurrentUrlIndex(nextIndex);
      setCurrentSrc(nextUrl);
      setImageLoading(true);
    } else {
      // 所有URL都失败了
      setImageError(true);
      setImageLoading(false);
    }
  }, [currentSrc, currentUrlIndex, proxyUrls]);

  const handleImageLoad = useCallback(() => {
    console.log(`Successfully loaded image via: ${currentSrc}`);
    setImageLoading(false);
  }, [currentSrc]);

  // 当组件挂载时，给图片一个超时时间
  useEffect(() => {
    if (imageError || !imageLoading) return;
    
    const timer = setTimeout(() => {
      console.warn(`Image loading timeout: ${currentSrc}`);
      handleImageError(); // 超时时尝试下一个URL
    }, 8000); // 8秒超时

    return () => clearTimeout(timer);
  }, [imageLoading, currentSrc, imageError, handleImageError]);

  // 当src改变时重置状态
  useEffect(() => {
    if (src && src !== proxyUrls[0]) {
      const urls = getProxyUrls(src);
      setCurrentSrc(urls[0]);
      setImageError(false);
      setImageLoading(true);
      setCurrentUrlIndex(0);
    }
  }, [src, proxyUrls]);

  if (!src) {
    return <div className="image-placeholder">无效的图片链接</div>;
  }

  if (imageError) {
    return (
      <div className="image-placeholder">
        <p>图片无法加载（防盗链限制）</p>
        <p>
          <a href={src} target="_blank" rel="noopener noreferrer">
            点击查看原图
          </a>
        </p>
        <details style={{ marginTop: '10px', fontSize: '12px', color: '#666' }}>
          <summary>技术信息</summary>
          <p>已尝试 {proxyUrls.length} 个加载方式均失败</p>
          <code style={{ wordBreak: 'break-all' }}>{src}</code>
        </details>
      </div>
    );
  }

  return (
    <div className="image-container">
      {imageLoading && (
        <div className="image-loading">
          <p>加载中... ({currentUrlIndex + 1}/{proxyUrls.length})</p>
          <small>正在尝试绕过防盗链限制</small>
        </div>
      )}
      <img 
        src={currentSrc} 
        alt={alt || '图片'} 
        loading="lazy"
        onError={handleImageError}
        onLoad={handleImageLoad}
        style={{ display: imageLoading ? 'none' : 'block' }}
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
    const loadBlogData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const [metadata, content] = await Promise.all([
          getBlogMetadata(slug),
          loadBlogContent(slug)
        ]);

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
        <div className="blog-detail-header">
          <button onClick={onBack} className="back-button">
            back
          </button>
        </div>
        <div className="loading">
          <p>正在加载博客内容...</p>
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="blog-detail">
        <div className="blog-detail-header">
          <button onClick={onBack} className="back-button">
            back
          </button>
        </div>
        <div className="error">
          <p>{error || '博客内容不存在'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail">
      <div className="blog-detail-header">
        <button onClick={onBack} className="back-button">
          back
        </button>
      </div>
      
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
