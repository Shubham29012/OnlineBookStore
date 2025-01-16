import React, { useEffect, useState } from 'react';
import axios from "axios";
import Loader from "../Loader/Loader"; 
import { useParams } from 'react-router-dom';
import { GrLanguage } from "react-icons/gr";

const ViewBookDetails = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/v1/get-book-by-id/${id}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching book:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!data) {
    return <p className="text-center text-zinc-400">Book details not found.</p>;
  }

  return (
    <div className="px-6 py-6 bg-zinc-900 flex flex-col md:flex-row gap-6">
      {/* Image Section */}
      <div className="bg-zinc-800 rounded p-4 h-auto md:h-[88vh] w-full md:w-1/2 flex items-center justify-center">
        <img src={data.url} alt="Book Cover" className="w-full md:h-[70vh] object-contain rounded" />
      </div>

      {/* Details Section */}
      <div className="p-4 w-full md:w-1/2">
        <h1 className="text-2xl md:text-4xl text-zinc-300 font-semibold">{data.title}</h1>
        <p className="text-zinc-400 mt-1 text-sm md:text-base">by {data.author}</p>
        <p className="text-zinc-500 mt-4 text-sm md:text-lg">{data.desc}</p>

        <p className="flex mt-4 items-center text-zinc-400 text-sm md:text-base">
          <GrLanguage className="me-2 text-xl" /> {data.language}
        </p>

        <p className="mt-4 text-zinc-100 text-xl md:text-3xl font-semibold">
          Price: {data.price}
        </p>
      </div>
    </div>
  );
};

export default ViewBookDetails;
