import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

export default function Signup() {
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        async function fetchMessages() {
            try {
                const res = await axiosClient.get("/messages");
                setMessages(res.data);
            } catch (err) {
                console.error("Error fecthing messages", err);
            }
        }
        fetchMessages();
    }, []);

    return (
        <div className="message-container">
            <h2 className="message-title">Messages</h2>
            <ul>
                {messages.map((msg) => (
                    <li key={msg.id} className="message-item">
                        {msg.content}
                    </li>
                ))}
            </ul>
        </div>
    );
}