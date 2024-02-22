import React, { useState } from 'react';
import './seatSelection.css'; // Import your CSS styles here
import theatre from '../../assets/screenthumb.png';
import { useNavigate, useParams } from 'react-router-dom';
import Billing from '../billing/Billing';

const SeatSelection = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const navigate=useNavigate()
  const {mediaType,id,theatreName,timing,date,price}=useParams()
  console.log("Theatre->",theatreName)

  const handleSeatClick = (row, seat) => {
    const selected = `${row}-${seat}`;
    if (selectedSeats.includes(selected)) {
      setSelectedSeats(selectedSeats.filter((item) => item !== selected));
    } else {
      setSelectedSeats([...selectedSeats, selected]);
    }
  };

  const calculateTotalPrice = () => {
    var sum=1;
     selectedSeats.map((seat,key)=>
     sum=(key+1)*100
     )
     return sum
  };

  // Define the number of rows and seats in a row
  const numRows = 8; // 10 rows
  const seatsPerRow = 10    ; // 20 seats in a row

  return (
    <div className="body-seat">
      <ul className="showcase">
        <li>
          <div className="seat"></div>
          <small>N/A</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat occupied"></div>
          <small>Occupied</small>
        </li>
      </ul>

      <div className="container-seat">
        <div className="movie-screen">
          <img src={theatre} alt="screen" />
        </div>

        <div className="row-container-seat">
          {Array(numRows)
            .fill()
            .map((_, rowIndex) => (
              <div className="row-seat" key={rowIndex}>
                {Array(seatsPerRow)
                  .fill()
                  .map((_, seatIndex) => (
                    <div
                      className={`seat ${
                        selectedSeats.includes(`${rowIndex}-${seatIndex}`) ? 'selected' : ''
                      }`}
                      key={seatIndex}
                      onClick={() => handleSeatClick(rowIndex, seatIndex)}
                    ></div>
                  ))}
              </div>
            ))}
        </div>

        <div className="text-wrapper" style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
  <div className="text">
    Selected Seats <span id="count">{selectedSeats.length}</span>
  </div>
  {selectedSeats.length>=1 && <button className='btn btn-warning' onClick={() => { navigate(`/billing/${id}/${theatreName}/${timing}/${date}/${price}/${selectedSeats.length}`) }}>
    <span>Proceed </span>
  </button>}
</div>
      </div>
    </div>
  );
};

export default SeatSelection;
