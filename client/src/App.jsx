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
import ShopWalls from "./pages/AllWalls2/ShopWalls.jsx";
import CartPage from "./components/cart/CartPage/CartPage.jsx";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";

function App() {

  const { authUser, checkAuth } = userAuthStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth]);

  return (
    <>

      <Navbar />
      <ScrollToTop/>

      <Routes>
        <Route path="*" element={<div style={{ paddingTop: "8rem", textAlign: "center",fontSize:"24px" }}>404 - Page Not Found</div>} />
        <Route path='/' element={authUser ? <MainPage /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={!authUser ? <LogIn /> : <Navigate to="/" replace />} />
        <Route path='/signup' element={!authUser ? <SignUp /> : <Navigate to="/" replace />} />
        <Route path="/userProfile" element={authUser ? <UserProfile /> : <Navigate to="/login" replace />} />
        <Route path="/walls/:id" element={authUser ? <ProductCard /> : <Navigate to="/login" replace />} />
        <Route path="/walls/room/:id" element={authUser ? <SelectedRoom /> : <Navigate to="/login" replace />} />
        <Route path="/walls/color/:id" element={authUser ? <SelectedColor /> : <Navigate to="/login" replace />} />
        <Route path="/walls/search" element={authUser ? <SearchedItems /> : <Navigate to="/login" replace />} />
        <Route path="/cart" element={authUser ? <Cart /> : <Navigate to="/login" replace />} />
        <Route path="/shopWalls" element={authUser ? <ShopWalls /> : <Navigate to="/login" replace />} />
        <Route path="/cartPage" element={authUser ? <CartPage /> : <Navigate to="/login" replace />} />
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
