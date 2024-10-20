"use client"
import React, { useEffect, useState } from 'react';
import UserProfile from '@/components/Profile/UserProfile';

 
const ProfilePage: React.FC = () => {

  const user1 = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    bio: 'Web developer and tech enthusiast.',
    skills: ['JavaScript', 'React', 'Node.js'],
    profilePic: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800', // Replace with your image path
    github: 'https://github.com/johndoe',
    instagram: 'https://instagram.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  };

  const [user, setUser] = useState<{ name: string; email: string; _id: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage
        const response = await fetch('/api/user', { // Adjusted to fetch from the correct endpoint
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <>
    <div>
      <h1>User Profile</h1>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user._id}</p>
    </div>
    <div className="bg-gray-900 min-h-screen flex flex-col items-center p-8">
      <UserProfile user={user1} />
    </div>
    </>
  );
};

export default ProfilePage;
