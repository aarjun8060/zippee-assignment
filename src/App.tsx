import { Route, Routes } from "react-router-dom";

import Home from "./pages/home";
import Favorites from "./pages/favorites";
import Login from "./pages/login";

/**
 * @returns App component
 * This component is used to display the app
 */
function App() {
  return (
    <div className="min-h-screen bg-background w-full flex flex-col items-center justify-start">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fav" element={<Favorites />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
