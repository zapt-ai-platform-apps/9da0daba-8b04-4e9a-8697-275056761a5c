# Fitness Web App

## Overview

The Fitness Web App is a comprehensive platform designed to help users manage their fitness journey effectively. The app offers a range of features including workout tracking, meal planning, custom workout creation, social sharing, and performance analytics to monitor progress.

## Features

1. **Workout Tracking and Progress Charts**

   - Log daily workouts, including exercises performed, sets, reps, and weights.
   - View progress over time through interactive charts.
   - Analyze performance trends and improvements.

2. **Meal Planning System**

   - Create daily meal plans tailored to fitness goals.
   - Add meals and track nutritional information, including calories.
   - Monitor caloric intake against dietary goals.

3. **Custom Workout Builder**

   - Design custom workout routines by selecting exercises from a comprehensive database.
   - Save and edit workouts for future use.
   - Set specific goals for each workout session.

4. **Social Features for Sharing**

   - Share workout routines and progress with friends.
   - Connect with other fitness enthusiasts to motivate each other.
   - View and follow popular workout plans shared by the community.

5. **Performance Analytics Dashboard**

   - Access a dedicated dashboard providing in-depth analytics of fitness data.
   - Track key performance indicators such as strength gains and endurance.
   - Filter data by date range, exercise type, and other criteria.

6. **Error Monitoring with Sentry**

   - The app utilizes Sentry to capture and monitor errors both on the front-end and back-end.
   - Ensures that any issues are logged and can be addressed promptly for a seamless user experience.

## User Journey

1. **Authentication**

   - Users sign in with ZAPT using their preferred method (email magic link, Google, Facebook, or Apple).
   - New users are guided through a brief onboarding process to set up their profile.

2. **Dashboard Access**

   - Upon signing in, users are directed to the home page featuring their Performance Analytics Dashboard.
   - The dashboard displays a summary of recent workouts, meal plans, and key performance metrics.

3. **Logging Workouts**

   - Navigate to the Workout Tracker to record exercises.
   - Input details such as exercise name, sets, reps, and weights.
   - Save the workout to update progress charts and analytics.

4. **Creating Custom Workouts**

   - Access the Custom Workout Builder to create personalized routines.
   - Select exercises from the database and organize them in the desired sequence.
   - Save custom workouts for future use.

5. **Meal Planning**

   - Use the Meal Planner to create daily meal plans.
   - Add meals and input nutritional information.
   - Track caloric intake and compare it against fitness goals.

6. **Social Sharing**

   - Share progress and custom workouts with friends via the Social Sharing section.
   - Search for and follow other users to view shared content.
   - Like and comment on shared workouts.

7. **Analyzing Performance**

   - Utilize the Performance Analytics Dashboard to view detailed charts and graphs.
   - Apply filters to analyze specific aspects of performance.
   - Use insights to adjust fitness plans accordingly.

## External APIs Used

- **Nutrition API**: Provides nutritional information for meals. (Requires API key)
- **Exercise API**: Supplies exercise details and recommendations. (Requires API key)

---

**Note:** API keys for external services should be configured in the `.env` file. Please ensure to add `NEON_DB_URL` and other necessary environment variables.
