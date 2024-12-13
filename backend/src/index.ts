import express from "express";
import usersRoutes from "./routes/users";
import cookbooksRoutes from "./routes/cookbooks";
import recipesRoutes from "./routes/recipes";
import authenticationRoutes from "./routes/auth";
import cors from "cors";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  })
);
app.use(express.json());
// Routes
app.use("/users", usersRoutes);
app.use("/cookbooks", cookbooksRoutes);
app.use("/recipes", recipesRoutes);
app.use("/auth", authenticationRoutes);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
