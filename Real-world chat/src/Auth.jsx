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
    <div>
      <h2>Login with Google</h2>
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing In..." : "Sign In with Google"}
      </button>
    </div>
  );
};

export default Auth;
