import styles from './styles/BlocksV2.module.css';
import { useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';

function BlocksV2({ items }) {

  const navigate = useNavigate();

  return (
    <div className={styles.items}>
      {items.map((item, index) => (
        <div className={styles.item} key={index}>
          <div className={styles.image}>
            <LazyLoadImage
              alt="item"
              src={item.image}
              placeholderSrc={item.image}/>
          </div>
          <div className={styles.information}>
            <div>{item.title}</div>
            <div>
              {item.description}
            </div>
            <div>
              {item.price}
            </div>
          </div>
          <div className={styles.avatar}>
            <img src={require("./images/like.svg").default} alt="" />
            <div className={styles.city}>
              {item.name}
            </div>
            <div className={styles.stars}>
              <img src={require("./images/stars.svg").default} alt="" />
            </div>
            <div className={styles.views}>
              3.3 млн просмотров
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BlocksV2;
