import { Box, useColorModeValue } from '@chakra-ui/react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DoughnutChartProps {
  data: {
    labels: string[];
    datasets: Array<{
      data: number[];
      backgroundColor?: string[];
      borderColor?: string[];
      borderWidth?: number;
    }>;
  };
  title?: string;
  height?: number;
}

const DoughnutChart = ({ data, title = '', height = 300 }: DoughnutChartProps) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right' as const,
        rtl: true,
        labels: {
          font: { family: 'Cairo' }
        }
      },
      title: {
        display: !!title,
        text: title,
        font: { family: 'Cairo', size: 16 }
      }
    }
  };

  return (
    <Box h={height} w="100%">
      <Doughnut options={options} data={data} />
    </Box>
  );
};

export default DoughnutChart;
