import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
});

Sentry.configureScope(scope => {
  scope.setTag("type", "backend");
  scope.setTag("projectId", process.env.PROJECT_ID || 'unknown');
});

export function sentryWrapper(handler) {
  return async (req, res) => {
    try {
      await handler(req, res);
    } catch (error) {
      Sentry.captureException(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}

import { initializeZapt } from '@zapt/zapt-js';

const { supabase } = initializeZapt(process.env.VITE_PUBLIC_APP_ID);

export async function authenticateUser(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new Error('Missing Authorization header');
  }

  const token = authHeader.split(' ')[1];
  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error) {
    throw new Error('Invalid token');
  }

  return user;
}