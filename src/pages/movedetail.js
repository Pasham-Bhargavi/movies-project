import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './moviedetails.css';
import Navigationbar from "../nav/navigationbar";
import Card from 'react-bootstrap/Card';
import ReactStars from "react-rating-stars-component";
import Accordion from 'react-bootstrap/Accordion';
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/movie/${id}?api_key=d43dd8d874c019b0ee4316a16ab8c71a`
      );
      if (response.status === 200) {
        setMovie(response.data);
      }
    } catch (err) {
      console.error("Error fetching movie details:", err.message);
    }
  };

  return (
    <>
      <Navigationbar />
      <motion.div
        className="maincontainer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div
          className="imagecontent"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1 }}
        >

<div
  style={{
    backgroundColor: "black",
    width: "220px",
    height: "220px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "0 auto",
  }}
>
  <motion.img
    src={`https://image.tmdb.org/t/p/w500${movie?.poster_path}`}
    alt="MoviePoster"
    style={{
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      objectFit: "cover",
    }}
    initial={{ scale: 0.8 }}
    animate={{ scale: 1 }}
    transition={{ duration: 1 }}
  />
</div>
          <Card>
            <Card.Body>
              <Card.Title style={{color:"white"}}>{movie?.title}</Card.Title>
              <ReactStars count={1} size={40} color="red" />
              <span className="rating">{`${movie?.vote_average}/10`}</span>
              <Accordion>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>About the movie overview</Accordion.Header>
                  <Accordion.Body>{movie?.overview}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Card.Body>
          </Card>
        </motion.div>
      </motion.div>
    </>
  );
};

export default MovieDetails;
