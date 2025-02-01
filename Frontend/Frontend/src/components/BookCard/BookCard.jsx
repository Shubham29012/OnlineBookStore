import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const BookCard = ({ data, favourite, setFavouriteBooks }) => {
  const [isRemoved, setIsRemoved] = useState(false);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const handleRemoveBook = async () => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/api/v1/remove-book-to-favourite",
        {
          headers,
          data: { bookid: data._id }, // Send bookid in the request body
        }
      );
      alert(response.data.message); // Show success message

      // Mark this book as removed
      setIsRemoved(true);

      // Fetch the updated favourites list from the server
      const updatedFavourites = await axios.get(
        "http://localhost:3000/api/v1/get-favourites",
        { headers }
      );
      setFavouriteBooks(updatedFavourites.data); // Update the list in the parent component
    } catch (error) {
      alert(error.response?.data?.message || "Failed to remove book from favourites");
      console.error("Error:", error);
    }
  };

  if (isRemoved) return null; // Don't render the card if the book is removed

  return (
    <>
      <Link to={`/view-book-details/${data._id}`}>
        <div className="bg-zinc-800 rounded p-4 flex flex-col">
          <div className="bg-zinc-900 rounded flex items-center justify-center">
            <img src={data.url} alt={data.title} className="h-[25vh]" />
          </div>
          <h2 className="mt-4 text-xl font-semibold">{data.title}</h2>
          <p className="mt-2 text-zinc-400 font-semibold">By {data.author}</p>
          <p className="mt-2 text-zinc-200 font-semibold text-xl">₹ {data.price}</p>
        </div>
      </Link>
      {favourite && (
        <button
          className="bg-yellow-200 px-4 py-2 rounded border-yellow-500 text-yellow-500 mt-2"
          onClick={handleRemoveBook}
        >
          Remove Book From Favourite
        </button>
      )}
    </>
  );
};

export default BookCard;
