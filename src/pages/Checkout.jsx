import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import StarIcon from "@mui/icons-material/Star";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";
import { clearBuyNow } from "../redux/cartSlice";
import "./Checkout.css";

export default function Checkout() {
  const [expanded, setExpanded] = useState("panel1");
  const [activeStep, setActiveStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState({
    login: false,
    address: false,
    summary: false,
  });
  const [selectedAddress, setSelectedAddress] = useState("");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const buyNowItem = useSelector((state) => state.cart.buyNow);
  const cartItemsRedux = useSelector((state) => state.cart.items);
  const cartItems = buyNowItem ? [buyNowItem] : cartItemsRedux;

  const totalPrice = cartItems.reduce(
    (sum, i) => sum + Number(i.oldPrice || i.price) * i.quantity,
    0
  );
  const totalPayable = cartItems.reduce(
    (sum, i) => sum + Number(i.price) * i.quantity,
    0
  );
  const totalSavings = totalPrice - totalPayable;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (current) => {
      setUser(current);
      if (current) {
        setCompletedSteps((prev) => ({ ...prev, login: true }));
        setActiveStep(2);
        setExpanded("panel2");
      }
    });
    return unsub;
  }, []);

  const handleChange = (panel) => (e, expanded) => {
    const step = Number(panel.replace("panel", ""));
    if (step <= activeStep) setExpanded(expanded ? panel : false);
  };

  const handleContinue = (step) => {
    if (step === "login" && !user) return navigate("/login");
    setCompletedSteps((p) => ({ ...p, [step]: true }));
    setActiveStep((p) => p + 1);
    setExpanded(`panel${activeStep + 1}`);
  };

  const handleDeliverHere = (a) => {
    setSelectedAddress(a);
    handleContinue("address");
  };

  return (
    <div className="checkout-layout">
      <div className="checkout-left">

        <Accordion
          expanded={expanded === "panel1"}
          onChange={handleChange("panel1")}
          className="checkout-step"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="step-header">
              <div className="step-number">1</div>
              <h4 className="step-title">LOGIN OR SIGNUP</h4>
              {completedSteps.login && <CheckCircleIcon className="step-completed" />}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            {user ? (
              <div className="step-content login-step logged-in">
                <div className="logged-in-left">
                  <h2>Welcome Back!</h2>
                  <p className="logged-user">{user.email.split("@")[0]}</p>
                </div>
                <div className="logged-in-actions">
                  <button className="continue-btn" onClick={() => handleContinue("login")}>
                    CONTINUE
                  </button>
                </div>
              </div>
            ) : (
              <div className="step-content login-step">
                <div className="login-left">
                  <h3>Login to continue</h3>
                  <Link to="/login" className="auth-link-btn">
                    LOGIN / SIGNUP
                  </Link>
                </div>
                <div className="login-right">
                  <h4>Advantages of login</h4>
                  <ul>
                    <li>
                      <LocalShippingIcon /> Track Orders
                    </li>
                    <li>
                      <NotificationsActiveIcon /> Order Alerts
                    </li>
                    <li>
                      <StarIcon /> Ratings, Wishlist & More
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel2"}
          onChange={handleChange("panel2")}
          className="checkout-step"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="step-header">
              <div className="step-number">2</div>
              <h4 className="step-title">DELIVERY ADDRESS</h4>
              {completedSteps.address && <CheckCircleIcon className="step-completed" />}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className="step-content">
              <div className="address-section">
                <div className="address-card">
                  <div className="address-header">
                    <span className="address-name">Aditya Kumar</span>
                    <span className="address-tag">HOME</span>
                  </div>

                  <p className="address-details">
                    Garg medical store, Hanuman Mandir Marg, Gurgaon - 122006
                  </p>

                  <button
                    className="deliver-btn"
                    onClick={() =>
                      handleDeliverHere("Aditya Kumar, Gurgaon - 122006")
                    }
                  >
                    DELIVER HERE
                  </button>
                </div>

                <button className="add-address-btn">+ Add New Address</button>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <Accordion
          expanded={expanded === "panel3"}
          onChange={handleChange("panel3")}
          className="checkout-step"
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div className="step-header">
              <div className="step-number">3</div>
              <h4 className="step-title">ORDER SUMMARY</h4>
              {completedSteps.summary && <CheckCircleIcon className="step-completed" />}
            </div>
          </AccordionSummary>

          <AccordionDetails>
            <div className="step-content">
              <div className="order-summary">
                {cartItems.map((item) => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.name} />
                    <div className="order-info">
                      <h4>{item.name}</h4>
                      <p>Seller: {item.seller}</p>
                      <p>
                        <span className="old-price">₹{item.oldPrice}</span>{" "}
                        <span className="new-price">₹{item.price}</span>{" "}
                        <span className="discount">{item.discount}</span>
                      </p>
                      <p className="delivery">{item.delivery}</p>
                      <div className="quantity">Qty: {item.quantity}</div>
                    </div>
                  </div>
                ))}

                <div className="continue-section">
                  <p>
                    Order confirmation email will be sent to{" "}
                    <strong>{user?.email}</strong>
                  </p>
                  <button
                    className="continue-btn"
                    onClick={() => navigate("/payment")}

                  >
                    CONTINUE
                  </button>
                </div>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </div>

      <div className="checkout-right">
        <div className="price-box">
          <h3>PRICE DETAILS</h3>

          <div className="price-row">
            <span>Price ({cartItems.length} item)</span>
            <span>₹{totalPrice}</span>
          </div>

          <div className="price-row">
            <span>Discount</span>
            <span className="discount">-₹{totalSavings}</span>
          </div>

          <hr />

          <div className="price-row total">
            <span>Total Payable</span>
            <span>₹{totalPayable}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
