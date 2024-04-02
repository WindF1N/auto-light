import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import FixedButton from '../components/FixedButton';
import SearchInput from '../components/SearchInput';
import FlexVariables from '../components/FlexVariables';
import Title from '../components/Title';
import Grid from '../components/Grid';
import RandomGrid from '../components/RandomGrid';
import UserList from '../components/UserList';
import { useMainContext } from '../context';

function Search() {

  const navigate = useNavigate();

  const { account, sendMessage, message, setMessage, posts, users, select, setSelect } = useMainContext();

  const [variables, setVariables] = useState([
    {
      value: "transport",
      label: "Атомобили"
    },
    {
      value: "services",
      label: "Услуги"
    },
    {
      value: "dealers",
      label: "Дилеры"
    },
    {
      value: "accounts",
      label: "Аккаунты"
    },
    {
      value: "services_",
      label: "Сервисы"
    },
  ]);
  const [transport, setTransport] = useState(posts || []);
  const [services, setServices] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const [dealers, setDealers] = useState([]);
  const [accounts, setAccounts] = useState(users || []);

  useEffect(() => {
    if (accounts.length === 0 && users.length === 0) {
      sendMessage(JSON.stringify(["user", "list"]));
    } else {
      setAccounts(users);
    }
  }, [accounts, users])

  useEffect(() => {
    sendMessage(JSON.stringify(["user", "list"]));
  }, [])

  useEffect(() => {
    if (transport.length === 0) {
      setTransport(posts);
    }
  }, [])

  return (
    <div className="view">
      <SearchInput />
      <FlexVariables variables={variables} select={select} setSelect={setSelect} />
      {select === "transport" &&
        <>
          <Title text="Автомобили" allowGrid={true} allowBlocks={true}/>
          <Grid items={transport} navigate={navigate} />
        </>}
      {select === "services" &&
        <>
          <Title text="Автоуслуги" allowGrid={true} allowBlocks={true}/>
          <RandomGrid items={services} navigate={navigate} />
        </>}
      {select === "dealers" &&
        <>
          <Title text="Дилеры" allowGrid={true} allowBlocks={true}/>
          <Grid items={dealers} navigate={navigate} />
        </>}
      {select === "accounts" &&
        <>
          <Title text="Аккаунты"/>
          <UserList items={accounts} navigate={navigate} />
        </>}
      {select === "services_" &&
        <>
          <Title text="Сервисы"/>
        </>}
      <FixedButton />
    </div>
  );
}

export default Search;
