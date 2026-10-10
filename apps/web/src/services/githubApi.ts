import type { IRepo } from '@repo-radar/ui';

const BASE_URL = 'https://api.github.com';
const token = import.meta.env.GITHUB_TOKEN as string | undefined;
export const PER_PAGE = 30;

const headers: HeadersInit = {
  Accept: 'application/vnd.github+json',
  ...(token ? { Authorization: `Bearer ${token}` } : {}),
};

function getTrendingQuery() {
  const d = new Date();
  d.setDate(d.getDate() - 7);
  return `created:>${d.toISOString().slice(0, 10)}`;
}

function toIRepo(item: any): IRepo {
  return {
    id: item.id,
    name: item.name,
    fullName: item.full_name,
    owner: item.owner?.login,
    stars: item.stargazers_count,
    openIssues: item.open_issues_count,
    lastCommitDate: item.pushed_at ?? null,
    htmlUrl: item.html_url,
    description: item.description ?? undefined,
  };
}

export const searchRepos = async (
  query: string,
  page = 1
): Promise<{ items: IRepo[]; incomplete_results: boolean; total_count: number }> => {
  const res = await fetch(
    `${BASE_URL}/search/repositories?q=${encodeURIComponent(query)}&sort=stars&order=desc&per_page=${PER_PAGE}&page=${page}`,
    { headers }
  );
  let data = await res.json();
  data.items = (data.items ?? []).map(toIRepo);
  return data;
};

export const getTrendingRepos = async (
  page = 1
): Promise<{ items: IRepo[]; incomplete_results: boolean; total_count: number }> => {
  return searchRepos(getTrendingQuery(), page);
};

export const getRepoById = async (id: number): Promise<IRepo> => {
  const res = await fetch(`${BASE_URL}/repositories/${id}`, { headers });
  const data = await res.json();
  return toIRepo(data);
};

export const getWeeklyCommits = async (fullName: string) => {
  const res = await fetch(`${BASE_URL}/repos/${fullName}/stats/commit_activity`, { headers });
  const data: { total: number; week: number }[] = await res.json();
  return data.map((w) => ({
    // GitHub's week timestamp is in seconds; Date expects milliseconds.
    label: new Date(w.week * 1000).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    }),
    commits: w.total,
  }));
};
