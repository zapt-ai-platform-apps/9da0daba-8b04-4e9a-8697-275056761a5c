import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';

function SocialSharing() {
  const [sharedWorkouts, setSharedWorkouts] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  const fetchSharedWorkouts = async () => {
    setLoading(true);
    try {
      const result = await createEvent('fetch_shared_workouts', {});
      setSharedWorkouts(result.workouts || []);
    } catch (error) {
      console.error('Error fetching shared workouts:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchSharedWorkouts();
  });

  const likeWorkout = async (workoutId) => {
    try {
      await createEvent('like_workout', { workoutId });
      // Optionally update the local state to reflect the like
    } catch (error) {
      console.error('Error liking workout:', error);
    }
  };

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
      <h1 class="text-2xl font-bold text-purple-600 mb-4">Social Sharing</h1>
      <Show when={!loading()} fallback={<p>Loading shared workouts...</p>}>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <For each={sharedWorkouts()}>
            {(workout) => (
              <div class="bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
                <h2 class="text-xl font-semibold text-purple-600">{workout.title}</h2>
                <p class="text-gray-700 mt-2">{workout.description}</p>
                <div class="mt-4 flex items-center">
                  <button
                    class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition cursor-pointer"
                    onClick={() => likeWorkout(workout.id)}
                  >
                    Like ({workout.likes})
                  </button>
                </div>
              </div>
            )}
          </For>
        </div>
      </Show>
    </div>
  );
}

export default SocialSharing;