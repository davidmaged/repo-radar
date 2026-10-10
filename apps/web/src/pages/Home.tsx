import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress, Typography } from '@mui/material';
import { addFavorite, removeFavorite } from '../store/favoriteSlice';
import { SearchBar, RepoCard } from '@repo-radar/ui';
import { searchRepos, getTrendingRepos, PER_PAGE } from '../services/githubApi';
import '../css/Home.css';
import { useDebounce } from '../hooks/useDebounce';

const GITHUB_SEARCH_LIMIT = 1000;

function Home() {
  const [search, setSearch] = useState('');
  const [repos, setRepos] = useState<any[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const favorites = useSelector((state: any) => state.favorites);
  const debouncedSearch = useDebounce(search);
  const dispatch = useDispatch();
  const sentinelRef = useRef<HTMLDivElement>(null);

  const isFavorite = (repoId: number) => favorites.includes(repoId);
  const onStarClick = (repoId: number) =>
    dispatch(isFavorite(repoId) ? removeFavorite(repoId) : addFavorite(repoId));

  const [prevSearch, setPrevSearch] = useState(debouncedSearch);
  if (debouncedSearch !== prevSearch) {
    setPrevSearch(debouncedSearch);
    setPage(1);
    setRepos([]);
    setTotalCount(0);
    setHasMore(true);
    setError(null);
    setLoading(true);
  }

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const results = debouncedSearch
          ? await searchRepos(debouncedSearch, page)
          : await getTrendingRepos(page);
        setRepos((prev) => (page === 1 ? results.items : [...prev, ...results.items]));
        setTotalCount(results.total_count);
        setHasMore(page * PER_PAGE < Math.min(results.total_count, GITHUB_SEARCH_LIMIT));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchRepos();
  }, [debouncedSearch, page]);

  // Infinite scroll
  const canLoadMore = hasMore && !loading && !error;
  useEffect(() => {
    if (!canLoadMore || !sentinelRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setPage((p) => p + 1),
      { rootMargin: '600px' }
    );
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [canLoadMore]);

  return (
    <div className="home">
      <SearchBar value={search} onChange={setSearch} />
      {error && (
        <div className="error-message" role="alert">
          {error.message}
        </div>
      )}
      <div className="repo-grid">
        {repos.map((repo) => (
          <RepoCard
            key={repo.id}
            id={repo.id}
            repo={repo}
            isFavorite={favorites.includes(repo.id)}
            onStarClick={onStarClick}
          />
        ))}
      </div>
      <div ref={sentinelRef} />
      <div className="loading-spinner" style={{ minHeight: 64 }}>
        {loading && <CircularProgress />}
      </div>
      {!loading && !error && repos.length === 0 && (
        <Typography align="center" color="text.secondary">
          No repositories found.
        </Typography>
      )}
    </div>
  );
}
export default Home;
