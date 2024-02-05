import { FC } from "react";

import { ArrowBack } from "@/components/ui/icons/arrow-back/ArrowBack";
import { ArrowForward } from "@/components/ui/icons/arrow-forward/ArrowForward";
import { PaginationControls } from "@/components/ui/pagination/PaginationControls/PaginationControls";
import { usePagination } from "@/components/ui/pagination/usePagination";

import s from "./pagination.module.scss";

export type PaginationProps = {
  availablePageSizes: (number | string)[];
  currentPage: number;
  onChangePageSize: (pageSize: number | string) => void;
  onPageChange: (page: number | string) => void;
  pageSize: number;
  siblingCount?: number;
  totalCount: number | undefined;
};

export const Pagination: FC<PaginationProps> = ({
  availablePageSizes,
  currentPage,
  onChangePageSize,
  onPageChange,
  pageSize,
  siblingCount,
  totalCount = 0,
}) => {
  const paginationRange = usePagination({
    currentPage,
    pageSize,
    siblingCount,
    totalCount,
  });

  if (currentPage === 0 || (paginationRange && paginationRange.length < 2)) {
    return null;
  }
  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };
  const lastPage = paginationRange[paginationRange.length - 1];
  const currentOptions = availablePageSizes.filter(
    (el) => totalCount / +el > 1,
  );

  return (
    <div className={s.container}>
      <ul className={s.paginationContainer}>
        <li
          className={`${s.paginationItem} ${currentPage === 1 && s.disabled}`}
          onClick={onPrevious}
        >
          <ArrowBack />
        </li>
        {paginationRange.map((pageNumber, index) => {
          if (pageNumber === "...") {
            return (
              <li className={`${s.paginationItem} ${s.dots}`} key={index}>
                &#8230;
              </li>
            );
          }

          return (
            <li
              className={`${s.paginationItem} ${
                pageNumber === currentPage && s.selected
              }`}
              key={index}
              onClick={() => onPageChange(pageNumber)}
            >
              {pageNumber}
            </li>
          );
        })}
        <li
          className={`${s.paginationItem} ${
            currentPage === lastPage && s.disabled
          }`}
          onClick={onNext}
        >
          <ArrowForward className={s.arrow} />
        </li>
      </ul>
      <PaginationControls
        currentOptions={currentOptions}
        onChangePageSize={onChangePageSize}
      />
    </div>
  );
};
