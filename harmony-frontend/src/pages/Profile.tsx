import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Profile() {
    const [user, setUser] = useState<any>(null);
    const [username, setUsername] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        async function fetchUser() {
            try {
                const res = await axiosClient.get("/users/me", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUser(res.data);
                setUsername(res.data.name);
            } catch(err) {
                console.error("Error loading profile");
            }
        }
        fetchUser();
    }, []);

    async function handleUpdateName(e: React.FormEvent) {
        e.preventDefault();
        try {
            const res = await axiosClient.patch(
                "/users/me",
                { username },
                { headers: { Authorization: `Bearer ${token}` }}
            );
            setUser(res.data);
            alert("Name updated");
        } catch (err) {
            console.error("Error updating name", err);
        }
    }

    if (!user) return <p>Loading...</p>;

    return (
        <div className="profile-page">
            <h2>Profile</h2>
            <p>Email: {user.email}</p>

            <form onSubmit={handleUpdateName}>
                <label>Name:</label>
                <input className="profile-input" value={username} onChange={(e) => setUsername(e.target.value)} />
                <button type="submit">Update</button>
            </form>

            <h3>Your Messages</h3>
            <ul>
                {user.messages.map((msg: any) => (
                    <li key={msg.id}>{msg.content}</li>
                ))};
            </ul>
        </div>
    );
}