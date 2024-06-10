import ReactPaginate from 'react-paginate';

import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { useGetTotalArtQuery } from '../../redux/query/artApi';
import { setCurrentPage } from '../../redux/slices/pageSlice';

import arrowPrevDark from '../../assets/Pagination/arrowPrevDark.svg';
import arrowNextDark from '../../assets/Pagination/arrowNextDark.svg';
import arrowPrevLight from '../../assets/Pagination/arrowPrevLight.svg';
import arrowNextLight from '../../assets/Pagination/arrowNextLight.svg';

import styles from './pagination.module.scss';

type EventType = {
  selected: number;
};

function Pagination() {
  const dispatch = useDispatch();

  const { searchValue, valueAuthor, valueLocation, valueAgeFrom, valueAgeTo } =
    useSelector((state: RootState) => state.filter);
  const searchPages = useSelector(
    (state: RootState) => state.currentPage.searchPages
  );

  const theme = useSelector((state: RootState) => state.theme.theme);

  const { data = [] } = useGetTotalArtQuery();

  const handlePageClick = (e: EventType) =>
    dispatch(setCurrentPage(e.selected + 1));

  return (
    !searchValue &&
    !!searchPages.length &&
    !valueAuthor &&
    !valueLocation &&
    !valueAgeFrom &&
    !valueAgeTo && (
      <ReactPaginate
        pageCount={Math.ceil(data.length / 6)}
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
  );
}

export default Pagination;
