import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import iconMinusDark from './iconMinusDark.svg';
import iconMinusLight from './iconMinusLight.svg';

import styles from './iconStyles.module.scss';

function IconMinusDark() {
  const theme = useSelector((state: RootState) => state.theme.theme);

  return (
    <button type="button" className={styles.icon}>
      <img src={theme === 'dark' ? iconMinusDark : iconMinusLight} alt="icon" />
    </button>
  );
}

export default IconMinusDark;
