import express from "express";
import usersRoutes from "./routes/users";
import cookbooksRoutes from "./routes/cookbooks";
import recipesRoutes from "./routes/recipes";
import authenticationRoutes from "./routes/auth";
import cors from "cors";
import { authenticateToken } from "./middleware/authMiddleware";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
  })
);
app.use(express.json());

app.use("/auth", authenticationRoutes);

// app.use(authenticateToken);

// Routes
app.use("/users", usersRoutes);
app.use("/cookbooks", cookbooksRoutes);
app.use("/recipes", recipesRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
