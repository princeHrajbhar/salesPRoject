"use client"; // Mark this file as a Client Component

import React, { useEffect, useState } from "react";

// Define the Member type
interface Member {
  _id: string;
  name: string;
  email: string;
  ecell_id: string;
  description: string;
  phone: string;
  position: string;
  portfolio_url: string;
  git_url: string;
  linkdin_url: string;
  image_url: string;
}

const MembersPage = () => {
  const [members, setMembers] = useState<Member[]>([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/member");
        const data = await response.json();
        setMembers(data.data); // Store members data
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };

    fetchMembers();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-center mb-6">E-Cell Members</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {members.map((member) => (
          <div
            key={member._id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={member.image_url}
              alt={member.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Position:</strong> {member.position}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                <strong>Email:</strong> {member.email}
              </p>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Description:</strong> {member.description}
              </p>
              <div className="flex justify-between">
                <a
                  href={member.portfolio_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Portfolio
                </a>
                <a
                  href={member.git_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={member.linkdin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersPage;
