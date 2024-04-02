import styles from './styles/Grid.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useEffect, useState } from 'react';


function Grid({ items: initialItems, navigate }) {

  const [ items, setItems ] = useState([]);

  useEffect(() => {
    if (items.length == 0 && initialItems.length > 0) {
      setItems(prevState => {
        const combinedList = [...prevState]; // Копируем текущее состояние в новый список

        initialItems.forEach(item => {
          // Находим все индексы, где количество элементов меньше или равно 3
          const validIndices = combinedList.reduce((acc, list, index) => {
            if (list.length <= 3) {
              acc.push(index);
            }
            return acc;
          }, []);

          if (validIndices.length > 0) {
            // Выбираем случайный индекс из доступных
            const randomIndex = validIndices[Math.floor(Math.random() * validIndices.length)];
            // Добавляем элемент в выбранный индекс
            combinedList[randomIndex].push(item);
          } else {
            // Если нет доступных индексов, создаем новый список с элементом
            combinedList.push([item]);
          }
        });

        return combinedList; // Обновляем состояние posts
      });
    }
  }, [initialItems, items]);

  return (
    <div className={styles.grid}>
      {items.map((l, index) => (
        <div key={index}>
          {(l.length > 0 && l.length === 3) &&
          <div className={styles.line}>
            {l.map((item, index) => (
            <div className={styles.cellSmall} onClick={() => navigate('/posts/' + item._id)} key={item._id}>
              <div className={styles.image}>
                {item.images &&
                <LazyLoadImage
                  alt="item"
                  src={item.images[0].file}
                  placeholderSrc={item.images[0].file_lazy}/>}
              </div>
              <div className={styles.information}>
                <div className={styles.title}>{item.input39}</div>
                <div className={styles.price}>{item.input5} {item.input6}, {item.input7}, {item.input17}</div>
              </div>
            </div>))}
          </div>}
          {(l.length > 0 && l.length === 1) &&
          <div>
            {l.map((item, index) => (
            <div className={styles.cellBig} onClick={() => navigate('/posts/' + item._id)} key={item._id}>
              <div className={styles.image}>
                {item.images &&
                <LazyLoadImage
                  alt="item"
                  src={item.images[0].file}
                  placeholderSrc={item.images[0].file_lazy}/>}
              </div>
              <div className={styles.information}>
                <div className={styles.title}>{item.input39}</div>
                <div className={styles.price}>{item.input5} {item.input6}, {item.input7}, {item.input17}</div>
              </div>
            </div>))}
          </div>}
          {(l.length > 0 && l.length === 2) &&
          <div className={styles.line}>
            {l.map((item, index) => (
            <div className={styles.cellMiddle} onClick={() => navigate('/posts/' + item._id)} key={item._id}>
              <div className={styles.image}>
                {item.images &&
                <LazyLoadImage
                  alt="item"
                  src={item.images[0].file}
                  placeholderSrc={item.images[0].file_lazy}/>}
              </div>
              <div className={styles.information}>
                <div className={styles.title}>{item.input39}</div>
                <div className={styles.price}>{item.input5} {item.input6}, {item.input7}, {item.input17}</div>
              </div>
            </div>))}
          </div>}
        </div>
      ))}
    </div>
  );
}

export default Grid;
