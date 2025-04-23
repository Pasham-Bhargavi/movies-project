// import Navigationbar from "../nav/navigationbar";
// import Button from 'react-bootstrap/Button';
// import Col from 'react-bootstrap/Col';
// import Row from 'react-bootstrap/Row';
// import React, { useContext, useState, useRef, useEffect } from "react";
// import PremierContext from "../context/premierContext";
// import { QRCodeCanvas } from "qrcode.react";
// import './ConfirmationPage.css';
// import { Modal } from 'react-bootstrap';
// import axios from 'axios';
// import { useParams } from "react-router-dom";
// import MenuItems from "./menupage";
// import { useLocation } from "react-router-dom";

// const TicketConfirmationPage = () => {
//     const { seatIds = [] } = useContext(PremierContext);
//     const { classicSeatIds = [] } = useContext(PremierContext);
//     const [qrCodeValue, setQrCodeValue] = useState('');
//     const [showQRCode, setShowQRCode] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const qrCodeRef = useRef();
//     const [movie, setMovie] = useState({});
//     const { id } = useParams();
//     const { username } = useContext(PremierContext);
//     const { menuTotalPrice } = useContext(PremierContext);


//     const location = useLocation();
//     const { seatsCost } = location.state || {};


//     useEffect(() => {
//         fetchMovie();
//     }, [id]);
//     const fetchMovie = async () => {
//         try {
//             const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d43dd8d874c019b0ee4316a16ab8c71a`);
//             if (response.status === 200) {
//                 setMovie(response.data);
//             }
//         } catch (err) {
//             console.error(err);
//         }
//     };



//     const handleConfirm = () => {
//         generateQRCode();
//         setShowModal(false);
//     };

//     const generateQRCode = () => {
//         const combinedSeatInfo = `Classic Seats: ${classicSeatIds.join(', ')} | Premier Seats: ${seatIds.join(', ')}`;
//         setQrCodeValue(combinedSeatInfo);
//         setShowQRCode(true);
//     };

//     const downloadQRCode = () => {
//         if (showQRCode && qrCodeValue && qrCodeRef.current) {
//             const canvas = qrCodeRef.current.querySelector("canvas");
//             if (canvas) {
//                 const url = canvas.toDataURL("image/png");
//                 const link = document.createElement("a");
//                 link.href = url;
//                 link.download = "QRCode.png";
//                 link.click();
//             } else {
//                 console.error("Canvas is not available");
//             }
//         }
//     };


//     return (
//         <>
//             <div className="confirmation-page" >

//             <div style={{ background: "black", width: "90%", height: "100vh" }}>
//                 <link
//                     href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
//                     rel="stylesheet"
//                 />
//                 <div className="container">
//                     <div className="card">
//                         <div className="content"> 
//                             <div className="cardContent">
//                                 <h3>   
//                                     <MenuItems/>
//                                 </h3>
//                             </div>
//                         </div>
//                     </div>



//                     <div className="card" style={{marginTop:"-45%",marginLeft:"50%"}} >
//                         <div className="content" style={{width: "90%", height: "100vh"}}>
//                             <div className="img">
//                                 <img src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://unsplash.it/200/200"}
//                                     alt="Movie Poster" />
//                             </div>
//                             <div className="cardContent">
//                                 <h2 style={{color:"white",textDecorationLine: "underline overline"}}>{movie ? movie.title : "Loading..."}</h2>
//                                 <div style={{ marginTop: "30px", position: "relative", zIndex: 1, color: "white" }}>
//                                     <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Classic Seats: {classicSeatIds.join(", ")}</h6>
//                                     <hr className="style18" />
//                                     <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Premier Seats: {seatIds.join(", ")}</h6>
//                                     <hr className="style18" />
//                                     <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Snacks Price: ₹{menuTotalPrice}</h6>
//                                     <hr className="style18" />
//                                     <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Overall Cost:₹{seatsCost + menuTotalPrice}</h6>
//                                     <hr className="style18" />
//                                 </div>
//                             </div>
//                             <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginTop: "20px", position: "relative", zIndex: 1 }}>
//                                 Generate QR Code
//                             </Button>
//                         </div>
//                     </div>
//                     <div style={{ marginTop: "10%", position: "relative", zIndex: "1", marginLeft: "35%" }}>
//                         {showQRCode && qrCodeValue ? (
//                             <div style={{ marginTop: "20px" }} ref={qrCodeRef}>
//                                 <QRCodeCanvas
//                                     value={qrCodeValue}
//                                     size={200}
//                                     bgColor="#ffffff"
//                                     fgColor="#000000"
//                                     level="H"
//                                 />
//                             </div>
//                         ) : (
//                             <div style={{ marginTop: "20px", textAlign: "center", color: "#ccc" }}></div>
//                         )}

//                         {showQRCode && (
//                             <Button variant="dark" onClick={downloadQRCode} style={{ marginTop: "20px", position: "relative", zIndex: 1, marginLeft: "3%" }}>
//                                 Download QR Code
//                             </Button>
//                         )}
//                     </div>
               
