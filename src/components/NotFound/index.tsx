import styles from './NotFound.module.scss';

function NotFound({ text }: { text: string }) {
  return (
    <div className={styles.notFound}>
      <h3>
        No matches for <span>{text}</span>
      </h3>
      <h4>Please try again with a different spelling or keywords.</h4>
    </div>
  );
}

export default NotFound;
