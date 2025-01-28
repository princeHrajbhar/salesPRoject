import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaExternalLinkAlt } from "react-icons/fa"; // Import icons
import { useRouter } from 'next/navigation'; // Import useRouter from next/navigation
import axios from 'axios';
import { toast } from 'react-toastify'; // Import Toastify
import ConfirmationModal from '@/components/custom ui/Aleart'; // Import ConfirmationModal
import Image from 'next/image'; // Import Image from next/image

interface TeamMember {
  _id: string;
  name: string;
  email: string;
  position: string;
  description: string;
  phone: string;
  ecell_id: string;
  portfolio_url: string;
  git_url: string;
  linkdin_url: string;
  image_url: string;
}

interface TeamCardProps {
  member: TeamMember;
  onDelete: () => void;  // New prop for delete action
}

const TeamCard: React.FC<TeamCardProps> = ({ member, onDelete }) => {
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const router = useRouter(); // Use useRouter from next/navigation for navigation

  // Function to handle delete confirmation
  const handleDeleteConfirmation = () => {
    setIsConfirmDelete(true); // Show the confirmation modal
  };

  // Function to handle cancel of delete action
  const cancelDelete = () => {
    setIsConfirmDelete(false); // Close the confirmation modal
  };

  // Function to handle deletion of the member
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/api/member/${member._id}`);
      if (response.status === 200) {
        toast.success("Member deleted successfully"); // Show success toast
        onDelete();  // Trigger the re-fetch in the parent component
      }
    } catch (error) {
      console.error("Error deleting member:", error);
      toast.error("Failed to delete the member"); // Show error toast
    }
    setIsConfirmDelete(false); // Close the confirmation modal after delete
  };

  // Function to handle edit navigation
  const handleEdit = () => {
    router.push(`/member/${member._id}`);  // Navigate to the edit page with member's _id
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center max-w-xs w-full h-full relative border border-black">
      {/* Delete Button (top-right corner) */}
      <button
        onClick={handleDeleteConfirmation}
        className="absolute top-2 right-2 w-4 h-4 bg-red-500 rounded-full hover:bg-red-700 flex justify-center items-center transition-all"
        title="Delete"
      >
        <span className="text-white text-xs font-semibold">-</span> {/* Smaller red dot */}
      </button>

      {/* Edit Button (top-left corner) */}
      <button
        onClick={handleEdit}
        className="absolute top-2 left-2 w-4 h-4 bg-blue-500 rounded-full hover:bg-blue-700 flex justify-center items-center transition-all"
        title="Edit"
      >
        <span className="text-white text-xs font-semibold">E</span> {/* Edit button text */}
      </button>

      <Image
  src={member.image_url || "/default-image.png"}
  alt={member.name}
  width={96} // Fixed width for consistent sizing
  height={96} // Fixed height for consistent sizing
  className="rounded-full object-cover mb-4 w-[120px] h-[120px]" // Rounded and fixed size
/>

      <h3 className="text-xl font-bold text-gray-800 text-center">{member.name}</h3>
      <p className="text-sm text-gray-600 text-center">{member.position}</p>
      <p className="mt-2 text-gray-700 text-center">{member.description}</p>

      <div className="mt-4 w-full">
        <p className="text-sm text-gray-500">
          <span className="font-semibold">E-Cell ID:</span> {member.ecell_id}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Email:</span> {member.email}
        </p>
        <p className="text-sm text-gray-500">
          <span className="font-semibold">Phone:</span> {member.phone}
        </p>
      </div>

      <div className="mt-4 flex justify-around w-full space-x-4">
        {member.portfolio_url && (
          <a
            href={member.portfolio_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-700"
          >
            <FaExternalLinkAlt size={24} />
          </a>
        )}

        {member.git_url && (
          <a
            href={member.git_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-700 hover:text-gray-900"
          >
            <FaGithub size={24} />
          </a>
        )}

        {member.linkdin_url && (
          <a
            href={member.linkdin_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <FaLinkedin size={24} />
          </a>
        )}
      </div>

      {/* Use the ConfirmationModal Component */}
      <ConfirmationModal
        isOpen={isConfirmDelete}
        onConfirm={handleDelete}
        onCancel={cancelDelete}
        message={`Are you sure you want to delete ${member.name}?`}
      />
    </div>
  );
};

export default TeamCard;
