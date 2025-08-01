import { useState, useEffect } from 'react';

interface GitHubUser {
  avatar_url: string;
  name: string;
  login: string;
}

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

    const fetchGitHubAvatar = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        
        if (!response.ok) {
          throw new Error(`GitHub API请求失败: ${response.status}`);
        }

        const userData: GitHubUser = await response.json();
        setAvatarUrl(userData.avatar_url);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : '获取GitHub头像失败';
        setError(errorMessage);
        setAvatarUrl(fallbackUrl || '');
        console.warn('获取GitHub头像失败:', errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubAvatar();
  }, [githubUrl, fallbackUrl]);

  return { avatarUrl, loading, error };
};
