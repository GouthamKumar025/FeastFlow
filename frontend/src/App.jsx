import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/navbar";
import LoginPage from "./pages/loginPage";
import SignupPage from "./pages/signupPage";
import Homepage from "./pages/homePage";
import EventPage from "./pages/eventPage";
import EventRegister from "./pages/eventRegister";
import ContactPage from "./pages/contactPage";
import { AuthProvider } from "./auth/authProvider";
import ResponsePage from "./pages/responsePage";
import GuestRSVP from "./pages/guestRSVP";
import AboutPage from "./pages/aboutPage";

function AppContent() {
  const location = useLocation();
  const hideLocations = ["/", "/login", "/signup"];
  const shouldHideNavbar =
    hideLocations.includes(location.pathname) ||
    location.pathname.startsWith("/rsvp/");
  if (typeof global === "undefined") {
    window.global = window;
  }
  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/eventRegister" element={<EventRegister />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/rsvp/:eventId/:guestId" element={<ResponsePage />} />
        <Route path="/guests/:eventId" element={<GuestRSVP />} />
        <Route path="/about" element={<AboutPage/>}/>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
