import { Box, CircularProgress, MenuItem, Select } from '@mui/material';
import { TrendLineChart, type TrendPoint } from '@repo-radar/plots';
import { useEffect, useState } from 'react';
import { getWeeklyCommits } from '../services/githubApi';
import type { IRepo } from '@repo-radar/ui';

function CommitsTrend({ repos }: { repos: IRepo[] }) {
  const [commits, setCommits] = useState<TrendPoint[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
  const selected = repos.find((r) => r.id === selectedId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCommits = async () => {
      if (!selected) {
        return;
      }
      try {
        setLoading(true);
        const results = await getWeeklyCommits(selected.fullName);
        setCommits(results.map((w) => ({ label: w.label, value: w.commits })));
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    };
    fetchCommits();
  }, [selected]);
  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
      <Select
        size="medium"
        displayEmpty
        value={selectedId}
        onChange={(e) => setSelectedId(Number(e.target.value))}
        inputProps={{ 'aria-label': 'Select a repository' }}
        sx={{ width: 320, maxWidth: '100%', flexShrink: 0 }}
      >
        <MenuItem value="" disabled>
          Select a repository
        </MenuItem>
        {repos.map((r) => (
          <MenuItem key={r.id} value={r.id}>
            {r.fullName}
          </MenuItem>
        ))}
      </Select>
      <Box sx={{ flex: 1, minHeight: 0 }}>
        {loading && (
          <div className="loading-spinner">
            <CircularProgress />
          </div>
        )}
        {!loading && <TrendLineChart data={commits} seriesLabel="Commits" />}
        {error && (
          <div className="error-message" role="alert">
            {error.message}
          </div>
        )}
      </Box>
    </Box>
  );
}

export default CommitsTrend;
