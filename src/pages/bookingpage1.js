import './bookingpage.css';
import React from 'react';
import { useState, useContext } from "react";
import PremierContext from '../context/premierContext';

const TicketBooking1 = () => {
  const { setsSeatId } = useContext(PremierContext);
  const { setAmount1 } = useContext(PremierContext);

  const rows = 4;
  const cols = 16;
  const ticketPrice1 = 150;
  const [totalAmount1, settotalAmount1] = useState(0);
  const initialSeats = Array(rows)
    .fill()
    .map((_, rowIndex) =>
      Array(cols).fill().map((_, colIndex) => ({
        id: `R${rowIndex + 1}C${colIndex + 1}`,
        booked: false
      }))
    );
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeatIds1, setselectedSeatIds1] = useState([]);

  const toggleSeat1 = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((row, rIndex) =>
        row.map((seat, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const updatedSeat = { ...seat, booked: !seat.booked };
            const newTotalAmount = seat.booked ? totalAmount1 - ticketPrice1 : totalAmount1 + ticketPrice1;

            settotalAmount1(newTotalAmount);
            setAmount1(newTotalAmount);
            console.log(newTotalAmount, "amount for premier");

            let updatedSeatIds;
            if (!seat.booked) {
              updatedSeatIds = [...selectedSeatIds1, seat.id];
            } else {
              updatedSeatIds = selectedSeatIds1.filter(id => id !== seat.id);
            }


            setselectedSeatIds1(updatedSeatIds);


            setsSeatId(updatedSeatIds);

            return updatedSeat;
          }

          return seat;
        })
      );
      return newSeats;
    });
  };

  return (
    <>
      <div className="App" style={{ marginLeft: "-2%", marginTop: "10px" }} >
        <h4 style={{ color: "white", marginLeft: "45%" }}>
          Primer Seats ₹{totalAmount1}
        </h4>
        <div
          className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[850px] grid grid-cols-16 gap-1 bg-transparent"
          style={{ width: "400px", height: "200px", marginLeft: "33%", marginTop: "50px", display: "grid", gridTemplateColumns: "repeat(10, auto)" }}
        >
          {Array.from({ length: 40 }).map((_, index) => (
            <img
              key={index}
              src={seats[Math.floor(index / cols)][index % cols].booked
                ? "https://cdn.create.vista.com/api/media/small/470957992/stock-vector-armchair-blue-gradient-vector-icon"
                : "https://www.shutterstock.com/shutterstock/videos/1054121969/thumb/11.jpg?ip=x480"}
              alt="Sofa"
              className="rounded-md shadow-md opacity-90 cursor-pointer"
              style={{ width: "60px", height: "40px", rotate: "180deg", borderRadius: "50%" }}
              onClick={() => toggleSeat1(Math.floor(index / cols), index % cols)}
            />
          ))}
        </div>
      </div>




    </>
  );
};

export default TicketBooking1;
