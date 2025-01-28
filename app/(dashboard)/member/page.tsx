"use client"
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TeamCard from "@/components/Member/TeamCard"; // Import the TeamCard component
import Button from "@/components/custom ui/Button"; // Assuming Button is a custom component
import Loader from "@/components/custom ui/Loader"; // Assuming Loader is a custom component
import Pagination from "@/components/custom ui/Pagination"; // Assuming Pagination is a custom component

// Define the TeamMember type
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

const TeamPage = () => {
  const [teamData, setTeamData] = useState<TeamMember[]>([]);
  const [filteredData, setFilteredData] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const itemsPerPage = 12;

  const router = useRouter(); // Initialize useRouter

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/member?page=${currentPage}&limit=${itemsPerPage}`);
      if (!response.ok) throw new Error("Failed to fetch team data.");

      const data = await response.json();
      setTeamData(data.data || []);
      setFilteredData(data.data || []);
      setTotalItems(data.totalCount || 0);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);  // Now accessing message safely
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = teamData.filter((member) =>
      member.name.toLowerCase().includes(query) || member.ecell_id.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleMemberDelete = () => {
    fetchData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Member List</h1>

        {/* Search Bar */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Search by name or eCell ID..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>

        {/* Add Member Button */}
        <Button text="Add Member" onClick={() => router.push("/member/new")} type="primary" />
      </div>

      <div className="border-b-2 border-gray-800 mb-6"></div>

      {loading ? (
        <Loader message="Loading team data..." />
      ) : error ? (
        <p className="text-center text-red-500">{`Error: ${error}`}</p>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData.length > 0 ? (
              filteredData.map((member) => (
                <TeamCard key={member._id} member={member} onDelete={handleMemberDelete} />
              ))
            ) : (
              <p className="text-center text-gray-500 col-span-full">
                No members found.
              </p>
            )}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default TeamPage;
