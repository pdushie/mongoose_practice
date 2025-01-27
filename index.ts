// index.ts
import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase");
//mongoose.connect("mongodb://given-daphna-webd5010-6e02a7e6.koyeb.app/mydatabase");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        info: {
          title: "Bun Elysia API Documentation",
          version: "1.0.0",
        },
      },
    })
  );

// Register routes
userRoutes(app);

app.listen(3000);
console.log(`Elysia is running at ${app.server?.hostname}:${app.server?.port} by Ryan`);