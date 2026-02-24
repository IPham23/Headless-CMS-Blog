import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PostPage from "./components/PostPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import {ThemeProvider} from "./components/ThemeContext";



export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-(--bg)">
          <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/post/:slug" element={<PostPage />} />
          </Routes>
        </main>  

          <Footer />
        </div>
      </Router>
    </ThemeProvider>

  );
}
