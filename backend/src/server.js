import "../instrument.mjs";
import express from "express";

console.log("✅ Step 1: Imports loaded");

// Conditionally load dotenv only in development
if (process.env.NODE_ENV !== "production") {
  console.log("Loading dotenv for development...");
  await import("dotenv/config");
}

console.log("✅ Step 2: Environment loaded");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("MONGO_URI exists:", !!process.env.MONGO_URI);

import { ENV } from "./config/env.js";
import { connectDB } from "./config/db.js";
import { clerkMiddleware } from "@clerk/express";
import { functions, inngest } from "./config/inngest.js";
import { serve } from "inngest/express";
import chatRoutes from "./routes/chat.route.js";
import cors from "cors";
import * as Sentry from "@sentry/node";

console.log("✅ Step 3: All modules imported");

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

console.log("✅ Step 4: Middleware configured");

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

console.log("✅ Step 5: Routes configured");

const startServer = async () => {
  try {
    console.log("🚀 Step 6: Starting server...");
    console.log("📍 PORT:", process.env.PORT);
    console.log("📍 ENV.PORT:", ENV.PORT);
    console.log("🔧 Environment:", ENV.NODE_ENV);
    console.log("🌐 Client URL:", ENV.CLIENT_URL);

    const PORT = process.env.PORT || 8080;
    console.log("📍 Final PORT selected:", PORT);

    console.log("🔌 Attempting MongoDB connection...");
    console.log("🔌 MONGO_URI exists:", !!ENV.MONGO_URI);
    console.log(
      "🔌 MONGO_URI preview:",
      ENV.MONGO_URI?.substring(0, 20) + "..."
    );

    await connectDB();
    console.log("✅ MongoDB connected successfully");

    app.listen(PORT, "0.0.0.0", () => {
      console.log(`✅ Server listening on port: ${PORT}`);
      console.log(`🌍 Host: 0.0.0.0`);
      console.log(`🎉 Application fully started!`);
    });
  } catch (error) {
    console.error("❌ FATAL ERROR starting server:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    process.exit(1);
  }
};

console.log("✅ Step 7: Calling startServer...");
startServer();

export default app;
