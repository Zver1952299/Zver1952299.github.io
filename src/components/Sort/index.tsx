import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { setIsOpen } from '../../redux/slices/filterSlice';

import useClickOutside from '../../hooks/useClickOutside';

import sortDark from '../../assets/Sort/arrowDark.svg';
import sortLight from '../../assets/Sort/arrowLight.svg';

import { FilterMenuRef } from '../../types/arts';

import styles from './Sort.module.scss';

function Sort({ filterMenuRef }: FilterMenuRef) {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const menuRef = useRef<HTMLButtonElement>(null);

  useClickOutside(
    menuRef,
    () => {
      dispatch(setIsOpen(false));
    },
    filterMenuRef
  );

  return (
    <button
      type="button"
      className={styles.sort}
      onClick={() => dispatch(setIsOpen(true))}
      ref={menuRef}
    >
      <img src={theme === 'dark' ? sortDark : sortLight} alt="sortLogo" />
    </button>
  );
}

export default Sort;
