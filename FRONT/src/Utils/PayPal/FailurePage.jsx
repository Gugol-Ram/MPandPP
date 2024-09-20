import { useLocation, useNavigate } from "react-router-dom";

const FailurePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get("payment");

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div>
      {/* Puedes mostrar un mensaje por defecto si paymentStatus no es "failed" */}
      <h1>
        {paymentStatus === "failed"
          ? "Payment Failed"
          : "Payment Status Failed or Missed"}
      </h1>
      <p>
        {paymentStatus === "failed"
          ? "There was an issue processing your payment. Please try again later or contact us."
          : "Payment Failed"}
      </p>
      <button
        onClick={handleGoHome}
        style={{ marginTop: "20px", padding: "10px 20px" }}
      >
        Return to Home
      </button>
    </div>
  );
};

export default FailurePage;
