import React from "react";

function FetchMovies() {
  const fetchMovies = async ({ setIsLoading, setError, setMovies, page }) => {
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
  return <div>{fetchMovies()}</div>;
}

export default FetchMovies;
