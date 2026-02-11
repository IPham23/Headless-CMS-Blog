import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./components/PostPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function App() {
  return (
    <Router>
      <div className="h-screen flex flex-col justify-between">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<PostPage />} />
        </Routes>
        
        <Footer />
      </div>
    </Router>
  );
}
