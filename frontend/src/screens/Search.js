import styles from './styles/Search.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
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
      value: "services_",
      label: "Сервисы"
    },
    {
      value: "dealers",
      label: "Дилеры"
    },
    {
      value: "accounts",
      label: "Аккаунты"
    },
  ]);
  const [transport, setTransport] = useState(posts || []);
  const [services, setServices] = useState([
    {
      title: "Деньги под залог ПТС",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Лизинг автомобилей",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Автоюрист бесплатная консультация",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Срочная продажа автомобиля",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Электронный полис е-ОСАГО",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Техническая гарантия на автомобили с пробегом",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Автокредит онлайн без первого взноса",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Автомобили в рассрочку",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Подбор автомобиля",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Обмен автомобиля",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Выкуп автомобиля",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Помощь на дороге",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Оформление переоборудования автомобилей",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Аренда/Прокат автомобилей",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Аукцион автомобилей с пробегом",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Диагностическая карта онлайн",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Автозапчасти",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Онлайн показ автомобиля",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Лизинг авто с пробегом",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Продажа с гарантией и обеспечительным платежём",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Онлайн комиссия",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "ДТП Онлайн",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Комиссионная продажа",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Снятие запретов и ограничений",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Помощь в покупке",
      views_count: "3.3 млн просмотров"
    },
    {
      title: "Восстановление КБМ",
      views_count: "3.3 млн просмотров"
    },
  ]);
  const [services_, setServices_] = useState([
    {
      title: "Проверка истории автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/services/1"
    },
    {
      title: "Оценка стоимости автомобиля",
      views_count: "3.3 млн просмотров",
      link: "/services/2"
    },
    {
      title: "Договор купли-продажи",
      views_count: "3.3 млн просмотров",
      link: "/services/3"
    },
    {
      title: "Проверить и оплатить штрафы ГИБДД",
      views_count: "3.3 млн просмотров",
      link: "/services/4"
    },
    {
      title: "Калькулятор транспортного налога",
      views_count: "3.3 млн просмотров",
      link: "/services/5"
    },
    {
      title: "Заявление на регистрацию автомобиля в ГИБДД service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/6"
    },
    {
      title: "Заявление на замену водительского удостоверения service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/7"
    },
    {
      title: "Акт приёма-передачи автомобиля service-online.su",
      views_count: "3.3 млн просмотров",
      link: "/services/8"
    },
    {
      title: "Правила ПДД",
      views_count: "3.3 млн просмотров",
      link: "/services/9"
    },
    {
      title: "Расписка о получении денег за автомобиль",
      views_count: "3.3 млн просмотров",
      link: "/services/10"
    },
    {
      title: "Электронный акт осмотра транспортного средства",
      views_count: "3.3 млн просмотров",
      link: "/services/11"
    },
  ]);
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
    <div className={styles.view}>
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
          <Title text="Сервисы" allowGrid={true} allowBlocks={true}/>
          <RandomGrid items={services_} navigate={navigate} />
        </>}
      <FixedButton />
    </div>
  );
}

export default Search;
