// src/Chat.js
import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import { collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";
import { signOut } from "firebase/auth";

const Chat = ({ user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // Handle message submission
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: message,
        uid: user.uid,
        displayName: user.displayName,
        timestamp: new Date(),
      });
      setMessage(""); // Clear message input
    }
  };

  // Listen to real-time updates from Firestore
  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map((doc) => doc.data());
      setMessages(messagesData);
    });

    return () => unsubscribe();
  }, []);

  // Handle sign out
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <div>
      <h2>Welcome, {user.displayName}</h2>
      <button onClick={handleSignOut}>Sign Out</button>
      <div>
        <div>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.displayName}</strong>: {msg.text}
            </div>
          ))}
        </div>

        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
