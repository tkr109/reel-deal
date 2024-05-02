import React, { useState } from "react";
import "./history.css";

export const History = ({ bookings, totalBooking, totalAmount }) => {
  return (
    <div className="">
      <div className="wrapper rounded">
        <nav className="navbar navbar-expand-lg navbar-dark dark d-lg-flex align-items-center justify-content-center">
          <p className="navbar-brand" href="#">
            History
          </p>
        </nav>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div className="app__history-booking_div">
            <p className="app__history-booking_heading">Total Bookings :   </p>
            <p className="app__history-booking_price">{totalBooking}</p>
          </div>
          <div className="app__history-booking_div">
            <p className="app__history-booking_heading">Total Amount Spend :    </p>
            <p className="app__history-booking_price">Rs. {totalAmount}</p>
          </div>
        </div>
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
