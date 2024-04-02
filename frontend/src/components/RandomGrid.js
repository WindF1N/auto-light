import styles from './styles/RandomGrid.module.css';

function RandomGrid({ items, navigate }) {
  return (
    <div className={styles.grid}>
      {items.map((item, index) => (
        <div key={index} className={`${styles.item} ${Math.random() < 0.5 ? styles.wide : ''}`} style={{ flexBasis: `${Math.random() < 0.5 ? 33.333 : 66.666}%`, height: `${Math.random() < 0.5 ? '100px' : '200px'}` }} />
      ))}
    </div>
  );
}

export default RandomGrid;
