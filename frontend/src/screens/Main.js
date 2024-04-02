import styles from './styles/Main.module.css';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Post from '../components/Post';
import FixedButton from '../components/FixedButton';
import { useMainContext } from '../context';


function Main() {

  const navigate = useNavigate();

  const { sendMessage, posts, setPosts, message, setMessage } = useMainContext();

  useEffect(() => {
    if (posts.length === 0) {
      sendMessage(JSON.stringify(["posts", "list"]));
    }
  }, [])

  useEffect(() => {
    if (message) {
      if (message[0] === 'images') {
        if (message[1] === 'get') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const newImages = [...message[2]];
              const updatedPost = { ...postToUpdate, images: newImages };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'user') {
        if (message[1] === 'get') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, user: message[2] };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'comments') {
        if (message[1] === 'last') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              var newComments;
              if ('comments' in postToUpdate) {
                newComments = [...postToUpdate.comments, message[2]];
              } else {
                newComments = [message[2]];
              }
              const updatedPost = { ...postToUpdate, comments: newComments };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        } else if (message[1] === 'count') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);

            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, comments_count: message[2] };

              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }

            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      } else if (message[0] === 'favorite_posts') {
        if (message[1] === 'check') {
          setPosts(prevState => {
            // Найдите пост, к которому нужно добавить изображения
            const postToUpdate = prevState.find(post => post._id === message[3]);
  
            // Если пост найден, добавьте изображения
            if (postToUpdate) {
              const updatedPost = { ...postToUpdate, isFavorite: message[2] };
  
              // Замените старый пост в состоянии на обновленный
              return prevState.map(post => (post._id === message[3] ? updatedPost : post));
            }
  
            // Если пост не найден, верните предыдущее состояние
            return prevState;
          });
        }
      }
      setMessage(null);
    };
  }, [message]);

  return (
    <div className="view">
      <div className={styles.header}>
        <div>
          <img src={require("./images/logo.svg").default} alt="" />
        </div>
        <div>
          Автоматизация и управление автомобильным бизнесом
        </div>
      </div>
      <div className={styles.socialMedias}>
        <div className={styles.socialMedia}>
          <div>
            <img src={require("./images/tg.svg").default} alt="" />
          </div>
          <div>
            <span>
              Мы<br/> в Telegram
            </span>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <div>
            <img src={require("./images/wa.svg").default} alt="" />
          </div>
          <div>
            <span>
              Мы<br/> в WhatsApp
            </span>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <div>
            <img src={require("./images/inst.svg").default} alt="" />
          </div>
          <div>
            <span>
              Мы<br/> в Instagram
            </span>
          </div>
        </div>
        <div className={styles.socialMedia}>
          <div>
            <img src={require("./images/vk.svg").default} alt="" />
          </div>
          <div>
            <span>
              Мы<br/> в Vkontakte
            </span>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          <span>Автоуслуги онлайн</span>
          <div>
            <span>Показать все</span>
            <img src={require("../components/images/arrow-right.svg").default} alt="" />
          </div>
        </div>
        <div className={styles.itemsWrapper}>
          <div className={styles.items}>
            <div className={styles.item}>
              <span>Помощь в продаже автомобиля</span>
              <div>902 тыс. просмотров</div>
            </div>
            <div className={styles.item}>
              <span>Помощь в покупке автомобиля</span>
              <div>54 тыс. просмотров</div>
            </div>
            <div className={styles.item}>
              <span>Электронный полис е-ОСАГО</span>
              <div>4 тыс. просмотров</div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.title}>
          <span>Сервисы онлайн</span>
          <div>
            <span>Показать все</span>
            <img src={require("../components/images/arrow-right.svg").default} alt="" />
          </div>
        </div>
        <div className={styles.itemsWrapper}>
          <div className={styles.items}>
            <div className={styles.item}>
              <span>Проверка истории автомобиля</span>
            </div>
            <div className={styles.item}>
              <span>Оценка стоимости автомобиля</span>
            </div>
            <div className={styles.item}>
              <span>Калькулятор транспортного налога</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.block}>
        <div className={styles.promo}>
          <div>
            <img src={require("../components/images/light-logo.svg").default} alt="" />
          </div>
          <div>
            <span>Откройте все приемущества</span>
            <span>Скачайте или добавьте <br/> приложение на экран "Домой"</span>
          </div>
        </div>
      </div>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <Post data={post} key={index}/>
        ))}
      </div>
      <FixedButton />
    </div>
  );
}

export default Main;
