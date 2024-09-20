import { Link } from "react-router-dom";

const UnknownStatusPage = () => (
  <div>
    <h1>Payment Status Unknown</h1>
    <p>
      We're not sure what happened with your payment. Please contact support for
      assistance.
    </p>
    <Link to="/">
      <button>Return to Home</button>
    </Link>
  </div>
);

export default UnknownStatusPage;
