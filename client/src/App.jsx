import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/Main/MainPage.jsx";
import { userAuthStore } from "./store/useAuthUser.js";
import UserProfile from "./pages/userPage/UserProfile/UserProfile.jsx";

function App() {

  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/userProfile" element={authUser ? <UserProfile /> : <Navigate to="/login" />} />
      </Routes>

      <Footer />

      <Toaster position="top-center" reverseOrder={false} />

    </>
  )
}

export default App
