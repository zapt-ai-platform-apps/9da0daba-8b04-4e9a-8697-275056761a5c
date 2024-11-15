import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';
import { Chart, Title, Tooltip, Legend, Colors, LineElement, PointElement, CategoryScale, LinearScale } from 'chart.js';
import { Line } from 'solid-chartjs';

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
      }
    ]
  });

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const result = await createEvent('fetch_workouts', {});
      setWorkouts(result.workouts);
      updateChartData(result.workouts);
    } catch (error) {
      console.error('Error fetching workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveWorkout = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent('save_workout', newWorkout());
      setWorkouts([...workouts(), newWorkout()]);
      updateChartData([...workouts(), newWorkout()]);
      setNewWorkout({ exercise: '', sets: '', reps: '', weight: '' });
    } catch (error) {
      console.error('Error saving workout:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateChartData = (workoutsData) => {
    const labels = workoutsData.map((_, idx) => `Workout ${idx + 1}`);
    const data = workoutsData.map(w => Number(w.weight) * Number(w.reps) * Number(w.sets));
    setChartData({
      labels,
      datasets: [
        {
          label: 'Total Volume',
          data,
          borderColor: 'rgba(99, 102, 241, 1)',
          backgroundColor: 'rgba(99, 102, 241, 0.2)',
        }
      ]
    });
  };

  onMount(() => {
    fetchWorkouts();
  });

  return (
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
          class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Saving...' : 'Save Workout'}
        </button>
      </form>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-purple-600 mb-4">Progress Chart</h2>
        <Line data={chartData()} options={{ responsive: true }} width={500} height={300} />
      </div>
    </div>
  );
}

export default WorkoutTracker;