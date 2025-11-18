import "./checkoutstep.css";

export default function CheckoutStep({ step, title, active, completed, children }) {
  return (
    <div className={`checkout-step ${active ? "active" : completed ? "completed" : ""}`}>
      <div className="step-header">
        <div className="step-left">
          <div className="step-number">{step}</div>
          <h4 className="step-title">{title}</h4>
        </div>

        <div className="step-right">
          {completed && <span className="step-status">✔</span>}
        </div>
      </div>

      {active && <div className="step-content">{children}</div>}
    </div>
  );
}
