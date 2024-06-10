import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from './redux/store';

import Cards from './components/Cards';
import Header from './components/Header';
import Pagination from './components/Pagination';
import SettingsBlock from './components/SettingsBlock';
import Filter from './components/Filter';

import styles from './scss/app.module.scss';

function App() {
  const filterMenuRef = useRef<HTMLDivElement>(null);
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <div className={styles.wrapper}>
      <Header />
      <SettingsBlock filterMenuRef={filterMenuRef} />
      <Cards />
      <Pagination />
      <Filter filterMenuRef={filterMenuRef} />
    </div>
  );
}

export default App;
