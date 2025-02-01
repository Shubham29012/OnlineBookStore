import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/auth';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

import Home from './pages/Home';
import AllBooks from './pages/AllBooks';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Aboutus from './pages/Aboutus';
import Cart from './pages/Cart';
import Profile from './pages/Profile';
import ViewBookDetails from './components/ViewBookDetails/ViewBookDetails';
import Favourites from './components/Profile/Favourites';
import UserOrderHistory from './components/Profile/UserOrderHistory';
import Settings from './components/Profile/Settings';

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const id = localStorage.getItem('id');
        const token = localStorage.getItem('token');
        const storedRole = localStorage.getItem('role');

        if (id && token && storedRole) {
            dispatch(authActions.login());
            dispatch(authActions.changedRole(storedRole));
        }
    }, [dispatch]);

    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/all-books" element={<AllBooks />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/profile" element={<Profile />}>
                <Route index element={<Favourites />} /> {/* Default child route */}
                <Route path="Favourites" element={<Favourites />} /> {/* Default child route */}
                    <Route path="orderHistory" element={<UserOrderHistory />} />
                    <Route path="settings" element={<Settings />} />
                </Route>
                <Route path="/about-us" element={<Aboutus />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/view-book-details/:id" element={<ViewBookDetails />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;
