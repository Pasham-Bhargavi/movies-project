// import React, { useContext, useEffect, useState } from 'react';
// import './movieposterstyle.css';
// import ReactStars from "react-rating-stars-component";
// import axios from 'axios';
// import Button from 'react-bootstrap/Button';
// import { Link } from 'react-router-dom';


// const Movieposters = () => {
//     const [movieList, setMovieList] = useState([]);
//     // Change to 'u const { username } = useContext(PremierContext);sername'

//     useEffect(() => {
//       const cachedMovies = localStorage.getItem("movieList");
//       if (cachedMovies) {
//         setMovieList(JSON.parse(cachedMovies));
//       } else {
//         const fetchMovies = async () => {
//           try {
//             const response = await axios.get(
//               "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie?api_key=d43dd8d874c019b0ee4316a16ab8c71a"
//             );
//             setMovieList(response.data.results);
//             localStorage.setItem("movieList", JSON.stringify(response.data.results));
//           } catch (error) {
//             console.error("Error fetching movies:", error.message);
//           }
//         };
//         fetchMovies();
//       }
//     }, []);
    
//     return (
//         <>
//            <div className="movie-container">
//       {movieList.map((eachMovie) => {
//         const { id, title, poster_path, vote_average } = eachMovie;
//         return (
//           <div className="movie-card" key={id}>
//             <img
//               className="movie-image"
//               src={`https://image.tmdb.org/t/p/w500${poster_path}`}
//               alt="Movie Poster"
//             />
//             <p className="movie-description">{title}</p>
//             <div className="movie-info">
//               <div className="movie-rating">
//                 <h6>{`${vote_average}/10`}</h6>
//               </div>
//               <div className='movie-stars'>
//               <ReactStars count={5} size={20} color="gold" />
//               </div>
//             </div>
//             <hr />
//             <div className="movie-actions">
//               <Link to={`/bookingpage/${id}`}>
//                 <Button variant="primary" >RESERVE TICKET</Button>
//               </Link>
              
//               <Link to={`/movedetail/${title}/${id}`}>
//                 <Button variant="success">DETAILS</Button>
//               </Link>
//             </div>
//           </div>
//         );
//       })}
//     </div>

//         </>
//     );
// };

// export default Movieposters;



// Movieposters.js
import React, { useContext, useEffect } from 'react';
import './movieposterstyle.css';
import ReactStars from "react-rating-stars-component";
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import PremierContext from '../context/premierContext';

const Movieposters = () => {
    const { movieList, setMovieList } = useContext(PremierContext); // Destructure from context


    useEffect(() => {
      console.log("MoviePosters component mounted");
      return () => {
        console.log("MoviePosters component unmounted");
      };
    }, []);

    // Only fetch movies if the movieList is empty (to avoid re-fetching)
    useEffect(() => {
      // Check if movieList is already in localStorage or context
      const cachedMovies = localStorage.getItem('movies');
      if (cachedMovies) {
        setMovieList(JSON.parse(cachedMovies));  // Use cached data if available
        return;  // Exit early to avoid fetching from API
      }
    
      // If no cached data, fetch movies from the API
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            "https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3/discover/movie?api_key=d43dd8d874c019b0ee4316a16ab8c71a"
          );
          setMovieList(response.data.results);
          localStorage.setItem('movies', JSON.stringify(response.data.results)); // Cache the fetched data
        } catch (error) {
          console.error("Error fetching movies:", error.message);
        }
      };
    
      fetchMovies();
    }, []);  // Empty dependency array ensures this effect runs only once
    

    return (
        <div className="movie-container">
            {movieList.map((eachMovie) => {
                const { id, title, poster_path, vote_average } = eachMovie;
                return (
                    <div className="movie-card" key={id}>
                        <img
                            className="movie-image"
                            src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                            alt="Movie Poster"
                        />
                        <p className="movie-description">{title}</p>
                        <div className="movie-info">
                            <div className="movie-rating">
                                <h6>{`${vote_average}/10`}</h6>
                            </div>
                            <div className='movie-stars'>
                                <ReactStars count={5} size={20} color="gold" />
                            </div>
                        </div>
                        <hr />
                        <div className="movie-actions">
                            <Link to={`/bookingpage/${id}`}>
                                <Button variant="primary" >RESERVE TICKET</Button>
                            </Link>

                            <Link to={`/movedetail/${title}/${id}`}>
                                <Button variant="success">DETAILS</Button>
                            </Link>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default Movieposters;
