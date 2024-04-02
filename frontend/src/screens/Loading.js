import styles from './styles/Loading.module.css';

function Loading() {
  return (
    <div className="view">
      <div className={styles.emptyPage}>
        <div className={styles.loading}>
            <div className={styles.ring}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default Loading;
