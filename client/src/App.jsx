import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<Layout />} />
      </Routes>
    </Router>
  );
}

export default App;
