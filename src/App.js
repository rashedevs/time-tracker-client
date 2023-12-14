import React, { useState } from "react";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Entries from "./Components/Entries/Entries";
import WeeklySheet from "./Components/WeeklySheet/WeeklySheet";

function Greeting({ onExploreClick }) {
  return (
    <div className="greeting">
      <h1>Welcome to Time Tracker</h1>
      <nav className="linkstyle">
        <Link to="/home" onClick={onExploreClick}>
          Explore {" >"}
        </Link>
      </nav>
    </div>
  );
}

function App() {
  const [showGreeting, setShowGreeting] = useState(true);

  const handleExploreClick = () => {
    setShowGreeting(false);
  };

  return (
    <div className="App">
      {showGreeting && (
        <Routes>
          <Route
            path="/*"
            element={<Greeting onExploreClick={handleExploreClick} />}
          />
        </Routes>
      )}
      {!showGreeting && <Header />}
      {!showGreeting && (
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/entries" element={<Entries />} />
          <Route path="/weeklysheet" element={<WeeklySheet />} />
        </Routes>
      )}
    </div>
  );
}

export default App;
