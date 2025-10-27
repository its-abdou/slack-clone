// Initialize Sentry FIRST, before any other imports
import * as Sentry from "@sentry/node";

// Conditionally load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  await import("dotenv/config");
}

// Import ENV after dotenv is loaded
import { ENV } from "./config/env.js";

// Initialize Sentry with error handling
if (ENV.SENTRY_DSN) {
  try {
    Sentry.init({
      dsn: ENV.SENTRY_DSN,
      tracesSampleRate: 1.0,
      profilesSampleRate: 1.0,
      environment: ENV.NODE_ENV || "production",
      includeLocalVariables: true,
      sendDefaultPii: true,
    });
  } catch (error) {
    console.error("Failed to initialize Sentry:", error.message);
  }
}

import express from "express";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: [ENV.CLIENT_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(clerkMiddleware());

app.get("/debug-sentry", (req, res) => {
  throw new Error("My first Sentry error!");
});

app.get("/", (req, res) => {
  res.send("Hello World! 123");
});

app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/chat", chatRoutes);

Sentry.setupExpressErrorHandler(app);

const startServer = async () => {
  try {
    const PORT = process.env.PORT || 8080;

    await connectDB();

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();

export default app;
