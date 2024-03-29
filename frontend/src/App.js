// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import BookDetailsPage from "./components/BookDetailsPage/BookDetailsPage";
import SearchPage from "./components/SearchPage/SearchPage";
import FavoritesPage from "./components/FavoritesPage/FavoritesPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";


// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage/>
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/search" element={<SearchPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route path='/details/:bookName/' element={<BookDetailsPage/>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

