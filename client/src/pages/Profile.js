import React, { useState, useEffect } from 'react';
import { singleUserGet } from '../api/api';
import { useParams } from 'react-router-dom';

const Profile = () => {
    const [user, setUser] = useState({});
    const { id } = useParams();

    const userProfile = async () => {
        const res = await singleUserGet(id);
        if (res.status === 200) {
            console.log("User data: ", res.data);
            setUser(res.data);
        } else {
            console.log("error");
        }
    };

    useEffect(() => {
        userProfile();
    }, [id]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-500 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{user.fname + " " + user.lname}</h2>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Email:</h3>
                    <p className="text-gray-600">{user.email}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Mobile:</h3>
                    <p className="text-gray-600">{user.mobile}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Gender:</h3>
                    <p className="text-gray-600">{user.gender}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Status:</h3>
                    <p className={`text-gray-600 ${user.status === 'Active' ? 'text-green-500' : 'text-red-500'}`}>{user.status}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-700">Location:</h3>
                    <p className="text-gray-600">{user.location}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
