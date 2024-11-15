import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';

function CustomWorkoutBuilder() {
  const [availableExercises, setAvailableExercises] = createSignal([]);
  const [customWorkout, setCustomWorkout] = createSignal([]);
  const [loading, setLoading] = createSignal(false);

  // Fetch available exercises from the backend
  const fetchExercises = async () => {
    setLoading(true);
    try {
      const result = await createEvent('fetch_exercises', {});
      setAvailableExercises(result.exercises || []);
    } catch (error) {
      console.error('Error fetching exercises:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchExercises();
  });

  const addExerciseToWorkout = (exercise) => {
    setCustomWorkout([...customWorkout(), exercise]);
  };

  const removeExerciseFromWorkout = (index) => {
    const updatedWorkout = customWorkout().slice();
    updatedWorkout.splice(index, 1);
    setCustomWorkout(updatedWorkout);
  };

  const saveCustomWorkout = async () => {
    setLoading(true);
    try {
      await createEvent('save_custom_workout', { exercises: customWorkout() });
      setCustomWorkout([]);
      alert('Custom workout saved successfully!');
    } catch (error) {
      console.error('Error saving custom workout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
      <h1 class="text-2xl font-bold text-purple-600 mb-4">Custom Workout Builder</h1>
      <div class="flex flex-col md:flex-row gap-8">
        <div class="w-full md:w-1/2">
          <h2 class="text-xl font-semibold text-purple-600 mb-2">Available Exercises</h2>
          <Show when={!loading()} fallback={<p>Loading exercises...</p>}>
            <ul class="max-h-[400px] overflow-y-auto">
              <For each={availableExercises()}>
                {(exercise) => (
                  <li
                    class="p-2 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                    onClick={() => addExerciseToWorkout(exercise)}
                  >
                    {exercise.name}
                  </li>
                )}
              </For>
            </ul>
          </Show>
        </div>
        <div class="w-full md:w-1/2">
          <h2 class="text-xl font-semibold text-purple-600 mb-2">Your Custom Workout</h2>
          <ul class="max-h-[400px] overflow-y-auto">
            <For each={customWorkout()}>
              {(exercise, index) => (
                <li class="p-2 border-b border-gray-200 flex justify-between items-center">
                  {exercise.name}
                  <button
                    class="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => removeExerciseFromWorkout(index())}
                  >
                    Remove
                  </button>
                </li>
              )}
            </For>
          </ul>
          <button
            class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() || customWorkout().length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            onClick={saveCustomWorkout}
            disabled={loading() || customWorkout().length === 0}
          >
            <Show when={loading()}>
              Saving...
            </Show>
            <Show when={!loading()}>
              Save Custom Workout
            </Show>
          </button>
        </div>
      </div>
    </div>
  );
}

export default CustomWorkoutBuilder;