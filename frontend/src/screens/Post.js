import styles from './styles/Post.module.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import FixedButton from '../components/FixedButton';
import Slider from '../components/Slider';
import MiniSlider from '../components/MiniSlider';
import UserList from '../components/UserList';
import Button from '../components/Button';
import Items from '../components/Items';
import Title from '../components/Title';
import Grid from '../components/Grid';
import Banner from '../components/Banner';
import { useMainContext } from '../context';

function Post() {

  const navigate = useNavigate();
  const { id } = useParams();
  const { message, setMessage, sendMessage, posts } = useMainContext();
  const imagesDivRef = useRef();
  const [ user, setUser ] = useState(posts.filter((post) => post._id === id)[0]?.user || null);
  const [ images, setImages ] = useState(posts.filter((post) => post._id === id)[0]?.images || []);
  const [ activeImage, setActiveImage ] = useState(null);
  const [ post, setPost ] = useState(posts.filter((post) => post._id === id)[0] || null);
  const [ posts_, setPosts_ ] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [ isFavorite, setIsFavorite ] = useState(false);

  const [ damages, setDamages ] = useState([
    {
      type: "Лобовое стекло ЛКП 280",
      input1: "Трещина",
      input3: "Замена",
      input4: "",
      input5: ""
    },
    {
      type: "Передняя левая фара ЛКП 180",
      input1: "Царапина",
      input3: "Полировка",
      input4: "",
      input5: ""
    }
  ]);

  const handleAction = (e) => {
    alert('123');
  }

  useEffect(() => {
    setUser(posts.filter((post) => post._id === id)[0]?.user || null);
    setImages(posts.filter((post) => post._id === id)[0]?.images || []);
    setActiveImage(null);
    setPost(posts.filter((post) => post._id === id)[0] || null);
    setPosts_([]);
    sendMessage(JSON.stringify(["posts", "get", id]));
    sendMessage(JSON.stringify(["favorite_posts", "check", id]));
    sendMessage(JSON.stringify(["posts", "filter", {_id: {"$ne": id}, status: 1}]));
    sendMessage(JSON.stringify(["comments", "last", {post_id: id}]));
    sendMessage(JSON.stringify(["comments", "count", {post_id: id}]));
    window.scrollTo({top: 0, smooth: "behavior"});
  }, [id])

  useEffect(() => {
    if (images.length === 0) {
      sendMessage(JSON.stringify(["images", "get", id, "main"]));
    }
  }, [images])

  useEffect(() => {
    if (!user && post) {
      sendMessage(JSON.stringify(["user", "get", {_id: post.user_id}]));
    }
  }, [user, post])

  useEffect(() => {
    if (loading) {
      var l = 0;
      posts_.forEach(post => {
        if (!post.images) {
          l += 1;
        }
      });
      if (l === posts_.length) {
        setLoading(false);
      }
    }
  }, [posts_, loading])

  useEffect(() => {
    if (message) {
      if (message[0] === 'images') {
        if (message[1] === 'get') {
          if (message[3] === id) {
            setImages([...message[2]]);
          } else {
            setPosts_(prevState => {
              // Создаем копию массива постов
              const newPosts = [...prevState];
  
              // Находим пост по его _id
              const postIndex = newPosts.findIndex(post => post._id === message[3]);
  
              // Если пост найден, обновляем его изображения
              if (postIndex !== -1) {
                newPosts[postIndex].images = message[2];
              }
  
              // Обновляем состояние постов
              return newPosts;
            });
          }
        }
      } else if (message[0] === 'user') {
        if (message[1] === 'get') {
          setUser(message[2]);
        }
      } else if (message[0] === 'posts') {
        if (message[1] === 'get') {
          setPost(message[2]);
        } else if (message[1] === 'filter') {
          setPosts_(message[2]);
          message[2].forEach(item => {
            sendMessage(JSON.stringify(["images", "get", item._id, "main"]));
          })
        }
      } else if (message[0] === 'comments') {
        if (message[1] === 'last') {
          setPost(prevState => {
            var newComments;
            if ('comments' in prevState) {
              newComments = [...prevState.comments, message[2]];
            } else {
              newComments = [message[2]];
            }
            const updatedPost = { ...prevState, comments: newComments };
            return updatedPost;
          });
        } else if (message[1] === 'count') {
          setPost(prevState => ({...prevState, comments_count: message[2]}));
        }
      } else if (message[0] === 'favorite_posts') {
        if (message[1] === 'check') {
          setIsFavorite(message[2]);
        }
      }
      setMessage(null);
    };
  }, [message]);

  const handleFavorite = () => {
    sendMessage(JSON.stringify(["favorite_posts", "action", id]));
    setIsFavorite(!isFavorite);
  }

  return (
    <div className="view">
      <div className={styles.wrapper}>
        <Slider images={images} imagesDivRef={imagesDivRef} setActiveImage={setActiveImage} />
        {images.length > 1 &&
          <MiniSlider images={images} imagesDivRef={imagesDivRef} activeImage={activeImage} />}
      </div>
      <div className={styles.price}>
        <div>{post?.input39}</div>
        <div className={styles.actions}>
          <div className={styles.action} onClick={handleAction}>
            <img src={require("./images/compare.svg").default} alt="" />
            Сравнить
          </div>
          <div className={styles.action} onClick={handleFavorite}>
            <img src={isFavorite ? require("../components/images/like-active.svg").default : require("../components/images/like.svg").default} alt="" />
            Избранное
          </div>
          <div className={styles.action} onClick={handleAction}>
            <img src={require("./images/share.svg").default} alt="" />
            Поделиться
          </div>
        </div>
      </div>
      <div className={styles.title}>{post?.input5} {post?.input6}, {post?.input7}, {post?.input17}</div>
      <div className={styles.address}>{post?.address}</div>
      <div className={styles.flex}>
        <div className={styles.createdAt}>{post?.created_at}</div>
        <div className={styles.viewCount}>{post?.view_count || 0} просмотров</div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.user}>
          <UserList items={[
            {
              _id: user?._id,
              username: user?.username,
              name: user?.name,
              avatar: user?.avatar || require("../components/images/non-avatar.svg").default
            }
          ]} navigate={navigate}/>
          <div className={styles.buttons}>
            <Button text="Написать" small={true} />
            <Button text="Позвонить" small={true} />
          </div>
        </div>
      </div>
      <div style={{marginTop: 20}}>
        <Items items={[
          {
            label: "Категория",
            value: post?.input1
          },
          {
            label: "Тип автомобиля",
            value: "С пробегом"
          }
        ]} />
      </div>
      <div style={{marginTop: 10}}>
        <Items items={[
          {
            label: "Год выпуска",
            value: post?.input7
          },
          {
            label: "Поколение",
            value: post?.input8
          },
          {
            label: "Комплектация",
            value: post?.input14
          },
          {
            label: "Пробег, км",
            value: post?.input17
          },
          {
            label: "Модификация",
            value: post?.input13
          },
          {
            label: "Двигатель",
            value: post?.input10
          },
          {
            label: "Объём двигателя",
            value: post?.input11
          },
          {
            label: "Мощность",
            value: "250 л.с."
          },
          {
            label: "Налог",
            value: "3 570 ₽ в год"
          },
          {
            label: "Коробка передач",
            value: post?.input19
          },
          {
            label: "Привод",
            value: post?.input18
          },
          {
            label: "Кузов",
            value: post?.input9
          },
          {
            label: "Цвет",
            value: post?.input16
          },
          {
            label: "Руль",
            value: post?.input15
          },
          {
            label: "Состояние",
            value: "Не требует ремонта"
          },
          {
            label: "Все характеристики",
            value: <img src={require("../components/images/arrow-right.svg").default} alt="" />
          },
        ]} />
      </div>
      <div style={{marginTop: 10}}>
        <Items items={[
          {
            label: "Таможня",
            value: "Растоможен"
          },
          {
            label: "ПТС",
            value: "Оригинал"
          },
          {
            label: "Владельцев по ПТС",
            value: "1"
          },
          {
            label: "VIN / Номер кузова",
            value: "SADC*****************"
          },
          {
            label: "Госномер",
            value: "м555мм|95"
          }
        ]} />
      </div>
      {damages.length > 0 &&
        <div>
          <div className={styles.title_}>Повреждения кузова</div>
          <div className={styles.texts_}>
            <div className={styles.label_}>
              <div>Название детали</div>
              <div>Повреждения</div>
              <div>Ремонт</div>
            </div>
            {damages.map((damage, index) => (
              <div className={styles.text_} key={index}>
                <div>{damage.type}</div>
                <div>{damage.input1}</div>
                <div>{damage.input3} {damage.input4} {damage.input5}</div>
              </div>
            ))}
          </div>
        </div>}
      <Button text="Посмотреть на схеме" small={true} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} />
      <div style={{marginTop: 20}}>
        <Items items={[
          {
            label: "Дополнительные опции",
            value: <img src={require("../components/images/arrow-right.svg").default} alt="" />
          },
        ]} />
      </div>
      <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
        Этот автомобиль возможно приобрести в Кредит<br/>
        или в Рассрочку на выгодных для вас условиях!
      </div>
      <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
        Этот автомобиль возможно приобрести в Кредит<br/>
        или в Рассрочку на выгодных для вас условиях!
      </div>
      <div className={styles.wrapper}>
        {post?.description &&
        <div className={styles.descriptionBlock}>
          <Title text="Описание" />
          <div className={styles.description}>{post?.description}</div>
        </div>}
        <div className={styles.lastComment} onClick={() => navigate(`/posts/${post._id}/comments`)}>
          <div>Комментарии <span>{post?.comments_count || 0}</span></div>
          {post && post.comments &&
            <div className={styles.comment}>
              <img src={post?.comments[0].avatar || require("../components/images/non-avatar.svg").default} alt="" /> <span>{post?.comments[0].text}</span>
            </div>}
          <div className={styles.arrow}>
            <img src={require("../components/images/arrow-top-down.svg").default} alt="" />
          </div>
        </div>
      </div>
      {posts_.length > 0 && !loading &&
        <>
          <div className={styles.anotherTitle}>
            <div>Другие автомобили</div>
            <div>
              <span>Показать все</span>
              <img src={require("../components/images/arrow-right.svg").default} alt="" />
            </div>
          </div>
          <Grid items={posts_.slice(0,3)} navigate={navigate} />
        </>}

      <div className={styles.wrapper}>
        <Banner navigate={navigate} />
      </div>
      <FixedButton />
    </div>
  );
}

export default Post;
