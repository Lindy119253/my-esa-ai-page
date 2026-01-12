import { useState, useCallback } from 'react';

export interface Repository {
  id: string;
  name: string;
  url: string;
  description?: string;
  stars: number;
  lastUpdated: Date;
}

export const useRepository = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [currentRepo, setCurrentRepo] = useState<Repository | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const connectRepository = useCallback(async (repoUrl: string) => {
    setIsLoading(true);
    try {
      // 模拟仓库连接 - 后续替换为GitHub API
      const repo: Repository = {
        id: Date.now().toString(),
        name: repoUrl.split('/').pop() || 'unknown',
        url: repoUrl,
        stars: Math.floor(Math.random() * 1000),
        lastUpdated: new Date(),
      };
      
      setRepositories(prev => [...prev, repo]);
      setCurrentRepo(repo);
      return repo;
    } catch (error) {
      console.error('连接仓库失败:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    repositories,
    currentRepo,
    connectRepository,
    isLoading,
    setCurrentRepo,
  };
};
