import { useRef } from "react";
import Banner from "../components/Banner";
import products from "../data/products";
import "./home.css";
import CategoryBar from "../components/categorybar";
import { Link } from "react-router-dom";

export default function Home() {
  const sliderRef = useRef();

  const scrollRight = () => {
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollLeft = () => {
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
  };

  return (
    <div className="home">
      <CategoryBar variant="home" showicons={true} />
      <Banner />

      <div className="slider-box">
        <div className="slider-header">
          <h2 className="slider-title">Featured Products</h2>
          <Link to="/products" className="view-all-btn">VIEW ALL</Link>
        </div>

        <button className="arrow2 left" onClick={scrollLeft}>‹</button>
        <button className="arrow2 right" onClick={scrollRight}>›</button>

        <div className="product-slider" ref={sliderRef}>
          {products.map((item) => (
            <Link to={`/product/${item.id}`} key={item.id} className="slide-item">
              <img src={item.image} alt={item.name} />
              <p className="slide-name">{item.name}</p>
              <p className="slide-price">From ₹{item.price}</p>
            </Link>
          ))}
        </div>
      </div>

      <footer className="footer">
        <div className="footer-links">
          <div className="footer-col">
            <h4>ABOUT</h4>
            <ul>
              <li>Contact Us</li>
              <li>About Us</li>
              <li>Careers</li>
              <li>Flipkart Stories</li>
              <li>Press</li>
              <li>Corporate Information</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>GROUP COMPANIES</h4>
            <ul>
              <li>Myntra</li>
              <li>Cleartrip</li>
              <li>Shopsy</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>HELP</h4>
            <ul>
              <li>Payments</li>
              <li>Shipping</li>
              <li>Cancellation & Returns</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>CONSUMER POLICY</h4>
            <ul>
              <li>Cancellation & Returns</li>
              <li>Terms Of Use</li>
              <li>Security</li>
              <li>Privacy</li>
              <li>Sitemap</li>
              <li>Grievance Redressal</li>
              <li>EPR Compliance</li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Mail Us:</h4>
            <p>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
            </p>
            <h4>Registered Office Address:</h4>
            <p>
              Flipkart Internet Private Limited, Buildings Alyssa, Begonia & Clove Embassy Tech Village,
              Outer Ring Road, Devarabeesanahalli Village, Bengaluru, 560103, Karnataka, India
            </p>
            <p>
              CIN: U51109KA2012PTC066107 <br />
              Telephone: 044-45614700 / 044-67415800
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
