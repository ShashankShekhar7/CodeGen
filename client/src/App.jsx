import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Playground from "./pages/Playground";
import RequireAuth from "./auth/RequireAuth";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/playground"
          element={
            <RequireAuth>
              <Playground />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/playground" replace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
