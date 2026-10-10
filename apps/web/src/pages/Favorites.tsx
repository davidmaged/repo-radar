import { RepoCard } from '@repo-radar/ui';
import { useSelector, useDispatch } from 'react-redux';
import { removeFavorite } from '../store/favoriteSlice';
import { getRepoById } from '../services/githubApi';

function Favorites() {
  const favorites = useSelector((state: any) => state.favorites) as number[];
  const dispatch = useDispatch();

  const removeRepoFromFavorites = (repoId: number) => {
    dispatch(removeFavorite(repoId));
  };

  if (favorites.length) {
    return (
      <div className="favorites">
        <h2>Your Favorites</h2>
        <div className="repo-grid">
          {favorites.map((repoId: number) => (
            <RepoCard
              key={repoId}
              id={repoId}
              fetchRepo={getRepoById}
              isFavorite
              onStarClick={removeRepoFromFavorites}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-empty">
      <h2>No Favorite Repos Yet</h2>
      <p>Start adding repos to your favorites and they will appear here!</p>
    </div>
  );
}

export default Favorites;
