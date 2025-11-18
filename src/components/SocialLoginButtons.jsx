import { signInWithPopup } from "firebase/auth";
import { auth, providerGoogle } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function SocialLoginButtons() {
  const navigate = useNavigate();

  const handleGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, providerGoogle);
      const user = result.user;
      console.log("Google login successful:", user);
      navigate("/");
    } catch (error) {
      console.error("Google login error:", error.message);
      alert(error.message);
    }
  };

  const handleMicrosoft = () => {
    alert("Microsoft login not yet configured");
  };

  return (
    <div className="social-login">
      <p className="social-text">or continue with</p>
      <div className="social-buttons">
        <button className="google-btn" onClick={handleGoogle}>Google</button>
        <button className="microsoft-btn" onClick={handleMicrosoft}>Microsoft</button>
      </div>
    </div>
  );
}
