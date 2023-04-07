import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/Home";
import TownPage from "./components/TownPage";
import FavTowns from "./components/FavTowns";

function App() {
  return (
    <BrowserRouter>
      <div className="d-flex">
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/town/:name" element={<TownPage />} />
            <Route path="/your-cities" element={<FavTowns />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}
export default App;
