import { useEffect, useState } from 'react';
import type { IRepo } from '@repo-radar/ui';
import { getRepoById } from '../services/githubApi';

export function useFavoriteRepos(ids: number[]) {
  const [repos, setRepos] = useState<IRepo[]>([]);

  useEffect(() => {
    Promise.allSettled(ids.map((id) => getRepoById(id))).then((results) =>
      setRepos(results.flatMap((r) => (r.status === 'fulfilled' ? [r.value] : [])))
    );
  }, [ids]);
  return repos;
}
