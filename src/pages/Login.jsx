import AuthForm from "../components/AuthForm";
import "../components/Auth.css";
import { toast } from "react-toastify";

export default function Login() {
  const handleLoginSuccess = () => {
    toast.success("Login Successful");
  };

  const handleLoginFail = () => {
    toast.error("Login Failed");
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Login</h1>
        <p>Get access to your Orders, Wishlist and Recommendations</p>
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Login Illustration"
          className="auth-image"
        />
      </div>

      <div className="auth-right">
        <AuthForm
          type="login"
          title="Login to your account"
          buttonText="Login"
          onSuccess={handleLoginSuccess}
          onError={handleLoginFail}
        />

        <p className="auth-terms">
          By continuing, you agree to Flipkart's{" "}
          <span className="auth-link">Terms of Use</span> and{" "}
          <span className="auth-link">Privacy Policy</span>.
        </p>
      </div>
    </div>
  );
}
