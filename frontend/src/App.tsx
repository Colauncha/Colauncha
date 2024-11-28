import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./sections/Header";
import Hero from "./sections/Hero";
import TalentRequest from "./Pages/TalentRequest";
import Testimonial from "./sections/Testimonial";
import Footer from "./sections/Footer";
import About from "./Pages/About";
import Contact from "./sections/Contact";
import Mvp from "./sections/Mvp";
import Auth from "./auth/Auth";
import JoinAsTalent from "./sections/JoinAsTalent";
import BookTalent from "./sections/BookTalent";
import OurTeam from "./Pages/OurTeam";
import ProjectRequest from "./Pages/ProjectRequest";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import ProtectedRoute from "./Context/ProtectedRoute";
import { AuthProvider } from "./Context/AuthContext";
import Dashboard from "./Pages/Dashboard";

function App() {
  const { scrollYProgress } = useScroll();

  return (
    <AuthProvider>
    <AnimatePresence>
      <motion.div className="app">
        <Router>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <BookTalent />
                  <Mvp />
                  <JoinAsTalent />
                  <Testimonial />
                  <Contact />
                </>
              }
            />
            <Route path="/login" element={<Auth />} />
            <Route path="/about" element={<About />} />
            <Route path="/our-team" element={<OurTeam />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/talent-request" element={<TalentRequest />} />
          <Route path="/project-request" element={<ProjectRequest />} />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute >
                  <Dashboard/>
                </ProtectedRoute>
              }
            />
          </Routes>
          <Footer />
        </Router>
      </motion.div>
    </AnimatePresence>
    </AuthProvider>
  );
}

export default App;
