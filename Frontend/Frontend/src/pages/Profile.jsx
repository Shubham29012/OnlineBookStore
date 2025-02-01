import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Profile/Sidebar';
import { Outlet } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader/Loader'; // Assuming you have a `Loader` component

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const headers = {
        id: localStorage.getItem('id'),
        authorization: `Bearer ${localStorage.getItem('token')}`,
    };

    useEffect(() => {
        const fetchUserInformation = async () => {
            try {
                const response = await axios.get(
                    'http://localhost:3000/api/v1/get-user-information',
                    { headers }
                );
                setProfile(response.data); // Update profile state with the fetched data
            } catch (err) {
                console.error('Error fetching user information:', err);
                setError('Failed to fetch user information. Please try again later.');
            } finally {
                setLoading(false); // Set loading to false once the request is finished
            }
        };

        fetchUserInformation();
    }, []);

    if (loading) {
        return (
            <div className="bg-zinc-900 flex items-center justify-center h-screen">
                <Loader /> {/* Loader component shows while fetching data */}
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-zinc-900 flex items-center justify-center h-screen">
                <div className="text-red-500 text-2xl">{error}</div>
            </div>
        );
    }

    return (
        <div className="bg-zinc-900 px-2 md:px-12 flex flex-col md:flex-row h-screen py-8 gap-4">
            <div className="w-full md:w-1/6">
                <Sidebar data={profile} /> {/* Pass profile data to Sidebar component */}
            </div>
            <div className="w-full md:w-5/6">
                <Outlet /> {/* Render nested routes */}
            </div>
        </div>
    );
};

export default Profile;
