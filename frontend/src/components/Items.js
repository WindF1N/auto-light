import styles from './styles/Items.module.css';

function Items({ items }) {

  return (
    <div className={styles.items}>
      {items.map((item, index) => (
        <div className={styles.item} key={index} style={Array.isArray(item.value) ? {flexFlow: "column", gap: 5, alignItems: "flex-start"} : null}>
          <div>{item.label}</div>
          {Array.isArray(item.value) ?
            <div style={{display: "flex", flexWrap: "wrap", gap: 5}}>
              {item.value.map((i, index) => (
                <div style={{whiteSpace: "nowrap", padding: 5, background: "#28282A", borderRadius: 5}}>{i}</div>
              ))}
            </div>
          :
            <div>{item.value}</div>
          }
        </div>
      ))}
    </div>
  );
}

export default Items;
