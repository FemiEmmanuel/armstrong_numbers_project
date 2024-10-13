import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
// import Profile from "./components/Profile";
// import ArmstrongCalculator from "./components/ArmstrongCalculator";
// import Attempts from "./components/Attempts";
// import Feedback from "./components/Feedback";
// import Contact from "./components/Contact";
import Home from "./components/Home";
import Homepage from "./pages/HomePage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/home" element={<Home />} />
        {/* <Route path="/profile" element={<Profile />} />
        <Route path="/calculator" element={<ArmstrongCalculator />} />
        <Route path="/attempts" element={<Attempts />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/contact" element={<Contact />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
