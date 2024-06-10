import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../../redux/store';
import { setTheme } from '../../redux/slices/themeSlice';

import logoDark from '../../assets/Header/logo_dark.svg';
import logoLight from '../../assets/Header/logo_light.svg';
import darkIcon from '../../assets/Header/dark_icon.svg';
import lightIcon from '../../assets/Header/light_icon.svg';

import styles from './Header.module.scss';

function Header() {
  const dispatch = useDispatch();

  const theme = useSelector((state: RootState) => state.theme.theme);
  const changeTheme = (t: string) => (t === 'dark' ? 'light' : 'dark');

  const handlerTheme = () => {
    dispatch(setTheme(changeTheme(theme)));
    localStorage.setItem('theme', theme);
  };

  return (
    <div className={styles.header}>
      <img
        src={theme === 'dark' ? logoDark : logoLight}
        alt="logo"
        className={styles.logo}
      />
      <button className={styles.button} type="button" onClick={handlerTheme}>
        <img src={theme === 'dark' ? darkIcon : lightIcon} alt="icon" />
      </button>
    </div>
  );
}

export default Header;
