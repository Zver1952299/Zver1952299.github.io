import Search from '../Search';
import Sort from '../Sort';

import { FilterMenuRef } from '../../types/arts';

import styles from './SettingsBlock.module.scss';

function SettingsBlock({ filterMenuRef }: FilterMenuRef) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Search />
        <Sort filterMenuRef={filterMenuRef} />
      </div>
    </div>
  );
}

export default SettingsBlock;
