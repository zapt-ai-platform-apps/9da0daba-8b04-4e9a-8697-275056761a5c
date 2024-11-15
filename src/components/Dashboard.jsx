import { useNavigate } from '@solidjs/router';

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 h-full">
      <h1 class="text-2xl font-bold text-purple-600 mb-4">Dashboard</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/workout-tracker')}
        >
          <h2 class="text-xl font-semibold text-purple-600">Workout Tracker</h2>
          <p class="text-gray-700 mt-2">Log your workouts and track your progress over time.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/meal-planner')}
        >
          <h2 class="text-xl font-semibold text-purple-600">Meal Planner</h2>
          <p class="text-gray-700 mt-2">Plan your meals and manage your nutrition.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/custom-workout-builder')}
        >
          <h2 class="text-xl font-semibold text-purple-600">Custom Workout Builder</h2>
          <p class="text-gray-700 mt-2">Create personalized workout routines.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/social-sharing')}
        >
          <h2 class="text-xl font-semibold text-purple-600">Social Sharing</h2>
          <p class="text-gray-700 mt-2">Share your progress and connect with others.</p>
        </div>
        <div
          class="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:shadow-xl transition"
          onClick={() => navigate('/performance-analytics')}
        >
          <h2 class="text-xl font-semibold text-purple-600">Performance Analytics</h2>
          <p class="text-gray-700 mt-2">Analyze your performance and adjust your goals.</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;