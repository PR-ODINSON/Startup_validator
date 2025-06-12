import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard";
import Landing from "./Pages/Landing";
import Profile from "./pages/Profile";
import Report from "./pages/Report";
import SubmitIdea from "./Pages/SubmitIdea";





function App() {
  const isLoggedIn = true; // Replace with real auth logic

  return (
    <Router>
      <Routes>
        <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/submit" element={isLoggedIn ? <SubmitIdea /> : <Navigate to="/login" />} />
        <Route path="/dashboard" element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/report/:id" element={isLoggedIn ? <Report /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

      </Routes>
    </Router>
  );
}

export default App;
