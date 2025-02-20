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
    <div className="flex flex-col items-center gap-5  ">
      <h2 className="text-2xl text-pink-600">WELCOME, {user.displayName}.</h2>
      <button className="p-1 border w-24 rounded hover:bg-pink-300 text-white" onClick={handleSignOut}>SIGN OUT</button>
      <div className="gap-2">

        <div className="flex flex-col items-center justify-between gap-8">
          <div>
            {messages.map((msg, index) => (
              <div key={index}>
                <strong className="text-red-100">{msg.displayName}</strong>: {msg.text}
              </div>
            ))}
          </div>

          <form className="flex items-center gap-2" onSubmit={handleSendMessage}>
            <input className="p-1 border rounded w-52 "
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button className="p-1 border w-16 rounded hover:bg-pink-300 text-white" type="submit">Send</button>
          </form>

        </div>
      </div>
    </div>
  );
};

export default Chat;
