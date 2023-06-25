import React, { useState } from "react";
import "./Header.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { debounce } from "lodash";

const Header = ({ movies, setMovies, setPage }) => {
  const [search, setSearch] = useState("");
  const [searched, setSearched] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);
  const submitHandler = (e) => {
    e.preventDefault();
    // console.log(movies);
    //
    if (search.length <= 3) {
      return;
    }

    if (search.length === 0 && searched) {
      setPage(1);
    }
    const filterData = movies.filter((i) =>
      i.title.toUpperCase().includes(search.toUpperCase())
    );
    console.log(filterData);
    setMovies(filterData);
    setSearched(true);
  };

  const handleToggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    setIsDropdownOpen(false);
  };
  return (
    <div className="header">
      <div className="headerLeft">
        <Link to="/movies/">
          <img
            className="header__icon"
            src="https://i.ibb.co/r5krrdz/logo.png"
          />
        </Link>
      </div>
      {accessToken ? (
        <div className="search-bar">
          <form onSubmit={submitHandler} className="search-form">
            <input
              type="text"
              placeholder="Search movies or Shows"
              onChange={(e) => setSearch(e.target.value)}
              className="search_input"
            />
            <button className="search_button">
              <i className="fa fa-search"></i>
            </button>
          </form>
        </div>
      ) : (
        <div></div>
      )}
      <div className="nav-avatar" onClick={handleToggleDropdown}>
        <img
          className=""
          src="https://loodibee.com/wp-content/uploads/Netflix-avatar-9.png"
          alt="avatar"
        />
        {isDropdownOpen && (
          <div className="dropdown-menu">
            <button className="dropdown-item" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
