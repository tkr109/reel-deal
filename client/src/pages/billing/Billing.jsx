import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./billing.css";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { faMoneyCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

function Billing() {
  const { id, theatreName, timing, date, price, seats } = useParams();
  const userID = JSON.parse(localStorage.getItem("user"));
  console.log(seats);

  const [movie, setMovie] = useState(null);
  const [quantity1, setQuantity1] = useState(0);
  const [quantity2, setQuantity2] = useState(0);
  const [quantity3, setQuantity3] = useState(0);
  const [quantity4, setQuantity4] = useState(0);

  const snackPrice =
    quantity1 * 350 + quantity2 * 200 + quantity3 * 160 + quantity4 * 250;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/movies/get-movie/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch movie details.");
        }
        const movieData = await response.json();
        setMovie(movieData);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
    const getShow = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/v1/shows/get-show/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch show details.");
        }
        const movieData = await response.json();
        setMovie(movieData);
        console.log(movieData);
      } catch (error) {
        console.error("Error fetching show details:", error);
      }
    };
    getShow();
  }, [id]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const timingFormats = {
    Morning: "09:30 AM",
    Afternoon: "01:30 PM",
    Evening: "06:00 PM",
    Night: "09:00 PM",
    "Late Night": "12:00 AM",
  };

  const { title } = movie;
  const totalprice = seats * price + snackPrice + 30;

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51NZsJHSFP0q9Yrdkj9kLsKNU6lyu0ZcwNoNOTa84RuKZFu1tM27YOkQ2zDE5H8BKXTF04XW0S3jPbiua05GPwbbA00bdxVRjO8"
    );

    movie.price = totalprice;
    const body = {
      products: movie,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:8080/api/v1/payment/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    await addBooking(id, title, date, totalprice);

    if (result.error) {
      console.log(result.error);
    }
  };

  const addBooking = async (id, movieName, date, amount) => {
    try {
      const bookingData = {
        userId: userID,
        movieName: movieName,
        date: date,
        amount: amount,
      };

      console.log("Booking Data:", bookingData);

      const response = await axios.post(
        "http://localhost:8080/api/v1/bookings/add-bookings",
        bookingData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Booking created successfully!");
      } else {
        console.error("Failed to create booking. Status:", response.status);

        alert("Oops! Failed to create booking.");
      }
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Oops! Error creating booking.");
    }
  };

  return (
    <div className="bill">
      <div className="container-fluid-bill">
        <div className="container-bill">
          <div className="div-left-bill" style={{ padding: "20px" }}>
            <div className="cards-div">
              <h1
                style={{
                  color: "white",
                  marginTop: "8px",
                  textAlign: "center",
                }}
              >
                Grab A <span style={{ color: "orange" }}>Bite</span>!
              </h1>
              <p
                style={{
                  color: "white",
                  textAlign: "center",
                  marginBottom: "15px",
                }}
              >
                Prebook Your Meal and Save More!
              </p>
              <div className="row">
                <div
                  className="col-md-6"
                  style={{
                    marginBottom: "0.5rem",
                    marginTop: "0.5rem",
                    marginLeft: "0px",
                  }}
                >
                  <div className="card mx-auto">
                    <div className="row no-gutters">
                      <div className="col-md-4" style={{ padding: "0px" }}>
                        <img
                          src="https://in.bmscdn.com/fnb/v3/xxhdpi/1020005_17082018144820.png"
                          className="card-img"
                          alt="Popcorn"
                        />
                      </div>
                      <div className="col-md-8" style={{ padding: "12px" }}>
                        <h5 className="card-title">Couple Combo (Salted)</h5>
                        <p className="card-text">
                          Max Popcorn Salted 170g + 2 Pepsi 360ml
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            (597 Kcal | Allergens: Milk, Caffeine)
                          </span>
                          .
                        </p>

                        <div className="amount">
                          <div style={{ fontSize: "20px", fontWeight: "600" }}>
                            ₹700
                          </div>
                          <div
                            className="quantity-buttons"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "0.3rem",
                            }}
                          >
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity1(quantity1 - 1)}
                              disabled={quantity1 <= 0}
                            >
                              -
                            </button>
                            <span style={{ margin: "0 10px" }}>
                              {quantity1}
                            </span>
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity1(quantity1 + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="col-md-6"
                  style={{ marginBottom: "0.5rem", marginTop: "0.5rem" }}
                >
                  <div className="card mx-auto">
                    {/* Second card content */}
                    <div className="row no-gutters">
                      <div className="col-md-4" style={{ padding: "0px" }}>
                        <img
                          src="//in.bmscdn.com/fnb/v3/xxhdpi/2000130_22112019112832.png"
                          className="card-img"
                          alt="Popcorn"
                        />
                      </div>
                      <div className="col-md-8" style={{ padding: "12px" }}>
                        <h5 className="card-title">Large Caramel Popcorn</h5>
                        <p className="card-text">
                          Large Caramel Popcorn serves 2 people
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            (597 Kcal | Allergens: Milk, Caffeine)
                          </span>
                          .
                        </p>
                        <div className="amount">
                          <div style={{ fontSize: "20px", fontWeight: "600" }}>
                            ₹400
                          </div>
                          <div
                            className="quantity-buttons"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "0.3rem",
                            }}
                          >
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity2(quantity2 - 1)}
                              disabled={quantity2 <= 0}
                            >
                              -
                            </button>
                            <span style={{ margin: "0 10px" }}>
                              {quantity2}
                            </span>
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity2(quantity2 + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Second row of cards */}
              <div className="row" style={{ marginTop: "20px" }}>
                <div className="col-md-6" style={{ marginBottom: "0.5rem" }}>
                  <div className="card mx-auto">
                    {/* Third card content */}
                    <div className="row no-gutters">
                      <div className="col-md-4" style={{ padding: "0px" }}>
                        <img
                          src="//in.bmscdn.com/fnb/v3/xxhdpi/2000130_22112019112832.png"
                          className="card-img"
                          alt="Popcorn"
                        />
                      </div>
                      <div className="col-md-8" style={{ padding: "12px" }}>
                        <h5 className="card-title">Large Pepsi 810ml</h5>
                        <p className="card-text">
                          Large Pepsi 810ml serves only 1 person
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            (597 Kcal | Allergens: Milk, Caffeine)
                          </span>
                          .
                        </p>
                        <div className="amount">
                          <div style={{ fontSize: "20px", fontWeight: "600" }}>
                            ₹310
                          </div>
                          <div
                            className="quantity-buttons"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "0.3rem",
                            }}
                          >
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity3(quantity3 - 1)}
                              disabled={quantity3 <= 0}
                            >
                              -
                            </button>
                            <span style={{ margin: "0 10px" }}>
                              {quantity3}
                            </span>
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity3(quantity3 + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6" style={{ marginBottom: "0.5rem" }}>
                  <div className="card mx-auto">
                    {/* Fourth card content */}
                    <div className="row no-gutters">
                      <div className="col-md-4" style={{ padding: "0px" }}>
                        <img
                          src="//in.bmscdn.com/fnb/v3/xxhdpi/2000130_22112019112832.png"
                          className="card-img"
                          alt="Popcorn"
                        />
                      </div>
                      <div className="col-md-8" style={{ padding: "12px" }}>
                        <h5 className="card-title">Regular Combo (Cheese)</h5>
                        <p className="card-text">
                          Regular Popcorn Cheese 75g + Pepsi 360ml
                          <span style={{ fontSize: "13px" }}>
                            <br />
                            (597 Kcal | Allergens: Milk, Caffeine)
                          </span>
                          .
                        </p>
                        <div className="amount">
                          <div style={{ fontSize: "20px", fontWeight: "600" }}>
                            ₹500
                          </div>
                          <div
                            className="quantity-buttons"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              marginRight: "0.3rem",
                            }}
                          >
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity4(quantity4 - 1)}
                              disabled={quantity4 <= 0}
                            >
                              -
                            </button>
                            <span style={{ margin: "0 10px" }}>
                              {quantity4}
                            </span>
                            <button
                              className="btn btn-dark button"
                              onClick={() => setQuantity4(quantity4 + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Second row of cards */}
            </div>
          </div>
          <div className="div-right-bill" style={{ textAlign: "center" }}>
            <main className="ticket-system-bill">
              <div className="top-bill">
                <br />
                <div className="printer-bill"></div>
                <div className="receipts-wrapper-bill">
                  <div className="receipts-bill">
                    <div className="receipt-bill">
                      <div className="details-bill">
                        <div className="item">
                          {(movie.media_type === "Movie" ||
                            movie.media_type === "movie") && (
                            <span>Movie Name</span>
                          )}
                          {(movie.media_type === "show" ||
                            movie.media_type === "Show") && (
                            <span>Show Name</span>
                          )}
                          <h3>{title}</h3>
                        </div>
                        <div className="item">
                          {(movie.media_type === "Movie" ||
                            movie.media_type === "movie") && (
                            <>
                              <span>Audi</span> <h3>2</h3>
                            </>
                          )}
                          {(movie.media_type === "show" ||
                            movie.media_type === "Show") && (
                            <>
                              <span>Venue</span> <h3>Reels Club</h3>
                            </>
                          )}
                        </div>
                        <div className="item">
                          <span>Date</span>
                          <h3>{date}</h3>
                        </div>
                        <div className="item">
                          <span>Show timing</span>
                          <h3>{timingFormats[timing]}</h3>
                        </div>
                        <div className="item">
                          <span>Tickets</span>
                          <h4>{seats}</h4>
                        </div>
                        <div className="item">
                          <span>Price</span>
                          <h4>Rs.{totalprice}.00</h4>
                        </div>
                        <div className="item">
                          <span>Savory Eats and Drinks</span>
                        </div>
                        <div className="item">
                          <span>Rs.{snackPrice}</span>
                        </div>
                        <div className="item">
                          <span>Convenience Charges</span>
                        </div>
                        <div className="item">
                          <span>Rs.30.00</span>
                        </div>
                        <div className="item">
                          <hr style={{ height: "10px" }} />
                          <h3>Total Price</h3>
                        </div>
                        <div className="item">
                          <hr style={{ height: "10px" }} />
                          <h3>Rs.{totalprice}</h3>
                        </div>
                      </div>
                    </div>
                    <button className="btn btn-warning " onClick={makePayment}>
                      Proceed to Pay
                      <FontAwesomeIcon
                        icon={faMoneyCheck}
                        style={{ marginLeft: "10px" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Billing;
