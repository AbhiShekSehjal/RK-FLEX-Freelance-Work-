import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { userAuthStore } from './store/useAuthUser.js';
import { Toaster } from 'react-hot-toast';

import AllWallpapers from './components/allWallpaers/AllWallpaers';
import LogIn from './pages/Login.jsx';
import SignUp from './pages/SignUp';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/Main/MainPage.jsx";

function App() {

  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>

      <Navbar />

      <Routes>
        {/* <Route path='/' element={authUser ? <AllWallpapers /> : <Navigate to="/login" replace />} /> */}
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <Toaster position="top-center" reverseOrder={false} />

    </>
  )
}

export default App
