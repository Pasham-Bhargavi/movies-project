import { useContext, useEffect, useState } from "react";
import Navigationbar from "../nav/navigationbar";
import './bookingpage.css';
import TicketBooking1 from "./bookingpage1";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Table from 'react-bootstrap/Table';
import PremierContext from "../context/premierContext";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import TicketConfirmationPage from "./confirmationpage";

const TicketBooking = () => {
  const { seatIds } = useContext(PremierContext)
  const { amount1 } = useContext(PremierContext)
  const { setclassicSeatIds } = useContext(PremierContext)
  const { id } = useParams();
  const navigate = useNavigate();
  const rows = 4;
  const cols = 16;
  const ticketPrice = 90;

  const [movie, setmovie] = useState({});
  const [show, setShow] = useState(false);  // Set initial value to 'false' to hide the alert on load
  useEffect(() => {
    featchmovie();
  }, [id]);
  const featchmovie = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d43dd8d874c019b0ee4316a16ab8c71a`);
      if (response.status === 200) {
        setmovie(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };




  const [totalAmount, setTotalAmount] = useState(0);
  const [finalAmount, setFinalAmount] = useState(totalAmount + amount1);


  useEffect(() => {
    setFinalAmount(totalAmount + amount1);
  }, [totalAmount, amount1]);

  const initialSeats = Array(rows)
    .fill()
    .map((_, rowIndex) =>
      Array(cols).fill().map((_, colIndex) => ({
        id: `R${rowIndex + 1}C${colIndex + 1}`,
        booked: false
      }))
    );

  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeatIds, setSelectedSeatIds] = useState([]);

  const toggleSeat = (rowIndex, colIndex) => {
    setSeats((prevSeats) => {
      const newSeats = prevSeats.map((row, rIndex) =>
        row.map((seat, cIndex) => {
          if (rIndex === rowIndex && cIndex === colIndex) {
            const updatedSeat = { ...seat, booked: !seat.booked };
            setTotalAmount(prevAmount => seat.booked ? prevAmount - ticketPrice : prevAmount + ticketPrice);

            if (!seat.booked) {
              console.log('Adding seat:', seat.id);
              setSelectedSeatIds(prevIds => {
                const updatedIds = new Set([...prevIds, seat.id]);  // Use Set to avoid duplicates
                setclassicSeatIds(Array.from(updatedIds));  // Convert Set to array and pass to setclassicSeatIds
                return Array.from(updatedIds);  // Return the updated array of unique seat IDs
              });
            } else {
              console.log('Removing seat:', seat.id);
              setSelectedSeatIds(prevIds => {
                const updatedIds = prevIds.filter(id => id !== seat.id);  // Remove the seat from the array
                setclassicSeatIds(updatedIds);  // Pass the updated array without the removed seat
                return updatedIds;
              });
            }
            return updatedSeat;
          }
          return seat;
        })
      );
      return newSeats;
    });
  };

  const handleBookNow = () => {
    if (selectedSeatIds.length === 0 && seatIds.length === 0) {
      setShow(true);
    } else {
      setShow(false);
      navigate(`/pages/confirmationpage/${id}`, {
        state: { movie, seatsCost: finalAmount }, // ✅ Pass seatsCost in state
      });
    }
  };







  return (
    <>


      <Navigationbar />
      <div id="mainCoantiner">
        <svg width="100%" height="300" viewBox="0 0 1000 300" >
          <defs>
            {/* Stronger Neon Glow for the Tube */}
            <filter id="neon-glow" x="-150%" y="-150%" width="400%" height="400%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="12" result="blur" />
              <feOffset dx="0" dy="0" result="offsetBlur" />
              <feFlood floodColor="blue" floodOpacity="1" />
              <feComposite in2="offsetBlur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Inside Falling Blue Rays Effect */}
            <linearGradient id="inside-rays" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="rgba(0, 0, 255, 0.7)" />
              <stop offset="40%" stopColor="rgba(0, 0, 255, 0.3)" />
              <stop offset="100%" stopColor="rgba(0, 0, 255, 0)" />
            </linearGradient>
          </defs>

          {/* Falling Light Rays from Inside the Curve */}
          <path
            d="M50,120 Q500,30 950,120 L950,300 L50,300 Z"
            fill="url(#inside-rays)"
            opacity="0.7"
          />

          {/* Main Glowing Curved Tube Light */}
          <path
            d="M50,120 Q500,30 950,120"
            stroke="blue"
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
            filter="url(#neon-glow)"
          />
        </svg>


        <div className="App" style={{ marginLeft: "-2%", marginTop: "-150px" }} >
          <h4 style={{ color: "white", marginLeft: "45%" }}>
            Classic Seats ₹{totalAmount}
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
                onClick={() => toggleSeat(Math.floor(index / cols), index % cols)}
              />
            ))}
          </div>
        </div>
        <TicketBooking1 />


        <div className="margin-body" st>
          <div>
            <div className="starsec" />
            <div className="starthird" />
            <div className="starfourth" />
            <div className="starfifth" />
          </div>


          <div className="col-sm-3 col-md-3 pricing-column-wrapper" style={{ position: "absolute", top: "-200px" }}>
            <div>
              {/* Alert Box - Positioned at the top */}
              <Alert
                show={show}
                variant="danger"
                style={{
                  position: "fixed",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "50%",
                  zIndex: 1000,
                }}
              >
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Please select at least one seat before proceeding.</p>
                <hr />
                <div className="d-flex justify-content-end">
                  <Button onClick={() => setShow(false)} variant="outline-danger">
                    Close me
                  </Button>
                </div>
              </Alert>

              {/* Book Now Button - Positioned at bottom-right */}
              <Button
                onClick={handleBookNow}
                style={{
                  position: "fixed",
                  bottom: "20px",
                  right: "20px",
                  width: "150px",
                  height: "50px",
                  textAlign: "center",
                }}
              >
                <h5>Book Now</h5>
              </Button>
            </div>

          </div>
        </div>
      </div>



    </>
  );
};

export default TicketBooking;






