import AuthForm from "../components/AuthForm";
import "../components/Auth.css";

export default function Signup() {
  return (
    <div className="auth-page">
      <div className="auth-left">
        <h1>Looks like you're new here!</h1>
        <p>Sign up with your email or Google/Microsoft account to get started</p>
        <img
          src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/login_img_c4a81e.png"
          alt="Signup Illustration"
          className="auth-image"
        />
      </div>

      <div className="auth-right">
        <AuthForm
          type="signup"
          title="Create your account"
          buttonText="Sign Up"
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
