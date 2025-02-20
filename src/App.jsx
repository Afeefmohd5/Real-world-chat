// src/App.js
import React, { useState, useEffect } from "react";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import Auth from "./Auth";
import Chat from "./Chat";

const App = () => {
  const [user, setUser] = useState(null);

  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="g-1">
      <h1>Real-time Chat App</h1>
      {user ? <Chat user={user} /> : <Auth setUser={setUser} />}
    </div>
  );
};

export default App;

