import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import { AiFillDelete } from "react-icons/ai";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate(); // To handle navigation

  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [total, setTotal] = useState(0);
  
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/get-user-cart", { headers });
        setCart(res.data.data);
        setLoading(false); // Set loading to false once data is fetched
      } catch (error) {
        console.error("Error fetching cart:", error);
        setLoading(false); // Make sure loading is false even if there's an error
      }
    };

    fetchCart();
  }, [navigate]); // Add navigate as a dependency to refetch cart when navigating

  const deleteItem = async (bookid) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/remove-from-cart/${bookid}`,
        {},
        { headers }
      );
      console.log(response);

      // Update cart state to remove the deleted item
      setCart(cart.filter(item => item._id !== bookid));
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  useEffect(() => {
    if (cart && cart.length > 0) {
      let totalAmount = 0;
      cart.forEach((item) => {
        totalAmount += item.price;
      });
      setTotal(totalAmount);
    }
  }, [cart]); // Recalculate total whenever cart changes

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/v1/place-order`,
        { order: cart },
        { headers }
      );
      alert(response.data.message);

      // Clear the cart after successful order
      setCart([]); // Empty the cart

      navigate("/profile/orderHistory"); // Navigate to order history page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader /> // Show loader while fetching data
      ) : (
        <>
          {cart.length === 0 ? (
            <div className="max-h-screen">
              <div className="h-[100%] flex items-center justify-center flex-col">
                <h1 className="text-5xl lg:text-6xl font-semibold text-zinc-400">Empty Cart</h1>
                <img src="/empty-cart.png" alt="empty cart" className="lg:h-[50vh]" />
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-5xl font-semibold text-zinc-500 mb-8">Your Cart</h1>
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="w-full my-4 rounded flex flex-col md:flex-row p-4 bg-zinc-800 justify-between items-center"
                >
                  <img className="h-[20vh] md:h-[10vh] object-cover" src={item.url} alt={item.title} />
                  <div className="w-full md:w-auto">
                    <h1 className="text-2xl text-zinc-100 font-semibold text-start mt-2 md:mt-0">{item.title}</h1>
                    <p className="text-normal text-zinc-300 mt-2 hidden lg:block">{item.desc.slice(0, 100)}...</p>
                  </div>
                  <div className="flex mt-4 w-full md:w-auto items-center justify-between">
                    <h2 className="text-zinc-100 text-3xl font-semibold">Rs {item.price}</h2>
                    <button
                      className="bg-red-100 text-red-700 rounded p-2 ms-12"
                      onClick={() => deleteItem(item._id)} // Fixed here
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </div>
              ))}
              
              {cart.length > 0 && (
                <div className="mt-4 w-full flex items-center justify-end">
                  <div className="p-4 bg-zinc-800 rounded">
                    <h1 className="text-3xl text-zinc-200 font-semibold">Total Amount</h1>
                    <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                      <h2>{cart.length} books</h2> 
                      <h2>Rs {total}</h2>
                    </div>
                    <div className="w-[100%] mt-3">
                      <button
                        className="bg-zinc-100 rounded px-4 py-2 flex justify-center w-full font-semibold hover:bg-zinc-200"
                        onClick={placeOrder}
                      >
                        Place your order
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;