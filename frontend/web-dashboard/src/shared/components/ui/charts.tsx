import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  type ChartData,
  type ChartOptions,
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  data: ChartData<any>;
}

// Base options
const baseOptions: ChartOptions<any> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
    },
  },
};

// Line Chart
export const LineChart: React.FC<ChartProps> = ({ data }) => {
  return <Line data={data} options={baseOptions} />;
};

// Bar Chart
export const BarChart: React.FC<ChartProps> = ({ data }) => {
  return <Bar data={data} options={baseOptions} />;
};

// Doughnut Chart
export const DoughnutChart: React.FC<ChartProps> = ({ data }) => {
  return <Doughnut data={data} options={{ ...baseOptions, cutout: '60%' }} />;
};
