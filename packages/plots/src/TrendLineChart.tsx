import { Box } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';

export interface TrendPoint {
  label: string;
  value: number;
}

export const TrendLineChart = ({
  data,
  seriesLabel = 'Value',
}: {
  data: TrendPoint[];
  seriesLabel?: string;
}) => (
  <Box sx={{ width: '100%', height: '100%' }}>
    <LineChart
      xAxis={[{ scaleType: 'point', data: data.map((d) => d.label) }]}
      series={[{ data: data.map((d) => d.value), label: seriesLabel }]}
    />
  </Box>
);
