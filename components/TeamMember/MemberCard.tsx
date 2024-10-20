"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

type TeamMember = {
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  github: string;
  instagram: string;
  linkedin: string;
};

const teamMembers: TeamMember[] = [
  {
    name: 'John Doe',
    role: 'Lead Developer',
    description: 'John is a passionate developer with expertise in full-stack development.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/johndoe',
    instagram: 'https://instagram.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  {
    name: 'Alice Smith',
    role: 'UI/UX Designer',
    description: 'Alice has a keen eye for design and creates intuitive user experiences.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/alicesmith',
    instagram: 'https://instagram.com/alicesmith',
    linkedin: 'https://linkedin.com/in/alicesmith',
  },
  {
    name: 'John Doe',
    role: 'Lead Developer',
    description: 'John is a passionate developer with expertise in full-stack development.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/johndoe',
    instagram: 'https://instagram.com/johndoe',
    linkedin: 'https://linkedin.com/in/johndoe',
  },
  {
    name: 'Alice Smith',
    role: 'UI/UX Designer',
    description: 'Alice has a keen eye for design and creates intuitive user experiences.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/alicesmith',
    instagram: 'https://instagram.com/alicesmith',
    linkedin: 'https://linkedin.com/in/alicesmith',
  },
  {
    name: 'Bob Johnson',
    role: 'Project Manager',
    description: 'Bob ensures that projects are delivered on time and meet quality standards.',
    imageUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=800',
    github: 'https://github.com/bobjohnson',
    instagram: 'https://instagram.com/bobjohnson',
    linkedin: 'https://linkedin.com/in/bobjohnson',
  },
];

const TeamMemberCard: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedMember(null);
  };

  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-5xl font-bold text-white mb-12">Meet Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div 
            key={member.name} 
            className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform duration-300 hover:scale-105 cursor-pointer"
            onClick={() => openModal(member)}
          >
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-32 mb-4">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full shadow-lg"
                />
              </div>
              <h2 className="text-2xl font-semibold text-white">{member.name}</h2>
              <h3 className="text-lg font-medium text-gray-400">{member.role}</h3>
              <p className="text-gray-300 text-center mt-2 mb-4">{member.description}</p>
              <div className="flex space-x-4">
                <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faGithub} size="lg" />
                </a>
                <a href={member.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faInstagram} size="lg" />
                </a>
                <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <FontAwesomeIcon icon={faLinkedin} size="lg" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for detailed view */}
      {selectedMember && (
        <Modal 
          isOpen={modalIsOpen} 
          onRequestClose={closeModal}
          className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md mx-auto"
          overlayClassName="fixed inset-0 bg-black bg-opacity-75"
        >
          <h2 className="text-3xl font-bold text-white mb-4">{selectedMember.name}</h2>
          <div className="relative w-32 h-32 mb-4 mx-auto">
            <Image
              src={selectedMember.imageUrl}
              alt={selectedMember.name}
              layout="fill"
              objectFit="cover"
              className="rounded-full shadow-lg"
            />
          </div>
          <h3 className="text-lg font-medium text-gray-400">{selectedMember.role}</h3>
          <p className="text-gray-300 mt-2 mb-4">{selectedMember.description}</p>
          <div className="flex justify-around mt-4">
            <a href={selectedMember.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              GitHub
            </a>
            <a href={selectedMember.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              Instagram
            </a>
            <a href={selectedMember.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
              LinkedIn
            </a>
          </div>
          <button 
            onClick={closeModal} 
            className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </Modal>
      )}
    </div>
  );
};

export default TeamMemberCard;
