import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
  Chip,
  Box,
  Stack,
  Link,
  CircularProgress,
  CardActions,
} from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import RefreshIcon from '@mui/icons-material/Refresh';
import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import type { IRepo } from '../models/repo.model';
import { useState, useCallback, useEffect } from 'react';

export const RepoCard = ({
  id,
  repo: repoProp,
  fetchRepo,
  isFavorite,
  onStarClick,
}: {
  id: number;
  repo?: IRepo;
  fetchRepo?: (id: number) => Promise<IRepo>;
  isFavorite: boolean;
  onStarClick: (id: number) => void;
}) => {
  const [fetched, setFetched] = useState<IRepo>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const repo = fetched ?? repoProp;

  const loadRepo = useCallback(async () => {
    if (!fetchRepo) return;

    setLoading(true);
    setError(null);
    try {
      setFetched(await fetchRepo(id));
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, [id, fetchRepo]);

  const needsFetch = !repoProp;
  useEffect(() => {
    if (needsFetch) loadRepo();
    return () => {};
  }, [needsFetch, loadRepo]);

  const formattedDate = repo?.lastCommitDate
    ? new Date(repo.lastCommitDate).toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : 'Unknown';

  return (
    <Card
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          boxShadow: 3,
        },
      }}
    >
      {error && <div className="error-message">{error.message}</div>}
      {loading && (
        <div className="loading-spinner">
          <CircularProgress />
        </div>
      )}
      {!loading && repo && (
        <div>
          <CardHeader
            title={
              <Box display="flex" alignItems="center" gap={1}>
                <Link
                  href={repo.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  underline="hover"
                  variant="h6"
                  sx={{
                    fontWeight: 600,
                    fontSize: '1.05rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  {repo.name}
                  <OpenInNewIcon sx={{ fontSize: 16, opacity: 0.7 }} />
                </Link>
              </Box>
            }
            subheader={
              <Typography variant="body2" color="text.secondary">
                by {repo.owner}
              </Typography>
            }
            action={
              <Tooltip title={isFavorite ? 'Unfavorite repository' : 'Favorite repository'}>
                <IconButton
                  onClick={() => onStarClick(repo.id)}
                  color={isFavorite ? 'warning' : 'default'}
                  aria-label="track repository"
                >
                  {isFavorite ? <StarIcon /> : <StarBorderIcon />}
                </IconButton>
              </Tooltip>
            }
            sx={{ pb: 1 }}
          />
          <CardContent sx={{ pt: 0, pb: 1 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                minHeight: 40,
                mb: 2,
              }}
            >
              {repo.description || 'No description provided.'}
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap gap={1}>
              <Chip
                icon={<StarIcon sx={{ fontSize: '1rem !important' }} />}
                label={`${repo.stars.toLocaleString()} stars`}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<BugReportOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                label={`${repo.openIssues.toLocaleString()} issues`}
                size="small"
                variant="outlined"
              />
              <Chip
                icon={<AccessTimeOutlinedIcon sx={{ fontSize: '1rem !important' }} />}
                label={`Commit: ${formattedDate}`}
                size="small"
                variant="outlined"
              />
            </Stack>
          </CardContent>
        </div>
      )}
      {fetchRepo && repo && (
        <CardActions sx={{ justifyContent: 'flex-end', px: 2, pb: 1.5 }}>
          <Tooltip title="Refresh stats">
            <span>
              <IconButton size="small" color="primary" onClick={loadRepo} disabled={loading}>
                {loading ? <CircularProgress size={20} /> : <RefreshIcon fontSize="small" />}
              </IconButton>
            </span>
          </Tooltip>
        </CardActions>
      )}
    </Card>
  );
};
