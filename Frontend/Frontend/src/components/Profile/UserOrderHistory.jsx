import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom"; // Import Link for navigation

const UserOrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState(null); // Set initial state to null

  const headers = {
    id: localStorage.getItem("id") || "", // Prevent null values
    authorization: `Bearer ${localStorage.getItem("token") || ""}`,
  };

  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/get-order-history",
          { headers }
        );
        console.log("Fetched order history:", response.data.data); // Log the response data to check the structure
        setOrderHistory(response.data.data || []); // Ensure array state
      } catch (error) {
        console.error("Error fetching order history:", error.response?.data || error.message);
        setOrderHistory([]); // Prevent crashes
      }
    };
    fetchOrderHistory();
  }, []);

  return (
    <>
      {orderHistory === null ? <Loader /> : null}

      {orderHistory && orderHistory.length === 0 && (
        <div className="h-[80vh] p-4 text-zinc-100">
          <div className="h-[100%] flex flex-col items-center justify-center">
            <h1 className="text-5xl font-semibold text-zinc-500">No order History</h1>
            <img
              src="https://example.com/your-image.png" // Replace with an actual image URL
              alt="No order history"
              className="h-[20vh] mb-8"
            />
          </div>
        </div>
      )}

      {orderHistory && orderHistory.length > 0 && (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            Your Order History
          </h1>

          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-none md:w-[5%] hidden md:block">
              <h1>Mode</h1>
            </div>
          </div>

          {orderHistory.map((order, index) => (
            <div key={index}>
              {/* Check if books exist in this order */}
              {order.books && order.books.length > 0 ? (
                order.books.map((book, bookIndex) => (
                  <div
                    key={bookIndex}
                    className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2"
                  >
                    <div className="w-[3%]">
                      <h1 className="text-center">{index + 1}</h1>
                    </div>
                    <div className="w-[22%]">
                      <Link
                        to={`/view-book-details/${book._id}`} // Corrected the path for multiple books
                        className="hover:text-blue-300"
                      >
                        {book.title}
                      </Link>
                    </div>
                    <div className="w-[45%]">
                      <h1>{book.desc.slice(0, 50)} ...</h1>
                    </div>
                    <div className="w-[9%]">
                      <h1>{book.price}</h1>
                    </div>
                    <div className="w-[16%]">
                      <h1 className="font-semibold text-green-500">
                        {order.status === "Order placed" ? (
                          <div className="text-yellow-500">{order.status}</div>
                        ) : order.status === "Canceled" ? (
                          <div className="text-red-500">{order.status}</div>
                        ) : (
                          order.status
                        )}
                      </h1>
                    </div>
                    <div className="w-none md:w-[5%] hidden md:block">
                      <h1 className="text-sm text-zinc-400">COD</h1>
                    </div>
                  </div>
                ))
              ) : (
                <div>No books in this order</div> 
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
