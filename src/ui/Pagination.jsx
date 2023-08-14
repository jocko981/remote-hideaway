import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { PAGINATION_PAGE_SIZE } from "../utils/Constants";
import { useEffect } from "react";

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const ButtonsGroup = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) =>
    props.$active ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.$active ? "var(--color-brand-50)" : "inherit")};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  &:has(span:last-child) {
    padding-left: 0.4rem;
  }

  &:has(span:first-child) {
    padding-right: 0.4rem;
  }

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-700);
    color: var(--color-brand-50);
  }
`;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage =
    searchParams.get("page") &&
    /^-?\d+$/.test(searchParams.get("page")) &&
    !Number(searchParams.get("page")) < 1
      ? Number(searchParams.get("page"))
      : 1;
  const pageCount = Math.ceil(count / PAGINATION_PAGE_SIZE);

  useEffect(
    function () {
      if (
        (searchParams.get("page") && !/^-?\d+$/.test(searchParams.get("page"))) ||
        Number(searchParams.get("page")) < 1
      ) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
    },
    [searchParams, setSearchParams]
  );

  function nextPage() {
    const next = currentPage >= pageCount ? currentPage : currentPage - -1;

    searchParams.set("page", next);
    setSearchParams(searchParams);
  }

  function previousPage() {
    const prev = currentPage == 1 ? currentPage : currentPage - 1;

    searchParams.set("page", prev);
    setSearchParams(searchParams);
  }

  if (count <= PAGINATION_PAGE_SIZE) return null;

  return (
    <StyledPagination>
      <P>
        Showing [<span>{(currentPage - 1) * PAGINATION_PAGE_SIZE - -1}</span> to{" "}
        <span>{currentPage == pageCount ? count : currentPage * PAGINATION_PAGE_SIZE}</span>] of{" "}
        <span>{count}</span> results {`(${PAGINATION_PAGE_SIZE} per page)`}
      </P>
      <ButtonsGroup>
        <PaginationButton
          $active={currentPage == 1 ? "" : "active"}
          onClick={previousPage}
          disabled={currentPage == 1}
        >
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton
          $active={currentPage >= pageCount ? "" : "active"}
          onClick={nextPage}
          disabled={currentPage >= pageCount}
        >
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </ButtonsGroup>
    </StyledPagination>
  );
}

export default Pagination;
