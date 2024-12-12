import express from "express";
import usersRoutes from "./routes/users";
import cookbooksRoutes from "./routes/cookbooks";
import recipesRoutes from "./routes/recipes";
import authenticationRoutes from "./routes/auth";

const app = express();

app.use(express.json());

// Routes
app.use("/users", usersRoutes);
app.use("/cookbooks", cookbooksRoutes);
app.use("/recipes", recipesRoutes);
app.use("/auth", authenticationRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
