// src/Auth.js
import React, { useState } from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "./firebase";

const Auth = ({ setUser }) => {
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-52 gap-2">
      <h2>Login with Google</h2>
      <button className="p-1 border  rounded hover:bg-pink-300 text-white" onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing In..." : "Sign In with Google"}
      </button>
    </div>
  );
};

export default Auth;
