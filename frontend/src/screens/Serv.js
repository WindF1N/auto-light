import styles from './styles/Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import FixedButton from '../components/FixedButton';
import SearchInput from '../components/SearchInput';
import FlexVariables from '../components/FlexVariables';
import Title from '../components/Title';
import Grid from '../components/Grid';
import DataItems from '../components/DataItems';
import BlocksV2 from '../components/BlocksV2';
import RandomGrid from '../components/RandomGrid';
import UserList from '../components/UserList';
import Button from '../components/Button';
import { useMainContext } from '../context';

function Serv() {

  const navigate = useNavigate();

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
      <Title text="Деньги под залог ПТС" allowBlocks={() => null} allowGrid={() => null} selected={"grid"} />
      <BlocksV2 items={items} />
      <FixedButton />
    </div>
  );
}

export default Serv;
