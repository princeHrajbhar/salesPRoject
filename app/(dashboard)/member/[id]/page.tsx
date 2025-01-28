"use client";

import React, { useEffect, useState } from "react";
import MemberForm from "@/components/Member/Form"; // Import the form component

const EditMemberPage = ({ params }: { params: { id: string } }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if the member ID is valid (or loaded properly)
    if (!params.id) {
      setError("Invalid member ID");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <MemberForm memberId={params.id} />
    </div>
  );
};

export default EditMemberPage;
