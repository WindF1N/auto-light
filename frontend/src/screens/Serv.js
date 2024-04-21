import styles from './styles/Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import FixedButton from '../components/FixedButton';
import SearchInput from '../components/SearchInput';
import Title from '../components/Title';
import BlocksV2 from '../components/BlocksV2';

function Serv() {

  const navigate = useNavigate();
  const [ view, setView ] = useState("grid");
  const [ items, setItems ] = useState([
    {
      image: require("./images/avatar.jpeg"),
      title: "Андрей",
      description: "Срочный выкуп автомобилей",
      price: "Цена договорная",
      name: "Александр"
    },
    {
      image: require("./images/avatar.jpeg"),
      title: "Выкуп авто в любом состоянии",
      description: "",
      price: "100 000 ₽",
      name: "Александр"
    }
  ]);

  return (
    <div className={styles.view}>
      <SearchInput />
      <Title text="Деньги под залог ПТС" allowGrid={() => setView("grid")} allowBlocks={() => setView("list")} selected={view} />
      {view === "list" &&
        <BlocksV2 items={items} />}
      {view === "grid" &&
        <div className={styles.line}>
          {items.map((item, index) => (
          <div className={styles.cellMiddle} key={index}>
            <div className={styles.image}>
              <img src={item.image} alt="" />
            </div>
            <div className={styles.information}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
          </div>))}
        </div>}
      <FixedButton />
    </div>
  );
}

export default Serv;
