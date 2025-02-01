import React, { useEffect, useState } from "react";
import axios from "axios";

const Settings = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/get-user-information", { headers });
        setProfileData(response.data || {}); // Ensure it's never null
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="h-screen p-4 text-zinc-100">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Settings
      </h1>

      {profileData ? (
        <>
          <div className="flex gap-12">
            <div>
              <label htmlFor="username">Username</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.username || "N/A"}
              </p>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <p className="p-2 rounded bg-zinc-800 mt-2 font-semibold">
                {profileData.email || "N/A"}
              </p>
            </div>
          </div>
        </>
      ) : (
        <p className="text-red-500 text-lg">Failed to load profile data.</p>
      )}
    </div>
  );
};

export default Settings;
