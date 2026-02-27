import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header.jsx";
import Home from "./components/Home.jsx";
import Services from "./components/Services.jsx";
import ReadyToGetStarted from "./components/ReadyToGetStarted.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import Locations from "./components/Location.jsx";
import Footer from "./components/Footer.jsx";
import Hero from "./components/Hero.jsx";
import Login from "./components/Login.jsx"; // 👈 create this
import ScrollToTop from "./components/ScrollToTop";
import Dashboard from "./admin/Dashboard";
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  // or check from context if you have AuthContext

  if (!isAuthenticated) {
    return <Navigate to="/my-account" replace />;
  }

  return children;
};

const App = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/dashboard");
  return (
    <>
      <Header />

      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <ScrollToTop />
              <Hero />
              <Home />
              <Services />
              {/* <About /> */}
              <Contact />
              <Locations />
              <ReadyToGetStarted />
            </>
          }
        />

        {/* Login Page */}
        <Route path="/my-account" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

export default App;

// import React from "react";
// import Header from "./components/Header.jsx";
// import Home from "./components/Home.jsx";
// import Services from "./components/Services.jsx";
// import ReadyToGetStarted from "./components/ReadyToGetStarted.jsx";
// import About from "./components/About.jsx";
// import Contact from "./components/Contact.jsx";
// import Locations from "./components/Location.jsx";
// import Footer from "./components/Footer.jsx";
// import Hero from "./components/Hero.jsx";
// const App = () => {
//   return (
//     <div>
//       <Header />
//       <Hero />
//       <Home />
//       <Services />

//       <About />
//       <Contact />
//       <Locations />
//       <ReadyToGetStarted />
//       <Footer />
//     </div>
//   );
// };

// export default App;
