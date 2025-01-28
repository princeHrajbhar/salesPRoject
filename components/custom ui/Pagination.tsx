import React from "react";
import Button from "@/components/custom ui/Button"; // Import your custom Button component

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPaginationButtons = () => {
    const buttons = [];

    // Show previous button
    if (currentPage > 1) {
      buttons.push(
        <Button
          key="prev"
          text="Prev"
          onClick={() => handlePageChange(currentPage - 1)}
          type="secondary" // You can change this to "primary" if you prefer
        />
      );
    }

    // Show page number buttons
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <Button
          key={i}
          text={i.toString()}
          onClick={() => handlePageChange(i)}
          type={currentPage === i ? "primary" : "secondary"} // Highlight current page with primary style
        />
      );
    }

    // Show next button
    if (currentPage < totalPages) {
      buttons.push(
        <Button
          key="next"
          text="Next"
          onClick={() => handlePageChange(currentPage + 1)}
          type="secondary" // You can change this to "primary" if you prefer
        />
      );
    }

    return buttons;
  };

  return totalItems > itemsPerPage ? (
    <div className="flex justify-center items-center space-x-2 mt-6">
      {renderPaginationButtons()}
    </div>
  ) : null;
};

export default Pagination;
