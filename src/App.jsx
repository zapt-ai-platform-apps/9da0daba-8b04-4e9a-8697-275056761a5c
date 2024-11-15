import { createSignal, onMount } from 'solid-js';
import { supabase } from './supabaseClient';
import { Routes, Route, Navigate } from '@solidjs/router';
import { Auth } from '@supabase/auth-ui-solid';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import * as Sentry from "@sentry/browser";

// Import components
import Dashboard from './components/Dashboard';
import WorkoutTracker from './components/WorkoutTracker';
import MealPlanner from './components/MealPlanner';
import CustomWorkoutBuilder from './components/CustomWorkoutBuilder';
import SocialSharing from './components/SocialSharing';
import PerformanceAnalytics from './components/PerformanceAnalytics';

function App() {
  const [user, setUser] = createSignal(null);

  const checkUserSignedIn = async () => {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        throw error;
      }
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error checking user signed in:', error);
    }
  };

  onMount(() => {
    checkUserSignedIn();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      try {
        if (session?.user) {
          setUser(session.user);
        } else {
          setUser(null);
        }
      } catch (error) {
        Sentry.captureException(error);
        console.error('Error in auth state change:', error);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  });

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      Sentry.captureException(error);
      console.error('Error signing out:', error);
    }
  };

  return (
    <div class="min-h-screen bg-gray-100">
      {user() ? (
        <>
          <nav class="bg-white shadow">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex items-center justify-between h-16">
                <div class="flex items-center">
                  <img class="h-8 w-8 mr-2" src="https://otebnzqfzytqyyjdfhzr.supabase.co/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=512&height=512" alt="Fitness App Logo" />
                  <span class="text-xl font-bold text-purple-600">Fitness Web App</span>
                </div>
                <div>
                  <button
                    class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 cursor-pointer"
                    onClick={handleSignOut}
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </nav>

          <Routes>
            <Route path="/" component={Dashboard} />
            <Route path="/workout-tracker" component={WorkoutTracker} />
            <Route path="/meal-planner" component={MealPlanner} />
            <Route path="/custom-workout-builder" component={CustomWorkoutBuilder} />
            <Route path="/social-sharing" component={SocialSharing} />
            <Route path="/performance-analytics" component={PerformanceAnalytics} />
            <Route path="*" element={<Navigate href="/" />} />
          </Routes>
        </>
      ) : (
        <div class="flex items-center justify-center h-full">
          <div class="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
            <h2 class="text-3xl font-bold mb-6 text-center text-purple-600">Sign in with ZAPT</h2>
            <a
              href="https://www.zapt.ai"
              target="_blank"
              rel="noopener noreferrer"
              class="text-blue-500 hover:underline mb-6 block text-center"
            >
              Learn more about ZAPT
            </a>
            <Auth
              supabaseClient={supabase}
              appearance={{ theme: ThemeSupa }}
              providers={['google', 'facebook', 'apple']}
              magicLink={true}
              showLinks={false}
              view="magic_link"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;