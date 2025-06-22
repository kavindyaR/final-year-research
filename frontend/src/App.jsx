import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./routes/PrivateRoute";
import Chart from "./pages/Chart";
import FileUpload from "./pages/FileUpload";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              // <PrivateRoute>
              <Dashboard />
              // </PrivateRoute>
            }
          />
          <Route path="/chart" element={<Chart />} />
          <Route path="/upload" element={<FileUpload />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
