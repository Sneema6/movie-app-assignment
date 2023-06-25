import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./pages/home/home";
import MovieList from "./components/movieList/movieList";
import NewLogin from "./newLogin";
import Card from "react-bootstrap/Card";
import { useState } from "react";

function App() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [auth, setAuth] = useState(false);
  function PrivateRoute({ children }) {
    // const auth = useAuth();
    return auth ? <>{children}</> : <Navigate to="/" />;
  }
  return (
    <div className="App">
      <Router>
        <Header setMovies={setMovies} movies={movies} setPage={setPage} />
        <Routes>
          <Route path="/" element={<NewLogin setAuth={setAuth} />} />
          <Route
            path="/movies/"
            element={
              <Home
                movies={movies}
                setMovies={setMovies}
                page={page}
                setPage={setPage}
              />
            }
          ></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
