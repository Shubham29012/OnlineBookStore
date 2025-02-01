import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";
import { useSelector } from "react-redux";

const Navbar = () => {
    let links = [
        { title: "Home", link: "/" },
        { title: "All Books", link: "/all-books" },
        { title: "Cart", link: "/cart" },
        { title: "Profile", link: "/profile" },
        { title: "About Us", link: "/about-us" },
        { title: "Admin Profile", link: "/admin-profile" },
    ];

    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    let filteredLinks = [...links];

    if (!isLoggedIn) {
        filteredLinks = filteredLinks.filter(link => link.title !== "Cart" && link.title !== "Profile");
    }
    if (isLoggedIn && role === "admin") {
        filteredLinks = filteredLinks.filter(link => link.title !== "Profile");
    }

    const [mobileNav, setMobileNav] = useState(false);

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                {/* Logo */}
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://www.shutterstock.com/image-vector/creative-black-open-book-logo-260nw-2348154553.jpg"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">ShelmBloom</h1>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-4">
                    {filteredLinks.map((item, i) => (
                        <Link
                            to={item.link}
                            className={`hover:text-white transition-all duration-300 ${item.title === "Profile" ? "text-yellow-500 hover:text-white" : "hover:text-yellow-500"}`}
                            key={i}
                        >
                            {item.title}
                        </Link>
                    ))}

                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-1 border border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>

                {/* Mobile Navigation Toggle */}
                <button
                    className="text-white text-2xl hover:text-purple-400 md:hidden"
                    onClick={() => setMobileNav(!mobileNav)}
                    aria-label="Toggle mobile navigation"
                >
                    <FaGripLines />
                </button>
            </nav>

            {/* Mobile Navigation */}
            {mobileNav && (
                <div className="bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex flex-col items-center justify-center">
                    {filteredLinks.map((item, i) => (
                        <Link
                            to={item.link}
                            className="text-white text-4xl mb-8 font-semibold hover:text-yellow-500 transition-all duration-300"
                            key={i}
                            onClick={() => setMobileNav(false)}
                            aria-label={`Navigate to ${item.title}`}
                        >
                            {item.title}
                        </Link>
                    ))}

                    {!isLoggedIn && (
                        <>
                            <Link
                                to="/login"
                                className="px-8 py-1 mb-8 text-3xl font-semibold bg-blue-700 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                onClick={() => setMobileNav(false)}
                                aria-label="Sign In"
                            >
                                Sign In
                            </Link>
                            <Link
                                to="/signup"
                                className="px-8 py-1 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                                onClick={() => setMobileNav(false)}
                                aria-label="Sign Up"
                            >
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default Navbar;
