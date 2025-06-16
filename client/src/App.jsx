import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import LogIn from './pages/LogIn.jsx';
import SignUp from './pages/SignUp.jsx';
import Navbar from "./components/Navbar/Navbar.jsx";
import Footer from "./components/Footer/Footer.jsx";
import MainPage from "./pages/Main/MainPage.jsx";
import { userAuthStore } from "./store/useAuthUser.js";
import ProductCard from "./components/Productcard/ProductCard.jsx";
import SelectedColor from "./pages/Main/SelectByColors/SelectedColor/SelectedColor.jsx";
import SearchedItems from "./pages/Main/AllWalls/SearchedItems/SearchedItems.jsx";
import Cart from "./components/cart/Cart.jsx";
import UserProfile from "./pages/UserProfile/UserProfile.jsx";
import SelectedRoom from "./pages/Main/SelectByRoom/SelectedRoom/SelectedRoom.jsx";
import AllWalls2 from "./pages/AllWalls2/AllWalls2.jsx";

function App() {

  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  return (
    <>

      <Navbar />

      <Routes>
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/userProfile" element={authUser ? <UserProfile /> : <Navigate to="/login" replace />} />
        <Route path="/productCard/:id" element={authUser ? <ProductCard /> : <Navigate to="/login" replace />} />
        <Route path="/selectedRoom/:id" element={authUser ? <SelectedRoom /> : <Navigate to="/login" replace />} />
        <Route path="/selectedColor/:id" element={authUser ? <SelectedColor /> : <Navigate to="/login" replace />} />
        <Route path="/search" element={authUser ? <SearchedItems /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={authUser ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/shopWalls" element={authUser ? <AllWalls2 /> : <Navigate to="/login" replace />} />
      </Routes>

      <Footer />

      <Toaster
        position="bottom-center"
        toastOptions={{
          success: {
            style: {
              background: 'black',
              color: "white",
            },
          },
          error: {
            style: {
              background: 'black',
              color: "white",
            },
          },
        }}
        reverseOrder={false} />

    </>
  )
}

export default App
