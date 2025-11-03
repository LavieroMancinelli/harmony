import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/auth/login", {email, password})
            localStorage.setItem("token", res.data.token);
            setMessage("Login successful!");
        } catch (err: any) {
            setMessage(err.response?.data?.error || "Error logging in");
        }
    };

    return (
        <div className="login-container">
            <h2 className="login-title">Login</h2>
            <form className="login-form" onSubmit={handleLogin}>
                <input 
                    type="email"
                    placeholder="Email"
                    className="login-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    className="login-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="login-button">Login</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}