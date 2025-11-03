import { useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Signup() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axiosClient.post("/auth/signup", {email, username, password})
            setMessage(res.data.message || "Signup successful!");
        } catch (err: any) {
            setMessage(err.response?.data?.error || "Error signing up");
        }
    };

    return (
        <div className="signup-container">
            <h2 className="signup-title">Signup</h2>
            <form className="signup-form" onSubmit={handleSignup}>
                <input 
                    type="email"
                    placeholder="Email"
                    className="signup-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Username"
                    className="signup-input"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="text"
                    placeholder="Password"
                    className="signup-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="bg-blue-500 text-white p-2 rounded w-full">Sign up</button>
            </form>
            {message && <p className="mt-4">{message}</p>}
        </div>
    );
}