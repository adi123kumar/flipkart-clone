import "./PriceSummary.css";

export default function PriceSummary() {

  const itemCount = 2;
  const totalPrice = 19998;
  const discount = 18000; 
  const deliveryCharge = 0;
  const finalAmount = totalPrice - discount + deliveryCharge;

  return (
    <div className="price-summary">
      <h3>PRICE DETAILS ({itemCount} Items)</h3>
      <hr />

      <div className="price-row">
        <span>Price</span>
        <span>₹{totalPrice.toLocaleString()}</span>
      </div>

      <div className="price-row">
        <span>Discount</span>
        <span className="discount">-₹{discount.toLocaleString()}</span>
      </div>

      <div className="price-row">
        <span>Delivery Charges</span>
        <span className="free">
          {deliveryCharge === 0 ? "Free" : `₹${deliveryCharge}`}
        </span>
      </div>

      <hr />

      <div className="total-row">
        <span>Total Amount</span>
        <span>₹{finalAmount.toLocaleString()}</span>
      </div>

      <p className="savings">
        You will save ₹{discount.toLocaleString()} on this order
      </p>
    </div>
  );
}
