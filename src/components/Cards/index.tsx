import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { RootState } from '../../redux/store';
import {
  useGetArtByParamsQuery,
  useGetTotalAuthorsQuery,
  useGetTotalLocationsQuery,
} from '../../redux/query/artApi';
import { setTotalPage } from '../../redux/slices/pageSlice';

import Card from '../Card';
import NotFound from '../NotFound';

import styles from './Cards.module.scss';
import Error from '../Error';

const skeletonCounter = [
  { id: 0 },
  { id: 1 },
  { id: 2 },
  { id: 3 },
  { id: 4 },
  { id: 5 },
];

function Cards() {
  const isNotFound = useRef(false);
  const dispatch = useDispatch();

  const { searchValue, valueAuthor, valueLocation, valueAgeFrom, valueAgeTo } =
    useSelector((state: RootState) => state.filter);
  const currentPage = useSelector(
    (state: RootState) => state.currentPage.currentPage
  );
  const theme = useSelector((state: RootState) => state.theme.theme);

  const {
    data: authors = [],
    isLoading: isLoadingAuthors,
    isError: isErrorAuthors,
  } = useGetTotalAuthorsQuery();

  const {
    data: locations = [],
    isLoading: isLoadingLocation,
    isError: isErrorLocations,
  } = useGetTotalLocationsQuery();

  const {
    data = [],
    isLoading,
    isError,
  } = useGetArtByParamsQuery({
    searchValue,
    currentPage,
    valueAuthor,
    valueLocation,
    valueAgeFrom,
    valueAgeTo,
  });

  useEffect(() => {
    dispatch(setTotalPage(data));
  }, [data, dispatch]);

  if (isError && isErrorLocations && isErrorAuthors) {
    return <Error />;
  }

  if (!isLoading) {
    isNotFound.current = true;
  }

  if (isNotFound.current && !data.length) {
    return <NotFound text={searchValue} />;
  }

  if (isLoading || isLoadingAuthors || isLoadingLocation) {
    return (
      <div className={styles.cards}>
        {skeletonCounter.map((item) => (
          <Skeleton
            className={styles.skeleton}
            width={392}
            height={260}
            baseColor={theme === 'dark' ? '#121212' : '#fff'}
            highlightColor={theme === 'dark' ? '#1a1818' : '#dedede'}
            key={item.id}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.cards}>
      {data.map((item) => (
        <Card
          data={item}
          key={item.id}
          authors={authors[item.authorId - 1]}
          locations={locations[item.locationId - 1]}
        />
      ))}
    </div>
  );
}

export default Cards;
