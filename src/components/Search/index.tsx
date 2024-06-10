import { ChangeEvent, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';

import { RootState } from '../../redux/store';
import { setSearchValue } from '../../redux/slices/filterSlice';

import searchDark from '../../assets/Search/searchDark.svg';
import searchLight from '../../assets/Search/searchLight.svg';
import closeBtnDark from '../../assets/Search/closeBtnDark.svg';
import closeBtnLight from '../../assets/Search/closeBtnLight.svg';

import styles from './Search.module.scss';

function Search() {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const theme = useSelector((state: RootState) => state.theme.theme);

  const updateSearchValue = useMemo(
    () =>
      debounce((str: string) => {
        dispatch(setSearchValue(str));
      }, 500),
    [dispatch]
  );

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const onClearInput = () => {
    setValue('');
    updateSearchValue('');
  };

  return (
    <div className={styles.search}>
      <input
        className={styles.input}
        placeholder="Painting title"
        ref={inputRef}
        value={value}
        onChange={(e) => onChangeInput(e)}
      />
      <img
        src={theme === 'dark' ? searchDark : searchLight}
        alt="searchIcon"
        className={styles.icon}
      />
      {value && (
        <button
          type="button"
          onClick={() => onClearInput()}
          className={styles.closeBtn}
        >
          <img
            src={theme === 'dark' ? closeBtnDark : closeBtnLight}
            alt="closeBtn"
          />
        </button>
      )}
    </div>
  );
}

export default Search;