//                 <Modal show={showModal} onHide={() => setShowModal(false)} centered>
//                     <Modal.Header closeButton>
//                         <Modal.Title>Confirm QR Code Generation</Modal.Title>
//                     </Modal.Header>
//                     <Modal.Body>
//                         <b style={{ color: "blue" }}>{username}</b>&nbsp;are you sure you want to generate the QR code for <b style={{ color: "red" }}>{classicSeatIds.length + seatIds.length} seats?</b>
//                     </Modal.Body>
//                     <Modal.Footer>
//                         <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
//                         <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
//                     </Modal.Footer>
//                 </Modal>
//                 </div>
//             </div>

//             </div>




//         </>
//     );
// };

// export default TicketConfirmationPage;


import Navigationbar from "../nav/navigationbar";
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React, { useContext, useState, useRef, useEffect } from "react";
import PremierContext from "../context/premierContext";
import { QRCodeCanvas } from "qrcode.react";
import './ConfirmationPage.css';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useParams } from "react-router-dom";
import MenuItems from "./menupage";
import { useLocation } from "react-router-dom";

const TicketConfirmationPage = () => {
    const { seatIds = [] } = useContext(PremierContext);
    const { classicSeatIds = [] } = useContext(PremierContext);
    const [qrCodeValue, setQrCodeValue] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const qrCodeRef = useRef();
    const [movie, setMovie] = useState({});
    const { id } = useParams();
    const { username } = useContext(PremierContext);
    const { menuTotalPrice } = useContext(PremierContext);
    const location = useLocation();
    const { seatsCost } = location.state || {};

    useEffect(() => {
        fetchMovie();
    }, [id]);

    const fetchMovie = async () => {
        try {
            const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=d43dd8d874c019b0ee4316a16ab8c71a`);
            if (response.status === 200) {
                setMovie(response.data);
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleConfirm = () => {
        const combinedSeatInfo = `Classic Seats: ${classicSeatIds.join(', ')} | Premier Seats: ${seatIds.join(', ')}`;
        setQrCodeValue(combinedSeatInfo);
        setShowQRCode(true);
    };

    const downloadQRCode = () => {
        if (qrCodeRef.current) {
            const canvas = qrCodeRef.current.querySelector("canvas");
            if (canvas) {
                const url = canvas.toDataURL("image/png");
                const link = document.createElement("a");
                link.href = url;
                link.download = "QRCode.png";
                link.click();
            } else {
                console.error("Canvas is not available");
            }
        }
    };

    return (
        <>
            <div className="confirmation-page">
                <div style={{ background: "black", width: "90%", height: "100vh" }}>
                    <link
                        href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                        rel="stylesheet"
                    />
                    <div className="container">
                        <div className="card">
                            <div className="content">
                                <div className="cardContent">
                                    <h3>
                                        <MenuItems />
                                    </h3>
                                </div>
                            </div>
                        </div>

                        <div className="card" style={{ marginTop: "-45%", marginLeft: "50%" }}>
                            <div className="content" style={{ width: "90%", height: "100vh" }}>
                                <div className="img">
                                    <img src={movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://unsplash.it/200/200"}
                                        alt="Movie Poster" />
                                </div>
                                <div className="cardContent">
                                    <h2 style={{ color: "white", textDecorationLine: "underline overline" }}>{movie ? movie.title : "Loading..."}</h2>
                                    <div style={{ marginTop: "30px", position: "relative", zIndex: 1, color: "white" }}>
                                        <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Classic Seats: {classicSeatIds.join(", ")}</h6>
                                        <hr className="style18" />
                                        <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Premier Seats: {seatIds.join(", ")}</h6>
                                        <hr className="style18" />
                                        <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Snacks Price: ₹{menuTotalPrice}</h6>
                                        <hr className="style18" />
                                        <h6 style={{ marginTop: "30px", fontWeight: 'bold' }}>Overall Cost: ₹{seatsCost + menuTotalPrice}</h6>
                                        <hr className="style18" />
                                    </div>
                                </div>
                                <Button variant="primary" onClick={() => setShowModal(true)} style={{ marginTop: "20px", position: "relative", zIndex: 1 }}>
                                    Generate QR Code
                                </Button>
                            </div>
                        </div>

                        <Modal show={showModal} onHide={() => { setShowModal(false); setShowQRCode(false); }} centered>
                            <Modal.Header >
                                <Modal.Title>Confirm QR Code </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                {!showQRCode ? (
                                    <>
                                        <p><b style={{ color: "blue" }}>{username}</b>, are you sure you want to generate the QR code for <b style={{ color: "red" }}>{classicSeatIds.length + seatIds.length} seats</b>?</p>
                                    </>
                                ) : (
                                    <>
                                        <div ref={qrCodeRef} style={{ textAlign: 'center' }}>
                                            <QRCodeCanvas
                                                value={qrCodeValue}
                                                size={200}
                                                bgColor="#ffffff"
                                                fgColor="#000000"
                                                level="H"
                                            />
                                           <div>
                                             <Button variant="primary" onClick={downloadQRCode} style={{ marginTop: "20px" }}>
                                                Download QR Code
                                            </Button>
                                           </div>
                                        </div>
                                    </>
                                )}
                            </Modal.Body>
                            <Modal.Footer>
                                {!showQRCode ? (
                                    <>
                                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                                        <Button variant="primary" onClick={handleConfirm}>Confirm</Button>
                                    </>
                                ) : (
                                    <Button variant="secondary" onClick={() => { setShowModal(false); setShowQRCode(false); }}>Close</Button>
                                )}
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TicketConfirmationPage;

