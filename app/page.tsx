"use client"
import React, { useState } from "react";
import Button from "@/components/custom ui/Button"; // Ensure the correct path for the Button component
import Loader from "@/components/custom ui/Loader"; // Ensure the correct path for the Loader component
import Image from "next/image"; // Import the Image component from Next.js

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
  const [loading, setLoading] = useState<boolean>(false); // State for loading status

  // Fetch data from the API when the button is clicked
  const fetchMembers = async () => {
    setLoading(true); // Start loading
    try {
      const response = await fetch("/api/member"); // Hit the /api/member endpoint
      const data = await response.json();
      
      if (data && data.data) {
        setMembers(data.data); // Store members data
      } else {
        console.error("No data returned");
      }
    } catch (error) {
      console.error("Error fetching members:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center py-8">
      <h1 className="text-3xl font-bold mb-6">E-Cell Members</h1>

      {/* Button to load data */}
      <div className="text-center mb-6">
        <Button
          text={loading ? "Loading..." : "Load Members Data"}
          onClick={fetchMembers}
        />
      </div>

      {/* Members Grid */}
      {loading ? (
        <Loader /> // Display Loader while data is fetching
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.length > 0 ? (
            members.map((member) => (
              <div
                key={member._id}
                className="bg-gray-100 text-black shadow-md rounded-lg overflow-hidden"
              >
                {/* Image component */}
                <Image
                  src={member.image_url}
                  alt={member.name}
                  width={500} // Set the width as required
                  height={300} // Set the height as required
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{member.name}</h2>
                  <p className="text-sm text-gray-800 mb-1">
                    <strong>Position:</strong> {member.position}
                  </p>
                  <p className="text-sm text-gray-800 mb-1">
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p className="text-sm text-gray-800 mb-3">
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
            ))
          ) : (
            <p className="text-center text-gray-600">No members to display</p>
          )}
        </div>
      )}
    </div>
  );
};

export default MembersPage;
