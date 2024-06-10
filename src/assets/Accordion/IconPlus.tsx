import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import iconPlusDark from './iconPlusDark.svg';
import iconPlusLight from './iconPlusLight.svg';

import styles from './iconStyles.module.scss';

function IconPlusDark() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button type="button" className={styles.icon}>
      <img src={theme === 'dark' ? iconPlusDark : iconPlusLight} alt="icon" />
    </button>
  );
}

export default IconPlusDark;
