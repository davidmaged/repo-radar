import { Box } from '@mui/material';
import { Widget } from '@repo-radar/ui';
import { Responsive, WidthProvider } from 'react-grid-layout/legacy';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import { CustomBarChart } from '@repo-radar/plots';
import { useSelector } from 'react-redux';
import { useFavoriteRepos } from '../hooks/useFavoriteRepos';
import CommitsTrend from '../components/CommitsTrend';

const ResponsiveGrid = WidthProvider(Responsive);
const layout = [
  { i: 'stars', x: 0, y: 0, w: 12, h: 6 },
  { i: 'trend', x: 0, y: 6, w: 12, h: 8 },
];

function Dashboard() {
  const ids = useSelector((state: any) => state.favorites) as number[];
  const repos = useFavoriteRepos(ids);

  return (
    <Box sx={{ flex: 1, minHeight: 0, overflowY: 'auto', p: 2 }}>
      <ResponsiveGrid
        layouts={{ lg: layout }}
        cols={{ lg: 12, md: 12, sm: 6, xs: 4 }}
        rowHeight={40}
        draggableHandle=".drag-handle"
      >
        <div key="stars">
          <Widget title="Stars Chart">
            <CustomBarChart
              data={repos.map((r) => ({ name: r.name, stars: r.stars }))}
              label="Stars"
              type="band"
            />
          </Widget>
        </div>
        <div key="trend">
          <Widget title="Commits Trend">
            <CommitsTrend repos={repos} />
          </Widget>
        </div>
      </ResponsiveGrid>
    </Box>
  );
}

export default Dashboard;
