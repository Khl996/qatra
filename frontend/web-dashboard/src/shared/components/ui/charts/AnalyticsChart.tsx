import { Box } from '@chakra-ui/react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor: string;
      backgroundColor: string;
    }>;
  };
  title?: string; // Make title optional
}

const AnalyticsChart: React.FC<AnalyticsChartProps> = ({ data, title }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return (
    <Box p={4} bg="white" borderRadius="lg" boxShadow="sm">
      {title && <h3>{title}</h3>}
      <Line options={options} data={data} />
    </Box>
  );
};

export default AnalyticsChart;
