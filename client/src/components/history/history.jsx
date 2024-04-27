import React from "react";
import "./history.css";

export const History = ({ bookings }) => {
  return (
    <div className="">
      <div className="wrapper rounded">
        <nav className="navbar navbar-expand-lg navbar-dark dark d-lg-flex align-items-center justify-content-center">
          <a className="navbar-brand" href="#">
            History
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </nav>
        <div className="table-responsive mt-3">
          {bookings.length > 0 ? (
            <table className="table table-dark table-borderless">
              <thead>
                <tr>
                  <th scope="col">Movie Name</th>
                  <th scope="col">Date</th>
                  <th scope="col" className="text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td scope="row">{booking.movieName}</td>
                    <td>{booking.date}</td>
                    <td className="text-right">Rs. {booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center mt-3">No bookings have been made.</p>
          )}
        </div>
      </div>
    </div>
  );
};
