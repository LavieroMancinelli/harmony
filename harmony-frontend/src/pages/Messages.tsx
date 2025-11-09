import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { io } from "socket.io-client";

export default function Signup() {
    const [messages, setMessages] = useState<any[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const socket = io("https://effective-space-fiesta-6944jwqq7v45f54v7-4000.app.github.dev");

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await axiosClient.get("/messages");
                setMessages(res.data);
            } catch (err) {
                console.error("Error fetching messages", err);
            }
        }
        fetchMessages();
        const handleNewMessage = (msg: any) => {
            setMessages((prev) => [msg, ...prev]);
        }

        socket.on("newMessage", handleNewMessage);

        return () => { socket.off("newMessage", handleNewMessage) };
    }, []);

    async function handleSendMessage(e: React.FormEvent) {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            alert("You must be logged in to post a message!");
            return;
        }

        try {
            await axiosClient.post(
                "/messages",
                { content: newMessage },
                { headers: { Authorization: `Bearer ${token}`  } }
            );
            setNewMessage("");
            const res = await axiosClient.get("/messages");
            setMessages(res.data);
        } catch (err) {
            console.error("Error posting message", err);
            alert("Failed to send message");
        }
    }

    return (
        <div className="message-page">
            <h2 className="message-page-title">Messages</h2>

            <form className="message-form" onSubmit={handleSendMessage}>
                <textarea 
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="message-input"
                    />
                <button type="submit" className="send-button">Send</button>
            </form>

            <ul className="message-list">
                {messages.map((msg) => (
                    <li key={msg.id} className="message-item">
                        <strong>{msg.user?.username || msg.user?.email || "Unknown User"}:</strong> {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}