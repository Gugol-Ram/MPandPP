import { useLocation } from "react-router-dom";

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paymentStatus = queryParams.get("payment");

  return (
    <div>
      {paymentStatus === "success" && (
        <div>
          <h1>Payment Successful!</h1>
          <p>
            Your payment was processed successfully. Thank you for your
            purchase.
          </p>
        </div>
      )}
      {paymentStatus === "failed" && (
        <div>
          <h1>Payment Failed</h1>
          <p>
            There was an issue processing your payment. Please try again later.
          </p>
        </div>
      )}
      {!paymentStatus && (
        <div>
          <h1>Payment Status Unknown</h1>
          <p>
            We could not determine the status of your payment. Please contact
            support if you have any questions.
          </p>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;

// import { useLocation } from "react-router-dom";

// const SuccessPage = () => {
//   const location = useLocation();
//   const queryParams = new URLSearchParams(location.search);
//   const paymentStatus = queryParams.get("payment");

//   return (
//     <div>
//       {paymentStatus === "success" && (
//         <div>
//           <h1>Payment Successful!</h1>
//           <p>
//             Your payment was processed successfully. Thank you for your
//             purchase.
//           </p>
//         </div>
//       )}
//       {paymentStatus === "failed" && (
//         <div>
//           <h1>Payment Failed</h1>
//           <p>
//             There was an issue processing your payment. Please try again later.
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SuccessPage;
