# Fitness Web App

## Overview

Fitness Web App is a comprehensive platform designed to help users manage their fitness journey effectively. The app offers a range of features including workout tracking, meal planning, custom workout creation, social sharing, and performance analytics to monitor progress.

## Features

1. **Workout Tracking and Progress Charts**

   - Users can log their daily workouts, including exercises performed, sets, reps, and weights.
   - The app displays progress over time through interactive charts, allowing users to visualize their improvements and stay motivated.
   - Users can view their workout history and analyze performance trends.

2. **Meal Planning System**

   - Users can create weekly meal plans tailored to their fitness goals.
   - The app provides nutritional information for meals, helping users maintain a balanced diet.
   - Users can track caloric intake and macronutrient distribution.

3. **Custom Workout Builder**

   - Users can design custom workout routines by selecting exercises from a comprehensive database.
   - Workouts can be saved and edited for future use.
   - Users can set specific goals for each workout session.

4. **Social Features for Sharing**

   - Users can share their workout routines and progress with friends.
   - The app allows for connection with other fitness enthusiasts to motivate each other.
   - Users can view and follow popular workout plans shared by the community.

5. **Performance Analytics Dashboard**

   - A dedicated dashboard provides in-depth analytics of the user's fitness data.
   - Users can track key performance indicators such as strength gains, endurance, and body measurements.
   - The dashboard offers insights to help users adjust their fitness plans accordingly.

## User Journey

1. **Authentication**

   - Users sign in with ZAPT using their preferred method (email magic link, Google, Facebook, or Apple).
   - New users are guided through a brief onboarding process to set up their profile.

2. **Dashboard Access**

   - Upon signing in, users are directed to the home page featuring their Performance Analytics Dashboard.
   - The dashboard displays a summary of recent workouts, meal plans, and key performance metrics.

3. **Logging Workouts**

   - Users navigate to the Workout Tracking section to record their exercises.
   - They input details such as exercise name, sets, reps, and weights.
   - Upon saving, the data is reflected in the progress charts.

4. **Creating Custom Workouts**

   - In the Custom Workout Builder, users select exercises to create personalized routines.
   - They can organize exercises in the desired sequence and set target goals.
   - Custom workouts can be saved and accessed anytime.

5. **Meal Planning**

   - Users access the Meal Planning section to create daily or weekly meal plans.
   - They can add meals and view nutritional information.
   - The app tracks caloric and macronutrient intake against user goals.

6. **Social Sharing**

   - Users can share their progress and custom workouts with friends via the Social section.
   - They can search for and follow other users to view shared content.
   - The app provides options to like and comment on shared workouts.

7. **Analyzing Performance**

   - The Performance Analytics Dashboard offers detailed charts and graphs.
   - Users can filter data by date range, exercise type, and other criteria.
   - Insights help users make informed decisions about their fitness routines.

## External APIs Used

- **Nutrition API**: Provides nutritional information for meals. (Requires API key)
- **Fitness Data API**: Supplies exercise details and recommendations. (Requires API key)

---

**Note:** API keys for external services should be configured in the `.env` file.
