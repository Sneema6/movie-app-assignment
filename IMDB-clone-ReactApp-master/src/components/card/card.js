import React, { useEffect, useState } from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./card.css";
import { Link } from "react-router-dom";

const Cards = ({ movie }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="cards">
          <SkeletonTheme color="#202020" highlightColor="#444">
            <Skeleton height={300} duration={3} />
          </SkeletonTheme>
        </div>
      ) : (
        // <Link
        //   to={`/movie/${movie.id}`}
        //   style={{ textDecoration: "none", color: "white" }}
        // >
        <div>
          <div className="cards">
            <div class="avatar">
              <img
                src={`https://ui-avatars.com/api/?name=${movie.title}`}
                alt="Avatar"
                className="card__img"
              />
            </div>
            <div class="top-left">{movie.title}</div>
            {/* <div className="">{movie.description}</div> */}
            <div className="cards__overlay">
              <div className="card__runtime">
                Genres: {movie ? movie.genres : ""}
                {movie.genres || ""}
              </div>
              <div className="card__description">
                {movie ? movie.description.slice(0, 188) + "..." : ""}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cards;

{
  /* <Link to={`/movie/${movie.id}`} style={{textDecoration:"none", color:"white"}}>
            <div className="cards">
                <img className="cards__img" src={`https://image.tmdb.org/t/p/original${movie?movie.poster_path:""}`} />
                <div className="cards__overlay">
                    <div className="card__title">{movie?movie.original_title:""}</div>
                    <div className="card__runtime">
                        {movie?movie.release_date:""}
                        <span className="card__rating">{movie?movie.vote_average:""}<i className="fas fa-star" /></span>
                    </div>
                    <div className="card__description">{movie ? movie.overview.slice(0,118)+"..." : ""}</div>
                </div>
            </div> */
}
