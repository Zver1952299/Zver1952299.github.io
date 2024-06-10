import styles from './Error.module.scss';

function Error() {
  return (
    <div className={styles.error}>
      <h3>An error occurred while uploading the data</h3>
    </div>
  );
}

export default Error;
