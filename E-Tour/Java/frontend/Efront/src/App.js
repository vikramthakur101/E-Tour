import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Component/Dashboard";
import International from "./International";
import Domestic from "./Domestic";
import NavBarComponent from "./Component/NavBar";
import PopularPackage from "./Component/PopularPackage";
import Footer from "./Component/Footer";
import SubCategories from "./Component/SubCategories";
import TourCategories from "./Component/TourCategories";
import RegisterForm from "./Component/RegisterForm";
import LoginForm from "./Component/LoginForm";
import Itinerary from "./Component/Itinerary"; // Corrected import
import BookingPage from "./Component/BookingPage";
import BookingSummary from "./Component/BookingSummary";
import PaymentPage from "./Component/PaymentPage"; // Make sure to import PaymentPage
import Profile from "./Component/Profile";

function App() {
  return (
    <>
      <NavBarComponent />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/international" element={<International />} />
        <Route path="/domestic" element={<Domestic />} />
        <Route path="/popularPackage" element={<PopularPackage />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/subCategories" element={<SubCategories />} />
        <Route path="/tourCategories" element={<TourCategories />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/itinerary" element={<Itinerary />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bookingsummary" element={<BookingSummary />} />
        <Route path="/payment" element={<PaymentPage />} /> 
        <Route path="/Profile" element={<Profile />} /> 
      </Routes>
      <Footer />
    </>
  );
}

export default App;





