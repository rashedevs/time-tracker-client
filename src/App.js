import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Home from "./Components/Home/Home";
import Entries from "./Components/Entries/Entries";
import WeeklySheet from "./Components/WeeklySheet/WeeklySheet";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/entries" element={<Entries />} />
        <Route path="/weeklysheet" element={<WeeklySheet />} />
      </Routes>
    </div>
  );
}

export default App;
