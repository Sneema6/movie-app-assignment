import React, { useEffect, useState } from "react";
import "./home.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import MovieList from "../../components/movieList/movieList";
import Cards from "../../components/card/card";
import Loading from "../Loading";

const Home = ({ movies, setMovies, page, setPage }) => {
  //   const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  //   const [page, setPage] = useState(1);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovies = async () => {
    // Get the access token from localStorage
    const accessToken = localStorage.getItem("accessToken");

    // Prepare the request headers with authorization
    const headers = {
      Authorization: `Token ${accessToken}`,
    };

    // Send a GET request to the movies API endpoint
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://demo.credy.in/api/v1/maya/movies/?page=${page}`,
        {
          headers,
        }
      );

      //   .then((response) => response.json())
      if (response.ok) {
        const responseData = await response.json();
        setMovies((prev) => [...prev, ...responseData.results]);
      }
    } catch (error) {
      console.error("An error occurred while fetching movies:", error);
      setError("An error occurred while fetching movies. Please try again.");
    } finally {
      setIsLoading(false);
    }
    //   catch((error) => {
    //   })
    //   .finally(() => {
    //   });
  };

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const handelInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setIsLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handelInfiniteScroll);
    return () => window.removeEventListener("scroll", handelInfiniteScroll);
  }, []);

  const handleRefresh = () => {
    setIsLoading(true);
    fetchMovies();
  };

  const openModal = (movieId) => {
    // Set the selected movie ID in state
    setSelectedMovie(movieId);
  };

  const closeModal = () => {
    // Clear the selected movie ID in state
    setSelectedMovie(null);
  };

  return (
    <>
      {isLoading && <Loading />}
      {error === "" ? (
        <div className="poster">
          {/* {movies.length > 0 ? ( */}
          <div className="movie__list">
            <h2 className="list__title">MOVIES</h2>
            <div className="list__cards">
              {movies.map((movie) => (
                <div key={movie.uuid}>
                  <Cards movie={movie} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <h2>
            An error occurred while fetching movies. Please try again.
            <button onClick={handleRefresh}>Refresh</button>
          </h2>
        </div>
      )}
      {isLoading && <Loading />}

      {/* {selectedMovie && (
        <div className="modal">
          <div className="modal-content">
            <h2>Movie Details</h2>
            <p>Movie ID: {selectedMovie}</p>
            <div class="avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${selectedMovie.title}`}
                alt="Avatar"
                className="card__img"
              />
            </div>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )} */}
      {/* {selectedMovie && <movieDetailModal />} */}
    </>
  );
};

export default Home;
