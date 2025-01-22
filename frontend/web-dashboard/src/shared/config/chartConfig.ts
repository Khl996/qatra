import { Chart } from 'chart.js';
import 'chart.js/auto';

// Set global chart options
Chart.defaults.font.family = 'Cairo, sans-serif';
Chart.defaults.font.size = 14;
Chart.defaults.rtl = true;

export const baseChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      rtl: true
    }
  }
};
