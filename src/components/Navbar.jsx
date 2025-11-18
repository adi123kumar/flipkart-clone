import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { auth } from "../firebase";        
import { onAuthStateChanged, signOut } from "firebase/auth";  

export default function Navbar() {
  const [user, setUser] = useState(null);
  const searchRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const items = useSelector((state) => state.cart?.items || []);
  const cartCount = items.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleSearch = () => {
    const query = searchRef.current.value;
    console.log("Search:", query);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(clearCart());
      localStorage.removeItem("cartItems");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    }
  };

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <h2>Flipkart</h2>
        </Link>
      </div>

      <div className="nav-center">
        <input
          ref={searchRef}
          type="text"
          placeholder="Search for products, brands and more"
          className="search-input"
        />
        <button className="search-btn" onClick={handleSearch}>
          🔍
        </button>
      </div>

      <div className="nav-right">
        {user ? (
          <>
            <span className="welcome-text">
              Welcome,{" "}
              {user.displayName
                ? user.displayName
                : user.email
                ? user.email.split("@")[0]
                : "User"}
            </span>
            <button onClick={handleLogout} className="nav-logout-btn">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
        )}

        <Link to="/cart" className="cart-btn">
          🛒 Cart ({cartCount})
        </Link>

        <a href="#" className="nav-seller">
          Become a Seller
        </a>
      </div>
    </nav>
  );
}
