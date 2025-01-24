import { Box, useColorModeValue } from '@chakra-ui/react';
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
import { Line } from 'react-chartjs-2';

// تسجيل المكونات المطلوبة
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      label: string;
      data: number[];
      borderColor?: string;
      backgroundColor?: string;
    }>;
  };
  title?: string;
  height?: number;
}

const LineChart = ({ data, title = '', height = 300 }: LineChartProps) => {
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
      <Line options={options} data={data} />
    </Box>
  );
};

export default LineChart;
