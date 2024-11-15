import { createSignal, onMount } from 'solid-js';
import { createEvent } from '../supabaseClient';

function MealPlanner() {
  const [meals, setMeals] = createSignal([]);
  const [newMeal, setNewMeal] = createSignal({ mealName: '', calories: '' });
  const [loading, setLoading] = createSignal(false);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const result = await createEvent('fetch_meals', {});
      setMeals(result.meals);
    } catch (error) {
      console.error('Error fetching meals:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveMeal = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createEvent('save_meal', newMeal());
      setMeals([...meals(), newMeal()]);
      setNewMeal({ mealName: '', calories: '' });
    } catch (error) {
      console.error('Error saving meal:', error);
    } finally {
      setLoading(false);
    }
  };

  onMount(() => {
    fetchMeals();
  });

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
      <h1 class="text-2xl font-bold text-purple-600 mb-4">Meal Planner</h1>

      <form onSubmit={saveMeal} class="mb-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Meal Name"
            value={newMeal().mealName}
            onInput={(e) => setNewMeal({ ...newMeal(), mealName: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            required
          />
          <input
            type="number"
            placeholder="Calories"
            value={newMeal().calories}
            onInput={(e) => setNewMeal({ ...newMeal(), calories: e.target.value })}
            class="w-full p-3 border border-gray-300 rounded-lg box-border focus:ring-2 focus:ring-purple-400 focus:border-transparent"
            required
          />
        </div>
        <button
          type="submit"
          class={`mt-4 px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer ${loading() ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading()}
        >
          {loading() ? 'Saving...' : 'Save Meal'}
        </button>
      </form>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-purple-600 mb-4">Your Meals</h2>
        <ul>
          {meals().map((meal) => (
            <li class="mb-2">
              <span class="font-semibold">{meal.mealName}</span>: {meal.calories} calories
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default MealPlanner;