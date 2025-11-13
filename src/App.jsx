import React, { useState, useEffect } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./assets/components/Navbar";
import Footer from "./assets/components/Footer";
import AppRoutes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import { ThemeProvider, useTheme } from "./assets/components/ThemeProvider";

function AppContent() {
  const [user, setUser] = useState(null);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  const hideLayout = location.pathname === "/404";

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">
      {!hideLayout && <Navbar user={user} />}
      <div className="pt-20">
        <AppRoutes user={user} />
      </div>
      {!hideLayout && <Footer />}
      <ToastContainer position="top-right" />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
 );
}

export default App;
