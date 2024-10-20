"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Importing icons from react-icons

type UserProfileProps = {
  user: {
    name: string;
    bio: string;
    skills: string[];
    profilePic: string;
    github: string;
    instagram: string;
    linkedin: string;
  };
};

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleSave = () => {
    console.log('Updated User Data:', updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 max-w-md w-full">
      <div className="flex flex-col items-center mb-4">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={updatedUser.profilePic}
            alt={updatedUser.name}
            layout="fill"
            objectFit="cover"
            className="rounded-full shadow-lg"
          />
        </div>
        {isEditing ? (
          <input
            type="text"
            name="name"
            value={updatedUser.name}
            onChange={handleInputChange}
            className="text-2xl font-semibold text-white bg-gray-700 rounded p-2 mb-2"
          />
        ) : (
          <h2 className="text-2xl font-semibold text-white">{updatedUser.name}</h2>
        )}
      </div>

      {isEditing ? (
        <textarea
          name="bio"
          value={updatedUser.bio}
          onChange={handleInputChange}
          className="w-full bg-gray-700 text-white rounded p-2 mb-4"
          rows={3}
        />
      ) : (
        <p className="text-gray-300 text-center mb-4">{updatedUser.bio}</p>
      )}

      <div className="flex flex-col mb-4">
        <span className="text-lg font-medium text-gray-400">Skills:</span>
        <ul className="list-disc list-inside text-gray-300">
          {updatedUser.skills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>

      {/* Social Media Icons */}
      <div className="flex space-x-4 mb-4">
        <a href={updatedUser.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <FaGithub className="w-6 h-6" />
        </a>
        <a href={updatedUser.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href={updatedUser.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
          <FaLinkedin className="w-6 h-6" />
        </a>
      </div>

      <button 
        onClick={() => setIsEditing(!isEditing)} 
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
      >
        {isEditing ? 'Cancel' : 'Edit Profile'}
      </button>
      {isEditing && (
        <button 
          onClick={handleSave} 
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition-colors"
        >
          Save Changes
        </button>
      )}
    </div>
  );
};

export default UserProfile;
