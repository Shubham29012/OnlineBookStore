import React from 'react'
import Home from './pages/Home';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Aboutus from './pages/Aboutus';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import Hero from "./components/Home/Hero";
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';



function App() {
  return (
    <div>
      <Router> 
         <Navbar />
         <Routes>
          <Route exact path="/" element={<Home />}/>
          <Route path="/all-books" element={<AllBooks />}/>
          <Route path="/Cart" element={<Cart />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/about-us" element={<Aboutus />}/>
          <Route path="/SignUp" element={<SignUp />}/>
          <Route path="/Login" element={<Login />}/>
          <Route path="view-book-details/:id" element={<ViewBookDetails />}/>
         </Routes>
         <Footer />
      </Router>
      
    </div>
  )
}

export default App
