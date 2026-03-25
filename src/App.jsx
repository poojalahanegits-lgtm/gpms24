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
import MainServicesPage from "./admin/ManageMainServicesPage.jsx";
import { Navigate } from "react-router-dom";

import { useAuth } from "./context/AuthContext";
import { useApp } from "./context/AppProvider.jsx";
import LeadsNavigation from "./LeadsForGpgs/LeadsNavigation.jsx";
import EditServicePage from "./admin/EditServicePage.jsx";
// import background9 from "@/assets/commanImages/9.png";
//import background9 from "./public/images/Background1.png";
// import LeadsNavigation from "./leads/LeadsNavigation.jsx";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("user");
  // or check from context if you have AuthContext

  if (!isAuthenticated) {
    return <Navigate to="/my-account" replace />;
  }
  return children;
};

const App = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { username } = useApp();
  // console.log("Logged in user:", username);
  const isAdminPage = location.pathname.startsWith("/dashboard");
  const isLeadsPage = location.pathname.startsWith("/gpms-leads");

  // useEffect(() => {
  //   const hasHash = window.location.hash;

  //   if (
  //     location.pathname !== "/" ||
  //     (location.pathname !== "/my-account" &&
  //       !location.pathname.startsWith("/dashboard")) ||
  //     hasHash
  //   ) {
  //     navigate("/", { replace: true });
  //   }
  // }, []);
  return (
    <div
      // className="bg-red-600"
      // className="min-h-screen w-full bg-cover bg-center bg-fixed"
      // className="min-h-screen w-full bg-cover bg-center bg-scroll"
      // style={{ backgroundImage: `url(${background9})` }}
      // className="min-h-screen w-full bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/images/aa.png')" }}
    >
      <Header />
      <ScrollToTop />
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Home />
              <Services />
              {/* <About /> */}
              <Contact />
              <Locations />
              {/* <ReadyToGetStarted /> */}
            </>
          }
        />

        {/* Login Page */}
        <Route path="/my-account" element={<Login />} />
        {/*  services dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainServicesPage />
            </ProtectedRoute>
          }
        />
        {/* gpms leads */}
        <Route
          path="/gpms-leads"
          element={
            <ProtectedRoute>
              <LeadsNavigation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-service/:id"
          element={
            <ProtectedRoute>
              <EditServicePage />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminPage || (!isLeadsPage && <Footer />)}
    </div>
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
