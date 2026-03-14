import { useState, useEffect } from 'react';

/**
 * 从GitHub URL中提取用户名
 * 例如: "https://github.com/jliip" -> "jliip"
 */
const extractUsernameFromGitHubUrl = (githubUrl: string): string | null => {
  try {
    const url = new URL(githubUrl);
    const pathParts = url.pathname.split('/').filter(part => part.length > 0);
    return pathParts[0] || null;
  } catch {
    return null;
  }
};

/**
 * 获取GitHub用户头像的自定义Hook
 * @param githubUrl GitHub个人页面URL
 * @param fallbackUrl 备用头像URL
 * @returns 头像URL和加载状态
 */
export const useGitHubAvatar = (githubUrl?: string, fallbackUrl?: string) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(fallbackUrl || '');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 如果没有GitHub URL，直接使用fallback
    if (!githubUrl) {
      setAvatarUrl(fallbackUrl || '');
      return;
    }

    const username = extractUsernameFromGitHubUrl(githubUrl);
    if (!username) {
      setError('无效的GitHub URL');
      setAvatarUrl(fallbackUrl || '');
      return;
    }

    // 直接使用GitHub的头像URL格式，避免API调用
    // GitHub头像的直接URL格式：https://github.com/username.png
    const directAvatarUrl = `https://github.com/${username}.png?size=200`;
    
    // 验证头像是否可以加载
    const img = new Image();
    img.onload = () => {
      setAvatarUrl(directAvatarUrl);
      setLoading(false);
    };
    img.onerror = () => {
      setError('GitHub头像加载失败');
      setAvatarUrl(fallbackUrl || '');
      setLoading(false);
    };
    
    setLoading(true);
    img.src = directAvatarUrl;

  }, [githubUrl, fallbackUrl]);

  return { avatarUrl, loading, error };
};
