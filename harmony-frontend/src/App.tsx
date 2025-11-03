import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Messages from "./pages/Messages";
import './App.css'

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/signup">Signup</Link>
        <Link to="/login">Login</Link>
        <Link to="/messages">Messages</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </BrowserRouter>
  );
}

