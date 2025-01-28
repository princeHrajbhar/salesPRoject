"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import CustomButton from "@/components/custom ui/TestButton"; // Import your custom button
import Loader from "@/components/custom ui/Loader"; // Assuming custom loader component exists

interface MemberFormProps {
  memberId?: string;
}

const MemberForm: React.FC<MemberFormProps> = ({ memberId }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    phone: "",
    position: "",
    portfolio_url: "",
    git_url: "",
    linkdin_url: "",
    image: null as File | null,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Fetch member data for editing if memberId is provided
  useEffect(() => {
    if (memberId) {
      setLoading(true);
      fetch(`/api/member/${memberId}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            setFormData(data);
          }
        })
        .catch(() => setError("Failed to load member details.")) // Error handling without 'err'
        .finally(() => setLoading(false));
    }
  }, [memberId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
  
    // Check if files is not null or undefined
    if (files && files.length > 0) {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
    }
  };
  

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      const value = formData[key as keyof typeof formData];
      
      if (value !== null) {
        // If the value is not null, append it to FormData
        form.append(key, value instanceof File ? value : String(value)); // Handle both File and string types
      }
    });

    try {
      const method = memberId ? "PUT" : "POST";
      const url = memberId ? `/api/member/${memberId}` : "/api/member";
      const response = await fetch(url, {
        method,
        body: form,
      });
      const result = await response.json();
      if (result.error) {
        setError(result.error);
      } else {
        router.push("/member"); // Redirect to member list page
      }
    } catch {
      setError("Failed to submit the form."); // Error handling without 'err'
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{memberId ? "Edit Member" : "Add Member"}</h2>

      {loading ? (
        <Loader message="Loading form data..." />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              required
              id="name"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              id="email"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              id="description"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              id="phone"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="position" className="block font-medium">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              placeholder="Position"
              id="position"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="portfolio_url" className="block font-medium">Portfolio URL</label>
            <input
              type="url"
              name="portfolio_url"
              value={formData.portfolio_url}
              onChange={handleChange}
              placeholder="Portfolio URL"
              id="portfolio_url"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="git_url" className="block font-medium">GitHub URL</label>
            <input
              type="url"
              name="git_url"
              value={formData.git_url}
              onChange={handleChange}
              placeholder="GitHub URL"
              id="git_url"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="linkdin_url" className="block font-medium">LinkedIn URL</label>
            <input
              type="url"
              name="linkdin_url"
              value={formData.linkdin_url}
              onChange={handleChange}
              placeholder="LinkedIn URL"
              id="linkdin_url"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="image" className="block font-medium">Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              id="image"
              className="w-full p-2 border border-gray-300 rounded-lg"
            />
          </div>

          <CustomButton
            label="Submit"
            type="submit"
            isLoading={loading}
            className="mt-4"
          />
        </form>
      )}
    </div>
  );
};

export default MemberForm;
