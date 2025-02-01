import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";

const Sidebar = ({ data }) => {
  const dispatch = useDispatch();
  const history = useNavigate();

  return (
    <div className="bg-zinc-800 p-4 rounded flex flex-col items-center justify-center">
      <img src={data.avatar} className="h-[80%] rounded-full" alt="Profile Avatar" />
      <p className="mt-3 text-xl text-zinc-100 font-semibold">
        {data.username}
      </p>
      <p className="mt-1 text-normal text-zinc-300">{data.email}</p>
      <div className="w-full mt-4 h-[1px] bg-zinc-500 hidden lg:block"></div>

      <div className="w-full mt-4">
        <Link
          to="/profile/Favourites"
          className="block text-zinc-100 font-semibold py-2 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Favourites
        </Link>
        <Link
          to="/profile/orderHistory"
          className="block text-zinc-100 font-semibold py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Order History
        </Link>
        <Link
          to="/profile/settings"
          className="block text-zinc-100 font-semibold py-2 mt-4 text-center hover:bg-zinc-900 rounded transition-all duration-300">
          Settings
        </Link>
      </div>

      <button
        className="bg-zinc-900 w-3/6 lg:w-full mt-4 lg:mt-0 text-white font-semibold flex items-center justify-center py-2 rounded hover:bg-white hover:text-zinc-900 transition-all duration-300"
        onClick={() => {
          dispatch(authActions.logout());
          dispatch(authActions.changeRole("user"));

          // Correct way to remove items from localStorage
          localStorage.removeItem("id");
          localStorage.removeItem("token");
          localStorage.removeItem("role");

          // Ensure Redux updates before navigation
          setTimeout(() => {
            history("/");
          }, 100);
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default Sidebar;
