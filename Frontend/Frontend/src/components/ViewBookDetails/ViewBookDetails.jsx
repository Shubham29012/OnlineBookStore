import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { useParams, useNavigate } from "react-router-dom";
import { GrLanguage } from "react-icons/gr";
import { IoHeartSharp } from "react-icons/io5";
import { FaShoppingCart, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";

const ViewBookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);

  useEffect(() => {
    const fetchBook = async () => {
      setError(false);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/get-book-by-id/${id}`
        );
        if (response.data && response.data.data) {
          setData(response.data.data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error fetching book:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  useEffect(() => {
    const checkIfInCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-user-cart", { headers });
        const cartItems = res.data.data;
        setIsInCart(cartItems.some(item => item._id === id));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (isLoggedIn) {
      checkIfInCart();
    }
  }, [id, isLoggedIn]);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleFavorite = async () => {
    if (isFavorite) {
      alert("Book is already added to favorites.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-book-to-favourite",
        { bookid: id },
        { headers }
      );
      setIsFavorite(true);
      alert(response.data.message);
    } catch (err) {
      console.error("Error adding book to favorites:", err);
      alert("Failed to add to favorites. Please try again.");
    }
  };

  const handleCart = async () => {
    if (isInCart) {
      alert("Book is already added to cart.");
      return;
    }

    try {
      const response = await axios.put(
        "http://localhost:3000/api/v1/add-to-cart",
        { bookid: id },
        { headers }
      );
      setIsInCart(true);
      alert(response.data.message);
      navigate("/cart"); // Navigate to the cart page after adding the item
    } catch (err) {
      console.error("Error adding book to cart:", err);
      alert("Failed to add to cart. Please try again.");
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/delete-book/${id}`,
        { headers }
      );
      alert("Book deleted successfully.");
      navigate("/books");
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Failed to delete the book. Please try again.");
    }
  };

  const handleEdit = () => {
    navigate(`/edit-book/${id}`);
  };

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return (
      <p className="text-center text-zinc-400">
        Unable to load book details. Please try again later.
      </p>
    );
  }

  return (
    <div className="px-6 py-6 bg-zinc-900 flex flex-col md:flex-row gap-6">
      <div className="bg-zinc-800 rounded px-4 py-12 h-auto md:h-[88vh] w-full md:w-1/2 flex items-center justify-around gap-8">
        <img
          src={data.url}
          alt="Book Cover"
          className="w-full md:h-[70vh] object-contain rounded"
        />
        <div className="flex md:flex-col gap-4">
          {isLoggedIn && (
            <>
              <button
                className={`rounded-full text-3xl p-2 ${
                  isFavorite
                    ? "text-pink-500 hover:bg-pink-100"
                    : "text-red-500 hover:bg-red-100"
                }`}
                title="Add to Favourites"
                onClick={handleFavorite}
              >
                <IoHeartSharp />
              </button>
              <button
                className={`rounded-full text-3xl p-2 ${
                  isInCart
                    ? "text-black hover:bg-black"
                    : "hover:bg-gray-200"
                }`}
                title="Add to Cart"
                onClick={handleCart}
              >
                <FaShoppingCart />
              </button>
            </>
          )}
        </div>
      </div>

      <div className="p-4 w-full md:w-1/2">
        <h1 className="text-2xl md:text-4xl text-zinc-300 font-semibold">
          {data.title}
        </h1>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">by {data.author}</p>
        <p className="text-zinc-500 mt-4 text-sm md:text-lg">{data.desc}</p>

        <p className="flex mt-4 items-center text-zinc-400 text-sm md:text-base">
          <GrLanguage className="mr-2 text-xl" /> {data.language}
        </p>

        <p className="mt-4 text-zinc-100 text-xl md:text-3xl font-semibold">
          Price: ${data.price.toFixed(2)}
        </p>

        {isLoggedIn && role === "admin" && (
          <div className="mt-6 flex gap-4">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center gap-2"
              onClick={handleEdit}
            >
              <FaEdit />
              <span>Edit Book</span>
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center gap-2"
              onClick={handleDelete}
            >
              <MdDelete />
              <span>Delete Book</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewBookDetails;