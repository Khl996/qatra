import { ChartOptions } from 'chart.js';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Set global chart options
ChartJS.defaults.font.family = 'Cairo, sans-serif';
ChartJS.defaults.font.size = 14;

export const baseChartOptions: ChartOptions<'line' | 'bar'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      rtl: true
    },
    title: {
      display: true,
      align: 'center'
    }
  },
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
