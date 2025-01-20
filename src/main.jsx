import { StrictMode, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
  useNavigate,
} from "react-router-dom";

import LoginPage from "./Component/LoginPage.jsx";
import SignupPage from "./Component/SignupPage.jsx";

// Utility to simulate authentication status
const isAuthenticated = () => {
  return localStorage.getItem("authToken") ? true : false;
};

// Component to protect authenticated routes (e.g., HomePage)
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Component to protect guest routes (e.g., Login, Signup)
const GuestRoute = ({ children }) => {
  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }
  return children;
};

// Home Page (Protected Route)
const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return <App />;
};

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <GuestRoute>
        <LoginPage />
      </GuestRoute>
    ),
  },
  {
    path: "/signup",
    element: (
      <GuestRoute>
        <SignupPage />
      </GuestRoute>
    ),
  },
]);

// Render the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
