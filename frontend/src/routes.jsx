import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FileUpload from "./pages/FileUpload";
import UserInfo from "./pages/UserInfo";
import NotFound from "./pages/NotFound";
import Configuration from "./pages/Configuration";

import { AuthProvider } from "./context/AuthContext";
import { Outlet } from "react-router-dom";
import PrivateRoute from "./routes/PrivateRoute";

const routes = [
  {
    path: "",
    element: (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    ),
    children: [
      {
        path: "/",
        element: (
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/upload",
        element: (
          <PrivateRoute>
            <FileUpload />
          </PrivateRoute>
        ),
      },
      {
        path: "/user-info",
        element: (
          <PrivateRoute>
            <UserInfo />
          </PrivateRoute>
        ),
      },
      {
        path: "/configuration",
        element: (
          <PrivateRoute>
            <Configuration />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
