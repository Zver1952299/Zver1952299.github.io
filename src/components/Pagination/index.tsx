import ReactPaginate from 'react-paginate';

import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { AppDispatch, RootState } from '../../redux/store';
import { getTotalPages, setCurrentPage } from '../../redux/slices/pageSlice';

import arrowPrevDark from '../../assets/Pagination/arrowPrevDark.svg';
import arrowNextDark from '../../assets/Pagination/arrowNextDark.svg';
import arrowPrevLight from '../../assets/Pagination/arrowPrevLight.svg';
import arrowNextLight from '../../assets/Pagination/arrowNextLight.svg';

import styles from './pagination.module.scss';

type EventType = {
  selected: number;
};

function Pagination() {
  const dispatch = useDispatch<AppDispatch>();

  const { searchValue, valueAuthor, valueLocation, valueAgeFrom, valueAgeTo } =
    useSelector((state: RootState) => state.filter);
  const searchPages = useSelector(
    (state: RootState) => state.currentPage.searchPages
  );

  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    dispatch(getTotalPages());
  }, [dispatch]);

  const { items, status } = useSelector(
    (state: RootState) => state.currentPage
  );

  const handlePageClick = (e: EventType) =>
    dispatch(setCurrentPage(e.selected + 1));

  if (status === 'error') {
    return <div>An error occurred while uploading the data</div>;
  }

  return (
    <div>
      {status === 'loading' ? (
        <Skeleton
          width={215}
          height={24}
          baseColor={theme === 'dark' ? '#121212' : '#fff'}
          highlightColor={theme === 'dark' ? '#1a1818' : '#dedede'}
        />
      ) : (
        !searchValue &&
        !!searchPages.length &&
        !valueAuthor &&
        !valueLocation &&
        !valueAgeFrom &&
        !valueAgeTo && (
          <ReactPaginate
            pageCount={Math.ceil(items.length / 6)}
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            className={styles.container}
            pageClassName={styles.page}
            nextClassName={styles.next}
            previousClassName={styles.prev}
            activeClassName={styles.selected}
            breakClassName={styles.break}
            disabledClassName={styles.disabledArrow}
            previousLabel={
              <img
                src={theme === 'dark' ? arrowPrevDark : arrowPrevLight}
                alt="arrowPrev"
              />
            }
            nextLabel={
              <img
                src={theme === 'dark' ? arrowNextDark : arrowNextLight}
                alt="arrowNext"
              />
            }
          />
        )
      )}
    </div>
  );
}

export default Pagination;
