import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth } from "../firebase";
import "./Auth.css";
import SocialLoginButtons from "./SocialLoginButtons";
import { toast } from "react-toastify";

export default function AuthForm({ type, title, buttonText }) {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (type === "signup") {
        const userCred = await createUserWithEmailAndPassword(auth, email, password);
        if (name) await updateProfile(userCred.user, { displayName: name });

        toast.success("Signup successful");
        navigate("/login");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Login successful");
        navigate("/");
      }
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">{title}</h2>

        <form className="auth-form" onSubmit={handleSubmit}>
          {type === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="error-text">{error}</p>}

          <button type="submit" className="auth-btn">{buttonText}</button>
        </form>

        <SocialLoginButtons />

        <p className="auth-footer">
          {type === "signup" ? (
            <>
              Already have an account?{" "}
              <Link to="/login" className="auth-link">Login</Link>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <Link to="/signup" className="auth-link">Sign Up</Link>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
