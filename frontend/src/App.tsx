import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import { AuthProvider, useAuth } from "./AuthContext";
import Login from "./pages/LoginPage";
import SignUp from "./pages/SignUpPage";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import BookcasePage from "./pages/bookcase/BookcasePage";
import TrendingPage from "./pages/TrendingPage";
import ExplorePage from "./pages/ExplorePage";
import CreateCookbookPage from "./pages/bookcase/CreateCookbookPage";
import CookbookDetailPage from "./pages/bookcase/CookbookDetailPage";
import RecipeDetailPage from "./pages/bookcase/RecipeDetailPage";
import CreateRecipePage from "./pages/bookcase/CreateRecipePage";
import UserProfilePage from "./pages/user/UserProfilePage";

interface ProtectedRouteProps {
  children: React.ReactElement;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Bookcase Routes */}
            <Route
              path="/bookcase"
              element={
                <ProtectedRoute>
                  <BookcasePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookcase/cookbook/:id"
              element={
                <ProtectedRoute>
                  <CookbookDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookcase/recipe/:id"
              element={
                <ProtectedRoute>
                  <RecipeDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookcase/create-cookbook"
              element={
                <ProtectedRoute>
                  <CreateCookbookPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/bookcase/cookbook/:id/create-recipe"
              element={
                <ProtectedRoute>
                  <CreateRecipePage />
                </ProtectedRoute>
              }
            />

            {/* Trending Routes */}
            <Route
              path="/trending"
              element={
                <ProtectedRoute>
                  <TrendingPage />
                </ProtectedRoute>
              }
            />

            {/* Explore Routes */}
            <Route
              path="/explore"
              element={
                <ProtectedRoute>
                  <ExplorePage />
                </ProtectedRoute>
              }
            />

            {/* User Profile Routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
