import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  Colors,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Line } from 'solid-chartjs';

Chart.register(
  Title,
  Tooltip,
  Legend,
  Colors,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
);

function PerformanceAnalytics() {
  const [analyticsData, setAnalyticsData] = createSignal([]);
  const [loading, setLoading] = createSignal(false);
  const [chartData, setChartData] = createSignal({
    labels: [],
    datasets: [
      {
        label: 'Strength Gains',
        data: [],
        borderColor: 'rgba(99, 102, 241, 1)', // Indigo-500
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  });

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      const result = await createEvent('fetch_analytics_data', {});
      setAnalyticsData(result.analytics || []);
      updateChartData(result.analytics || []);
    } catch (error) {
      console.error('Error fetching analytics data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChartData = (analytics) => {
    const labels = analytics.map((dataPoint) => dataPoint.date);
    const data = analytics.map((dataPoint) => dataPoint.value);
    setChartData({
      labels,
      datasets: [
        {
          label: 'Strength Gains',
          data,
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        },
      ],
    });
  };

  onMount(() => {
    fetchAnalyticsData();
  });

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
      <h1 class="text-2xl font-bold text-purple-600 mb-4">Performance Analytics</h1>
      <Show when={!loading()} fallback={<p>Loading analytics data...</p>}>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <Line data={chartData()} options={{ responsive: true }} width={500} height={300} />
        </div>
      </Show>
    </div>
  );
}

export default PerformanceAnalytics;