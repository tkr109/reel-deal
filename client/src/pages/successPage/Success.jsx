import React, { useState, useEffect } from "react";
import "./success.css"; // Import a separate CSS file for styling
import { useNavigate } from "react-router-dom";

function Success() {
  const navigate = useNavigate();
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      navigate("/");
    }, 10000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className={`vh-100 d-flex justify-content-center align-items-center ${showAnimation ? "animated" : ""}`}>
      <div className="col-md-4 ">
        <div className="card bg-white shadow p-5">
          <div className="mb-4 text-center tick-animation">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-success bi bi-check-circle ty"
              viewBox="0 0 16 16"
              fill="green"
            >
              <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
              <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
            </svg>
          </div>
          <div className="text-center">
            <h1 style={{ color: "Green" }}>Thank You !</h1>
            <div style={{fontSize:"14px"}}>
              <p>
                A confirmation email has been dispatched to the address
                associated with your account:{" "}
                <b>{JSON.parse(localStorage.getItem("user")).email}</b>.
              </p>
              <p>
                This email includes a QR code, serving as your electronic ticket
                for entry into the theatre premises.
              </p>
            </div>

            <button className="btn btn-warning" onClick={() => navigate("/")}>
              Back Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Success;
