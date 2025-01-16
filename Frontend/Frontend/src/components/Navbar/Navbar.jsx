import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FaGripLines } from "react-icons/fa";

const Navbar = () => {
    const links = [
        {
            title: "Home",
            link: "/",
        },
        {
            title: "All Books",
            link: "/all-books",
        },
        {
            title: "Cart",
            link: "/Cart",
        },
        {
            title: "Profile",
            link: "/profile",
        },
        {
            title: "About Us",
            link: "/about-us",
        },
    ];

    const [MobileNav, setMobileNav] = useState(false);

    return (
        <>
            <nav className="z-50 relative flex bg-zinc-800 text-white px-8 py-4 items-center justify-between">
                <Link to="/" className="flex items-center">
                    <img
                        className="h-10 me-4"
                        src="https://www.shutterstock.com/image-vector/creative-black-open-book-logo-260nw-2348154553.jpg"
                        alt="logo"
                    />
                    <h1 className="text-2xl font-semibold">ShelmBloom</h1>
                </Link>
                <div className="nav-links-shelmbloom block md:flex items-center gap-4">
                    <div className="hidden md:flex gap-4">
                        {links.map((items, i) => (
                            <Link
                                to={items.link}
                                className="hover:text-yellow-500 transition-all duration-300"
                                key={i}
                            >
                                {items.title}
                            </Link>
                        ))}
                    </div>
                    <div className="hidden md:flex gap-4">
                        <Link
                            to="/Login"
                            className="px-4 py-1 border-blue-500 hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                            SignIn
                        </Link>
                        <Link
                            to="/SignUp"
                            className="px-4 py-1 bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                        >
                            SignUp
                        </Link>
                    </div>
                    <button
                        className="text-white text-2xl hover:text-purple-400 md:hidden"
                        onClick={() => setMobileNav(!MobileNav)}
                        aria-label="Toggle mobile navigation"
                    >
                        <FaGripLines />
                    </button>
                </div>
            </nav>
            <div
                className={`${
                    MobileNav ? "flex" : "hidden"
                } bg-zinc-800 h-screen absolute top-0 left-0 w-full z-40 flex-col items-center justify-center`}
            >
                {links.map((items, i) => (
                    <Link
                        to={items.link}
                        className="text-white text-4xl mb-8 font-semibold hover:text-yellow-500 transition-all duration-300"
                        key={i}
                        onClick={() => setMobileNav(false)}
                        aria-label={`Navigate to ${items.title}`}
                    >
                        {items.title}
                    </Link>
                ))}

                <Link
                    to="/Login"
                    className="px-8 py-1 mb-8 text-3xl font-semibold bg-blue-700 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    onClick={() => setMobileNav(false)}
                    aria-label="SignIn"
                >
                    SignIn
                </Link>
                <Link
                    to="/SignUp"
                    className="px-8 py-1 mb-8 text-3xl font-semibold bg-blue-500 rounded hover:bg-white hover:text-zinc-800 transition-all duration-300"
                    onClick={() => setMobileNav(false)}
                    aria-label="SignUp"
                >
                    SignUp
                </Link>
            </div>
        </>
    );
};

export default Navbar;
