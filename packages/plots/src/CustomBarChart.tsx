import { BarChart } from '@mui/x-charts/BarChart';

export interface RepoChartData {
  name: string;
  stars: number;
}

export const CustomBarChart = ({
  data,
  label,
  type,
}: {
  data: RepoChartData[];
  label: string;
  type: 'band' | 'linear';
}) => {
  if (!data || data.length === 0) {
    return <div>No tracked repositories to display.</div>;
  }

  return (
    <BarChart
      margin={{ left: 80, right: 20, top: 50, bottom: 40 }}
      xAxis={[{ scaleType: type, data: data.map((d) => d.name) }]}
      series={[{ data: data.map((d) => d.stars), label: label }]}
    />
  );
};
