import { createSignal, onMount, Show } from 'solid-js';
import { supabase } from '../supabaseClient';
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
import * as Sentry from "@sentry/browser";

Chart.register(Title, Tooltip, Legend, Colors, LineElement, PointElement, CategoryScale, LinearScale);

function WorkoutTracker() {
  const [workouts, setWorkouts] = createSignal([]);
  const [newWorkout, setNewWorkout] = createSignal({ exercise: '', sets: '', reps: '', weight: '' });
  const [loading, setLoading] = createSignal(false);
  const [chartData, setChartData] = createSignal({
    labels: [],
    datasets: [
      {
        label: 'Total Volume',
        data: [],
        borderColor: 'rgba(99, 102, 241, 1)', // Indigo-500
        backgroundColor: 'rgba(99, 102, 241, 0.2)',
      },
    ],
  });

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/getWorkouts', {
        headers: {
          'Authorization': `Bearer ${session.access_token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        setWorkouts(data);
        updateChartData(data);
      } else {
        console.error('Error fetching workouts:', response.statusText);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const response = await fetch('/api/saveWorkout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWorkout()),
      });
      if (response.ok) {
        const savedWorkout = await response.json();
        setWorkouts([...workouts(), savedWorkout]);
        updateChartData([...workouts(), savedWorkout]);
        setNewWorkout({ exercise: '', sets: '', reps: '', weight: '' });
      } else {
        console.error('Error saving workout');
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error saving workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChartData = (workoutsData) => {
    const labels = workoutsData.map((w) => new Date(w.date).toLocaleDateString());
    const data = workoutsData.map((w) => Number(w.weight) * Number(w.reps) * Number(w.sets));
    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Volume',
          data,
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        },
      ],
    });
  };

  onMount(() => {
    fetchWorkouts();
  });

  return (
    <div class="h-full bg-gray-100">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
        <h1 class="text-2xl font-bold text-purple-600 mb-4">Workout Tracker</h1>

        <form onSubmit={saveWorkout} class="mb-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Exercise"
              value={newWorkout().exercise}
              onInput={(e) => setNewWorkout({ ...newWorkout(), exercise: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Sets"
              value={newWorkout().sets}
              onInput={(e) => setNewWorkout({ ...newWorkout(), sets: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Reps"
              value={newWorkout().reps}
              onInput={(e) => setNewWorkout({ ...newWorkout(), reps: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
            <input
              type="number"
              placeholder="Weight"
              value={newWorkout().weight}
              onInput={(e) => setNewWorkout({ ...newWorkout(), weight: e.target.value })}
              class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
              required
            />
          </div>
          <button
            type="submit"
            class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${
              loading() ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={loading()}
          >
            {loading() ? 'Saving...' : 'Save Workout'}
          </button>
        </form>

        <div class="bg-white p-6 rounded-lg shadow-md">
          <h2 class="text-xl font-semibold text-purple-600 mb-4">Progress Chart</h2>
          <Show when={!loading()} fallback={<p>Loading chart...</p>}>
            <Line data={chartData()} options={{ responsive: true }} width={500} height={300} />
          </Show>
        </div>
      </div>
    </div>
  );
}

export default WorkoutTracker;