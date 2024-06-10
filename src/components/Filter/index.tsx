import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import {
  setIsOpen,
  setValueAgeFrom,
  setValueAgeTo,
  setValueAuthor,
  setValueLocation,
  setVisibleTitle,
} from '../../redux/slices/filterSlice';
import { setCurrentPage } from '../../redux/slices/pageSlice';

import AccordionUsage from '../Accordion';

import closeIconDark from '../../assets/Filter/closeIconDark.svg';
import closeIconLight from '../../assets/Filter/closeIconLight.svg';

import { FilterMenuRef } from '../../types/arts';

import styles from './Filter.module.scss';

const accordionTitles = ['Artist', 'Location', 'Years'];

function Filter({ filterMenuRef }: FilterMenuRef) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const isOpen = useSelector((state: RootState) => state.filter.isOpen);

  const [dataAuthor, setDataAuthor] = useState('');
  const [dataLocation, setDataLocation] = useState('');
  const [valueFrom, setValueFrom] = useState('');
  const [valueTo, setValueTo] = useState('');

  const handleFilter = () => {
    dispatch(setValueAuthor(dataAuthor));
    dispatch(setValueLocation(dataLocation));
    dispatch(setValueAgeFrom(valueFrom));
    dispatch(setValueAgeTo(valueTo));
  };

  const handleClearFilter = () => {
    dispatch(setValueAuthor(''));
    dispatch(setValueLocation(''));
    dispatch(setValueAgeFrom(''));
    dispatch(setValueAgeTo(''));
    dispatch(setCurrentPage(1));
    dispatch(setVisibleTitle(false));
    setValueFrom('');
    setValueTo('');
    setDataAuthor('');
    setDataLocation('');
  };

  return (
    <div
      className={`${isOpen ? `${styles.wrapper} ${styles.wrapperOpen}` : `${styles.wrapper}`} `}
      ref={filterMenuRef}
    >
      <button
        type="button"
        className={styles.closeBtn}
        onClick={() => dispatch(setIsOpen(false))}
      >
        <img
          src={theme === 'dark' ? closeIconDark : closeIconLight}
          alt="closeIcon"
        />
      </button>

      <div className={styles.wrapperAccordion}>
        {accordionTitles.map((item) => (
          <AccordionUsage
            key={item}
            title={item}
            value={item === 'Artist' ? dataAuthor : dataLocation}
            onChangeValue={item === 'Artist' ? setDataAuthor : setDataLocation}
            valueFrom={valueFrom}
            valueTo={valueTo}
            onChangeInputFromValue={setValueFrom}
            onChangeInputToValue={setValueTo}
          />
        ))}
      </div>

      <div className={styles.bottomBlock}>
        <button type="button" className={styles.showBtn} onClick={handleFilter}>
          Show the results
        </button>
        <button
          type="button"
          className={styles.clearBtn}
          onClick={handleClearFilter}
        >
          Clear
        </button>
      </div>
    </div>
  );
}

export default Filter;
