import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      backgroundColor?: string | string[];
    }>;
  };
  title?: string;
  height?: number;
}

const BarChart = ({ data, title = '', height = 300 }: BarChartProps) => {
  const gridColor = useColorModeValue('rgba(0,0,0,0.1)', 'rgba(255,255,255,0.1)');

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        rtl: true,
        labels: {
          font: {
            family: 'Cairo'
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        font: {
          family: 'Cairo',
          size: 16
        }
      }
    },
    scales: {
      x: {
        grid: {
          color: gridColor
        },
        ticks: {
          font: {
            family: 'Cairo'
          }
        }
      },
      y: {
        grid: {
          color: gridColor
        },
        ticks: {
          font: {
            family: 'Cairo'
          }
        }
      }
    }
  };

  return (
    <Box h={height} w="100%">
      <Bar options={options} data={data} />
    </Box>
  );
};

export default BarChart;
