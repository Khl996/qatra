export interface AnalyticsChartProps {
  type: string;
  data: {
    labels: string[];
    datasets: any[];
  };
  height: number;
}