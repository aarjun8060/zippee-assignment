import React, { useMemo } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "./ui/pagination";
import { API_URL } from "../config";
import { getPageNumber } from "../lib/utils";

interface CharactersPaginationProps {
  totalCount: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  onPageChange: (pageUrl: string | null) => void;
}

const ITEMS_PER_PAGE = 10;

const CharactersPagination = ({
  totalCount,
  nextPageUrl,
  previousPageUrl,
  onPageChange,
}: CharactersPaginationProps) => {
  const currentPage = useMemo(() => {
    if (previousPageUrl) {
      return getPageNumber(previousPageUrl) + 1;
    } else if (nextPageUrl) {
      return getPageNumber(nextPageUrl) - 1;
    }
    // If no previous URL, we're on page 1
    return 1;
  }, [previousPageUrl, nextPageUrl]);

  const totalPages = useMemo(() => {
    return Math.ceil(totalCount / ITEMS_PER_PAGE);
  }, [totalCount]);

  // Calculate which page numbers to show
  const visiblePages = useMemo(() => {
    const pages: (number | "ellipsis")[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage <= 3) {
        // Near the start
        for (let i = 2; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // Near the end
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        // In the middle
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  }, [currentPage, totalPages]);

  const handlePageClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    pageNumber: number
  ) => {
    e.preventDefault();
    if (pageNumber === currentPage) return;

    const pageUrl =
      pageNumber === 1
        ? null
        : `${API_URL}/people/?page=${pageNumber}`;

    onPageChange(pageUrl);
  };

  const handlePrevious = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (previousPageUrl) {
      onPageChange(previousPageUrl);
    }
  };

  const handleNext = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (nextPageUrl) {
      onPageChange(nextPageUrl);
    }
  };


  if (totalPages <= 1 || totalCount === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={handlePrevious}
              className={
                !previousPageUrl
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              aria-disabled={!previousPageUrl}
              href={previousPageUrl || "#"}
            />
          </PaginationItem>

          {visiblePages.map((page, index) => {
            if (page === "ellipsis") {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  onClick={(e) => handlePageClick(e, page)}
                  isActive={page === currentPage}
                  className="cursor-pointer"
                  href="#"
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>
            <PaginationNext
              onClick={handleNext}
              className={
                !nextPageUrl
                  ? "pointer-events-none opacity-50"
                  : "cursor-pointer"
              }
              aria-disabled={!nextPageUrl}
              href={nextPageUrl || "#"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default CharactersPagination;
