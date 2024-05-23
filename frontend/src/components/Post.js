import styles from './styles/Post.module.css';
import styles2 from '../screens/styles/Comments.module.css';
import stylesOfPost from '../screens/styles/Post.module.css';
import { useNavigate } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Slider from './Slider';
import { useMainContext } from '../context';
import UserList from '../components/UserList';
import Button from '../components/Button';
import Items from '../components/Items';
import Banner from '../components/Banner';
import Title from '../components/Title';
import Grid from '../components/Grid';

function Post({ data }) {

  const navigate = useNavigate();
  const { message, setMessage, sendMessage, setPosts, posts, canSend, setCanSend, text, setText, setNewCommentPostId, account, setLoading } = useMainContext();
  const [ user, setUser ] = useState(null);
  const imagesDivRef = useRef();
  const imagesDivDivRef = useRef();
  const postDivRef = useRef();
  const avatarDivRef = useRef();
  const [ activeImage, setActiveImage ] = useState(0);
  const [ lastCommentUser, setLastCommentUser ] = useState(null);
  const [ commentsCount, setCommentsCount ] = useState(0);
  const [ isFavorite, setIsFavorite ] = useState(data.isFavorite || false);
  const windowHeight = window.innerHeight;
  const [ loading_, setLoading_ ] = useState(true);
  const [ posts_, setPosts_ ] = useState([]);
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

  useEffect(() => {
    if (!data.images ) {
      sendMessage(JSON.stringify(["images", "get", data._id, "main"]));
    }
  }, [data])

  useEffect(() => {
    if (!data.user && data.images) {
      sendMessage(JSON.stringify(["user", "get", {_id: data.user_id, post_id: data._id}]));
      sendMessage(JSON.stringify(["favorite_posts", "check", data._id]));
    }
  }, [data])

  useEffect(() => {
    sendMessage(JSON.stringify(["user", "get", {_id: data.user_id, post_id: data._id}]));
    sendMessage(JSON.stringify(["comments", "last", {post_id: data._id}]));
    sendMessage(JSON.stringify(["comments", "count", {post_id: data._id}]));
  }, [])

  const handleFavorite = () => {
    sendMessage(JSON.stringify(["favorite_posts", "action", data._id]));
    setIsFavorite(!isFavorite);
  }

  const [ isOpenComments, setIsOpenComments ] = useState(false)
  const [ isOpenPost, setIsOpenPost ] = useState(false)
  const [ comments, setComments ] = useState([])
  const commentsWrapperRef = useRef();
  const commentsHeaderRef = useRef();
  const commentsTextareaRef = useRef();
  const commentsRef = useRef();

  const showComments = () => {
    setIsOpenComments(true);
    if (data._id === posts[posts.length - 1]?._id) {
      postDivRef.current.style.marginBottom = "100vh";
    };
    imagesDivDivRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    avatarDivRef.current.style.transform = "translateY(-50%)";
    setTimeout(() => {
      const scrollY = imagesDivDivRef.current.offsetTop;
      document.querySelector("html").style.overflow = "hidden";
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${scrollY}px`
    }, 300);
  }

  const closeComments = () => {
    if (data._id === posts[posts.length - 1]?._id) {
      postDivRef.current.style.marginBottom = "0";
    };
    avatarDivRef.current.style.transform = "none";
    document.querySelector("html").style.overflow = "auto";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.position = "relative";
    document.querySelector("body").style.top = "0px";
    imagesDivDivRef.current.scrollIntoView({
      block: 'start'
    });
    setIsOpenComments(false);
    setComments([]);
  }

  const showPost = () => {
    setIsOpenPost(true);
    if (data._id === posts[posts.length - 1]?._id) {
      postDivRef.current.style.marginBottom = "100vh";
    };
    imagesDivDivRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
    avatarDivRef.current.style.transform = "translateY(-50%)";
    setTimeout(() => {
      const scrollY = imagesDivDivRef.current.offsetTop;
      document.querySelector("html").style.overflow = "hidden";
      document.querySelector("body").style.overflow = "hidden";
      document.querySelector("body").style.position = "fixed";
      document.querySelector("body").style.top = `-${scrollY}px`
    }, 300);
  }

  const closePost = () => {
    if (data._id === posts[posts.length - 1]?._id) {
      postDivRef.current.style.marginBottom = "0";
    };
    avatarDivRef.current.style.transform = "none";
    document.querySelector("html").style.overflow = "auto";
    document.querySelector("body").style.overflow = "auto";
    document.querySelector("body").style.position = "relative";
    document.querySelector("body").style.top = "0px";
    imagesDivDivRef.current.scrollIntoView({
      block: 'start'
    });
    setIsOpenPost(false);
  }

  const handleChange = (event) => {
    setText(event.target.value);
    event.target.style.height = 'auto';
    event.target.style.height = `${event.target.scrollHeight}px`;
    if (event.target.value) {
      setNewCommentPostId(data._id);
      setCanSend(true);
    } else {
      setCanSend(false);
    };
  }

  useEffect(() => {
    if (isOpenComments && commentsWrapperRef) {
      sendMessage(JSON.stringify(["comments", "list", data._id]));
    }
  }, [isOpenComments, commentsWrapperRef])

  useEffect(() => {
    if (message) {
      if (message[0] === 'comments') {
        if (message[1] === 'list') {
          setComments(message[2]);
          message[2].forEach(comment => {
            sendMessage(JSON.stringify(["user", "get", {_id: comment.user_id}]));
          })
          setTimeout(() => {
            if (commentsWrapperRef.current) {
              commentsWrapperRef?.current.scrollTo({ top: commentsWrapperRef.current.scrollHeight });
            }
          }, 300)
        } else if (message[1] === 'add') {
          if (message[2]?.post_id === data._id) {
            setComments(prevState => [...prevState, message[2]]);
            sendMessage(JSON.stringify(["user", "get", {_id: message[2].user_id}]));
            setLoading(false);
            setPosts(prevState => {
              // Найдите пост, к которому нужно добавить изображения
              const postToUpdate = prevState.find(post => post._id === data._id);
  
              // Если пост найден, добавьте изображения
              if (postToUpdate) {
                const updatedPost = { ...postToUpdate, comments_count: postToUpdate.comments_count + 1 || 1 };
  
                // Замените старый пост в состоянии на обновленный
                return prevState.map(post => (post._id === data._id ? updatedPost : post));
              }
  
              // Если пост не найден, верните предыдущее состояние
              return prevState;
            });
            setTimeout(() => {
              if (commentsWrapperRef.current) {
                commentsWrapperRef?.current.scrollTo({ top: commentsWrapperRef.current.scrollHeight });
              }
            }, 100)
          }
        } else if (message[0] === 'user') {
          if (message[1] === 'get') {
            setUser(message[2]);
          }
        }
      }
      setMessage(null);
    };
  }, [message]);

  useEffect(() => {
    if (isOpenComments && commentsHeaderRef.current && imagesDivDivRef.current && commentsTextareaRef.current) {
      commentsWrapperRef.current.style.height = `${windowHeight - commentsHeaderRef.current.scrollHeight - imagesDivDivRef.current.scrollHeight - commentsTextareaRef.current.scrollHeight}px`
    } else if (isOpenPost && commentsHeaderRef.current && imagesDivDivRef.current) {
      commentsWrapperRef.current.style.height = `${windowHeight - commentsHeaderRef.current.scrollHeight - imagesDivDivRef.current.scrollHeight}px`
    }
  }, [isOpenComments, isOpenPost, text, commentsHeaderRef.current, imagesDivDivRef.current, commentsTextareaRef.current])

  const [ touchStartY, setTouchStartY ] = useState(null);
  const [ commentsTopOffset, setCommentsTopOffset ] = useState(null);

  const handleTouchStart = (e) => {
    setTouchStartY(e.touches[0].screenY);
    if (commentsRef.current) {
      setCommentsTopOffset(commentsRef.current.getBoundingClientRect().top)
    }
  }

  const handleTouchMove = (e) => {
    if (commentsRef.current) {
      commentsRef.current.style.top = `${commentsTopOffset - touchStartY + e.touches[0].screenY}px`;
      if (window.innerHeight > commentsRef.current.getBoundingClientRect().bottom) {
        commentsWrapperRef.current.style.height = `${commentsWrapperRef.current.offsetHeight + window.innerHeight - commentsRef.current.getBoundingClientRect().bottom}px`;
      } else if (window.innerHeight <= commentsRef.current.getBoundingClientRect().bottom) {
        if (commentsWrapperRef.current.offsetHeight > 360) {
          console.log([commentsWrapperRef.current.offsetHeight + window.innerHeight - commentsRef.current.getBoundingClientRect().bottom])
          commentsWrapperRef.current.style.height = `${commentsWrapperRef.current.offsetHeight + window.innerHeight - commentsRef.current.getBoundingClientRect().bottom}px`;
        }
      }
    }
  }

  const handleTouchEnd = (e) => {
    if (commentsRef.current.getBoundingClientRect().top < window.innerHeight * .2) {
      commentsRef.current.style.top = '0px';
      commentsWrapperRef.current.style.height = `${commentsWrapperRef.current.offsetHeight + window.innerHeight - commentsRef.current.getBoundingClientRect().bottom}px`;
    } else if (commentsRef.current.getBoundingClientRect().top > window.innerHeight * .8) {
      commentsRef.current.style.top = `${window.innerHeight}px`;
      if (commentsTextareaRef.current) {
        closeComments();
      } else {
        closePost();
      }
    } else {
      commentsRef.current.style.top = `75vw`;
      commentsWrapperRef.current.style.height = `${commentsWrapperRef.current.offsetHeight + window.innerHeight - commentsRef.current.getBoundingClientRect().bottom}px`;
    }
  }

  const handleAction = (e) => {
    alert('123');
  }

  return (
    <div className={styles.post} ref={postDivRef}>
      <div className={styles.header}>
        <div className={styles.user} onClick={() => navigate("/users/"+data.user?._id)}>
          <div className={styles.avatar} ref={avatarDivRef}>
            <img src={data.user?.avatar || require("./images/non-avatar.svg").default} alt="" />
          </div>
          <div className={styles.information}>
            <span>{data.user?.username ? data.user.username : data.user?._id}</span>
            {data.user?.city && <span>{data.user?.city}</span>}
          </div>
        </div>
        <div className={styles.like} onClick={handleFavorite}>
          <img src={isFavorite ? require("./images/like.svg").default : require("./images/like-active.svg").default} alt="" />
        </div>
      </div>
      <div ref={imagesDivDivRef}>
        <Slider images={data.images || []} imagesDivRef={imagesDivRef} setActiveImage={setActiveImage} category={data.input1} />
      </div>
      <div className={styles.body} onClick={showPost}>
        <div className={styles.price}>
          {data.input1 === "Автомобили" ? data.input39 : data.input5}
        </div>
        <div className={styles.title}>
          {data.input1 === "Автомобили" ? `${data.input5} ${data.input6}, ${data.input7}, ${data.input17}` : data.input2}
        </div>
        <div className={styles.info}>
          <div>{data.created_at}</div>
          <div>{data.view_count || 0} просмотров</div>
        </div>
        <div className={styles.arrow}>
          <img src={require("./images/arrow-down.svg").default} alt="" />
        </div>
      </div>
      <div className={styles.lastComment} onClick={showComments}>
        <div>Комментарии <span>{data.comments_count || 0}</span></div>
        {data.comments?.length > 0 &&
          <div className={styles.comment}>
            <img src={data.comments[0].avatar || require("./images/non-avatar.svg").default} alt="" /> <span>{data.comments[0].text}</span>
          </div>}
        <div className={styles.arrow}>
          <img src={require("./images/arrow-top-down.svg").default} alt="" />
        </div>
      </div>
      {isOpenComments &&
        <div ref={commentsRef} className={styles2.comments_} style={{position: "fixed", top: "75vw", width: "100vw", background: "#18181A", zIndex: 999, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <div ref={commentsHeaderRef} 
               style={{padding: "15px 10px", background: "#212121", borderTopLeftRadius: 10, borderTopRightRadius: 10}} 
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{width: 40, height: 4, background: "#626262", borderRadius: 2, marginTop: -5}}></div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5}}>
              <div style={{fontSize: 16, fontWeight: 400}}>
                Комментарии <span style={{fontWeight: 300, color: "#bbb", marginLeft: 5}}>{comments.length}</span>
              </div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} onClick={closeComments}>
                <img src={require("./images/plus.svg").default} className="" alt="plus" style={{transform: "rotate(45deg)"}} />
              </div>
            </div>
          </div>
          <div className={styles2.commentsWrapper} ref={commentsWrapperRef}>
            <div className={styles2.comments}>
              {comments.length > 0 ?
                comments.map((comment) => (
                  <div className={styles2.comment} key={comment._id}>
                    <div>
                      <div className={styles2.avatar}>
                        <img src={comment.avatar ? comment.avatar : require("../components/images/non-avatar.svg").default} alt="" />
                      </div>
                    </div>
                    <div>
                      <div>{comment.username ? comment.username : comment.user_id} <b>·</b> {comment.created_at}</div>
                      <div>{comment.text}</div>
                      <div>
                        <img src={!comment.is_saved ? require("../components/images/like.svg").default : require("../components/images/like-active.svg").default} alt="" />
                      </div>
                    </div>
                  </div>
                ))
              : <div className={styles2.empty}>
                  Пока пусто
                </div>}
            </div>
          </div>
          <div className={styles2.inputComment} ref={commentsTextareaRef} style={{background: "#212121"}}>
            <div className={styles2.avatar}>
              <img src={account?.avatar ? account?.avatar : require("../components/images/non-avatar.svg").default} alt="" />
            </div>
            <div className={styles2.textarea}>
              <textarea placeholder="Введите текст комментария" onChange={handleChange} onBlur={() => imagesDivDivRef.current.scrollIntoView({block: 'start'})} value={text}>{text}</textarea>
            </div>
          </div>
        </div>}
      {isOpenPost &&
        <div ref={commentsRef} className={styles2.comments_} style={{position: "fixed", top: "75vw", width: "100vw", background: "#000", zIndex: 999, borderTopLeftRadius: 10, borderTopRightRadius: 10}}>
          <div ref={commentsHeaderRef} 
               style={{padding: "15px 10px", background: "#121212", borderTopLeftRadius: 10, borderTopRightRadius: 10}} 
               onTouchStart={handleTouchStart}
               onTouchMove={handleTouchMove}
               onTouchEnd={handleTouchEnd}>
            <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
              <div style={{width: 40, height: 4, background: "#626262", borderRadius: 2, marginTop: -5}}></div>
            </div>
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 5}}>
              <div style={{fontSize: 16, fontWeight: 400}}>
                Информация
              </div>
              <div style={{display: "flex", alignItems: "center", justifyContent: "center"}} onClick={closePost}>
                <img src={require("./images/plus.svg").default} className="" alt="plus" style={{transform: "rotate(45deg)"}} />
              </div>
            </div>
          </div>
          <div className={styles2.commentsWrapper} style={{padding: "0 10px", overflowX: "hidden"}} ref={commentsWrapperRef}>
            <div className={stylesOfPost.price}>
              <div>{data?.input1 === "Автомобили" ? data?.input39 : data?.input5}</div>
              <div className={stylesOfPost.actions}>
                {(data?.input1 === "Автомобили" || data?.input1 === "Эвакуатор") &&
                <div className={stylesOfPost.action} onClick={handleAction}>
                  <img src={require("../screens/images/compare.svg").default} alt="" />
                  Сравнить
                </div>}
                <div className={stylesOfPost.action} onClick={handleFavorite}>
                  <img src={isFavorite ? require("./images/like-active.svg").default : require("./images/like.svg").default} alt="" />
                  Избранное
                </div>
                <div className={stylesOfPost.action} onClick={handleAction}>
                  <img src={require("../screens/images/share.svg").default} alt="" />
                  Поделиться
                </div>
              </div>
            </div>
            <div className={stylesOfPost.title}>{data?.input1 === "Автомобили" ? `${data?.input5} ${data?.input6}, ${data?.input7}, ${data?.input17}` : data?.input2 }</div>
            <div className={stylesOfPost.address}>{data?.input1 === "Автомобили" ? data?.address : data?.input4}</div>
            <div className={stylesOfPost.flex}>
              <div className={stylesOfPost.createdAt}>№172472</div>
            </div>
            <div className={stylesOfPost.flex}>
              <div className={stylesOfPost.createdAt}>{data?.created_at}</div>
              <div className={stylesOfPost.viewCount}>{data?.view_count || 0} просмотров</div>
            </div>
            <div>
              <div className={stylesOfPost.user} style={{padding: "10px 0px 20px 0px"}}>
                <UserList items={[
                  {
                    _id: data.user?._id,
                    username: data.user?.username ? data.user.username : data.user?._id,
                    name: data.user?.name,
                    avatar: data.user?.avatar || require("./images/non-avatar.svg").default,
                    reviews: {
                      stars: require("./images/stars.svg").default,
                      count: 0,
                      price: "0,00"
                    }
                  }
                ]} handleClick={() => {closePost();navigate("/users/" + data.user._id)}}/>
                <div className={stylesOfPost.buttons}>
                  <Button text="Написать" small={true} />
                  <Button text="Позвонить" small={true} />
                </div>
              </div>
            </div>
            {data?.input1 === "Эвакуатор" &&
            <div style={{marginTop: 20}}>
              <div style={{marginBottom: 10, fontSize: 15}}>Прайс-лист</div>
              <Items items={[
                {
                  label: "Срочная подача",
                  value: "input9-9" in data && data["input9-9"] + " " + data["input10-10"]
                },
                {
                  label: "Подача ко времени",
                  value: "input11-11" in data && data["input11-11"] + " " + data["input12-12"]
                },
                "input13-13" in data &&
                {
                  label: "input13-13" in data && data["input13-13"],
                  value: "input14-14" in data && data["input14-14"] + " " + data["input15-15"]
                },
              ]} />
            </div>}
            {data?.input1 === "Автомобили" &&
            <div style={{marginTop: 20}}>
              <Items items={[
                {
                  label: "Категория",
                  value: data?.input1
                },
                {
                  label: "Тип автомобиля",
                  value: "С пробегом"
                }
              ]} />
            </div>}
            {data?.input1 !== "Автомобили" &&
            <div style={{marginTop: 20}}>
              {data?.input1 === "Эвакуатор" ?
              <Items items={[
                {
                  label: "Категория услуги",
                  value: data?.input1
                },
                {
                  label: "Выезд",
                  value: "input1-1" in data && data["input1-1"]
                },
                {
                  label: "Способ погрузки",
                  value: "input2-2" in data && data["input2-2"]
                },
                {
                  label: "Грузоподъемность",
                  value: "input4-4" in data && data["input4-4"]
                },
                {
                  label: "Исполнитель перевозит",
                  value: "input5-5" in data && data["input5-5"]
                }
              ]} />
              :
              <Items items={[
                {
                  label: "Категория",
                  value: data?.input1
                }
              ]} />}
            </div>}
            {data?.input1 === "Автомобили" &&
            <div style={{marginTop: 10}}>
              <Items items={[
                {
                  label: "Год выпуска",
                  value: data?.input7
                },
                {
                  label: "Поколение",
                  value: data?.input8
                },
                {
                  label: "Комплектация",
                  value: data?.input14
                },
                {
                  label: "Пробег, км",
                  value: data?.input17
                },
                {
                  label: "Модификация",
                  value: data?.input13
                },
                {
                  label: "Двигатель",
                  value: data?.input10
                },
                {
                  label: "Объём двигателя",
                  value: data?.input11
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
                  value: data?.input19
                },
                {
                  label: "Привод",
                  value: data?.input18
                },
                {
                  label: "Кузов",
                  value: data?.input9
                },
                {
                  label: "Цвет",
                  value: data?.input16
                },
                {
                  label: "Руль",
                  value: data?.input15
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
            </div>}
            {data?.input1 === "Автомобили" &&
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
            </div>}
            {(data?.input1 === "Автомобили" && damages.length > 0) &&
              <div>
                <div className={stylesOfPost.title_}>Повреждения кузова</div>
                <div className={stylesOfPost.texts_}>
                  <div className={stylesOfPost.label_}>
                    <div>Название детали</div>
                    <div>Повреждения</div>
                    <div>Ремонт</div>
                  </div>
                  {damages.map((damage, index) => (
                    <div className={stylesOfPost.text_} key={index}>
                      <div>{damage.type}</div>
                      <div>{damage.input1}</div>
                      <div>{damage.input3} {damage.input4} {damage.input5}</div>
                    </div>
                  ))}
                </div>
              </div>}
            {data?.input1 === "Автомобили" && 
            <Button text="Посмотреть на схеме" small={true} style={{borderTopLeftRadius: 0, borderTopRightRadius: 0}} />}
            {data?.input1 === "Автомобили" && 
            <div style={{marginTop: 20}}>
              <Items items={[
                {
                  label: "Дополнительные опции",
                  value: <img src={require("../components/images/arrow-right.svg").default} alt="" />
                },
              ]} />
            </div>}
            {data?.input1 === "Автомобили" && 
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
              Этот автомобиль возможно приобрести в Кредит<br/>
              или в Рассрочку на выгодных для вас условиях!
            </div>}
            {data?.input1 === "Автомобили" && 
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
              <div style={{padding: "10px 20px", textAlign: "center", background: "rgba(74,232,18,.2)", borderRadius: 4}}>
                Оценка автомобиля: 450 000 - 520 000 ₽
              </div>
              <div style={{padding: "20px 20px 0 20px", textAlign: "center", borderRadius: 4}}>
                Средняя стоимость: 499 000 ₽
              </div>
            </div>}
            {data?.input1 === "Автомобили" && 
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
              <div style={{fontSize: 16}}>
                Проверка истории автомобиля
              </div>
              <div style={{marginTop: 10}}>
                VIN или номер кузова: SADC*************
              </div>
              <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{width: 20, height: 20, border: "1px solid #42CC16", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../components/images/active.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div>Характеристики совпадают с ПТС</div>
              </div>
              <div style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{width: 20, height: 20, border: "1px solid #42CC16", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../components/images/active.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div>2 владельца по ПТС</div>
              </div>
              <div style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{width: 20, height: 20, border: "1px solid #42CC16", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../components/images/active.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div>Ограничений не обнаружено</div>
              </div>
              <div style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{width: 20, height: 20, border: "1px solid #42CC16", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../components/images/active.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div>Не числиться в розыске</div>
              </div>
              <div style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{width: 20, height: 20, border: "1px solid #42CC16", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../components/images/active.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div>Стоит на учете в ГИБДД</div>
              </div>
              <Button text="Получить полный отчёт" small={true} style={{marginTop: 20}} />
            </div>}
            {data?.input1 === "Автомобили" && 
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
              <div style={{fontSize: 16}}>
                Автокредит от 4.9%  
              </div>
              <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 60}}>
                <div>
                  <div style={{fontSize: 12, marginBottom: 2.5}}>Первый взнос</div>
                  <div style={{fontSize: 16}}>Не требуется</div>
                </div>
                <div>
                  <div style={{fontSize: 12, marginBottom: 2.5}}>Платёж</div>
                  <div style={{fontSize: 16}}>от 7 950 ₽/мес</div>
                </div>
              </div>
              <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 60}}>
                <div>
                  <div style={{fontSize: 12, marginBottom: 2.5}}>Сумма кредита</div>
                  <div style={{fontSize: 16}}>610 000 ₽</div>
                  <input type="range" style={{
                    marginTop: 10,
                    width: "calc(100vw - 60px)"
                  }} />
                </div>
              </div>
              <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 60}}>
                <div>
                  <div style={{fontSize: 12, marginBottom: 2.5}}>Срок кредита</div>
                  <div style={{fontSize: 16}}>7 лет</div>
                  <input type="range" style={{
                    marginTop: 10,
                    width: "calc(100vw - 60px)"
                  }} />
                </div>
              </div>
              <div style={{marginTop: 20}}>
                Одна заявка в несколько банков
              </div>
              <div style={{marginTop: 10, display: "flex", alignItems: "center", gap: 10}}>
                <div style={{padding: 10, background: "#28282A", borderRadius: 8, width: "100%", height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../screens/images/alfa.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div style={{padding: 10, background: "#28282A", borderRadius: 8, width: "100%", height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../screens/images/sberbank.svg").default} alt="" style={{width: "100%"}} />
                </div>
                <div style={{padding: 10, background: "#28282A", borderRadius: 8, width: "100%", height: 30, display: "flex", alignItems: "center", justifyContent: "center"}}>
                  <img src={require("../screens/images/tinkoff.svg").default} alt="" style={{width: "100%"}} />
                </div>
              </div>
              <Button text="Перейти к анкете" small={true} style={{marginTop: 20}} />
            </div>}
            {data?.input1 === "Эвакуатор" &&
            <div style={{marginTop: 20}}>
              <Items items={[
                {
                  label: "Эвакуация машин бизнес-класса",
                  value: "input18-18" in data && data["input18-18"]
                },
                {
                  label: "Фотоотчет о погрузке и разгрузке",
                  value: "input19-19" in data && data["input19-19"]
                },
                {
                  label: "Выезд в труднодоступные места",
                  value: "input20-20" in data && data["input20-20"]
                },
                {
                  label: "Работа с юр. лицами и ИП",
                  value: "input6-6" in data && data["input6-6"]
                },
                {
                  label: "Работа с НДС",
                  value: "input7-7" in data && data["input7-7"]
                }
              ]} />
            </div>}
            {data?.input1 !== "Автомобили" &&
            <>
              <div style={{marginTop: 20, marginBottom: 10, fontSize: 15}}>Описание</div>
              <div style={{padding: 12, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
                <div>
                  {data?.input3}
                </div>
              </div>
            </>}
            {data?.input1 !== "Эвакуатор" &&
              <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8}}>
                <div>
                  Краснодар, Краснодарский край
                </div>
                <div style={{marginTop: 10}}>
                  Размещено 07.12.2023, 16:23
                </div>
                <div style={{marginTop: 10}}>
                  Объявление: № 00772665353
                </div>
                <div style={{marginTop: 10}}>
                  Просмотров 699 (0 сегодня)
                </div>
                <div style={{marginTop: 10}}>
                  В избраном: 29
                </div>
              </div>}
            {data?.input1 !== "Эвакуатор" &&
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between"}}>
              <div style={{display: "flex", flexFlow: "column"}}>
                <div style={{fontSize: 16}}>
                  Владислав Ромаданов
                </div>
                <div style={{fontSize: 12, marginTop: 5}}>
                  Частное лицо
                </div>
                <div style={{fontSize: 16, marginTop: 10}}>
                  +7 966 77 57 966
                </div>
              </div>
              <div>
                <img src={user?.avatar || require("../components/images/non-avatar.svg").default} alt="" style={{display: "block", borderRadius: 8, width: "10vw", height: "17.5vw", objectFit: "cover"}} />
              </div>
            </div>}
            {data?.input1 !== "Эвакуатор" &&
            <div style={{marginTop: 20, padding: 20, fontWeight: 300, fontSize: 14, background: "#18181A", borderRadius: 8, display: "flex", justifyContent: "space-between"}}>
              <div style={{display: "flex", flexFlow: "column"}}>
                <div style={{fontSize: 16}}>
                  AutoLIGHT | MOTOR COMPANY
                </div>
                <div style={{display: "flex", gap: 10, marginTop: 5}}>
                  <div style={{fontSize: 12}}>Комания</div>
                  <div style={{fontSize: 12}}>2 отзыва</div>
                </div>
                <div style={{display: "flex", gap: 10, marginTop: 10}}>
                  <div style={{fontSize: 12}}>25 объявлений</div>
                </div>
                <div style={{fontSize: 12, marginTop: 5}}>
                  Частное лицо
                </div>
                <div style={{fontSize: 16, marginTop: 10}}>
                  Ромаданов Владислав Константинович
                </div>
                <div style={{display: "flex", gap: 10, marginTop: 10}}>
                  <div style={{fontSize: 12}}>Контактное лицо</div>
                </div>
                <div style={{fontSize: 16, marginTop: 10}}>
                  +7 966 77 57 966
                </div>
              </div>
              <div>
                <img src={data.user?.avatar || require("../components/images/non-avatar.svg").default} alt="" style={{display: "block", borderRadius: 8, width: "10vw", height: "17.5vw", objectFit: "cover"}} />
              </div>
            </div>}
            {data?.input1 === "Эвакуатор" &&
            <>
              <div style={{marginTop: 20, marginBottom: 10, fontSize: 14}}>{data?.input4}</div>
              <div style={{fontWeight: 400, fontSize: 13, marginTop: -10, color: "#0884FE"}}>
                показать на карте
              </div>
            </>}
            <div className={stylesOfPost.wrapper}>
              {data?.description &&
              <div className={stylesOfPost.descriptionBlock}>
                <Title text="Описание" />
                <div className={stylesOfPost.description}>{data?.description}</div>
              </div>}
              {data?.input1 === "Эвакуатор" &&
              <div className={stylesOfPost.flex} style={{padding: 10, borderTop: ".5px solid #191919", marginTop: 20, marginBottom: -20}}>
                <div>Отзывы</div>
                <iframe src={"https://yandex.ru/sprav/widget/rating-badge/101836494062?type=rating"} width={150} height={50} frameBorder={0}></iframe>  
              </div>}
              <div className={stylesOfPost.lastComment} onClick={() => {closePost();navigate(`/posts/${data._id}/comments`)}}>
                <div>Комментарии <span>{data?.comments_count || 0}</span></div>
                {data && data.comments &&
                  <div className={stylesOfPost.comment}>
                    <img src={data?.comments[0].avatar || require("../components/images/non-avatar.svg").default} alt="" /> <span>{data?.comments[0].text}</span>
                  </div>}
                <div className={stylesOfPost.arrow}>
                  <img src={require("../components/images/arrow-top-down.svg").default} alt="" />
                </div>
              </div>
            </div>
            {posts_.length > 0 && !loading_ &&
              <>
                <div className={stylesOfPost.anotherTitle}>
                  {data?.input1 === "Автомобили" &&
                  <div>Другие автомобили компании</div>}
                  {data?.input1 !== "Автомобили" &&
                  <div>Похожие объявления</div>}
                  <div>
                    <span>Показать все</span>
                    <img src={require("../components/images/arrow-right.svg").default} alt="" />
                  </div>
                </div>
                <Grid items={posts_.slice(0,3)} navigate={navigate} />
              </>}
            {data?.input1 === "Автомобили" &&
            <div style={{marginTop: 20, display: "flex", alignItems: "center", gap: 10}}>
              <div style={{borderRadius: "50%", background: "#18181A", width: 40, height: 40, display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 0 10px red"}}>
                4.7
              </div>
              <div style={{fontSize: 16}}>
                Общий рейтинг модели<br/>
                AutoLIGHT
              </div>
            </div>}
            {data?.input1 === "Автомобили" &&
            <div style={{display: "flex", gap: 10, marginTop: 20}}>
              <div>
                <div style={{position: "relative"}}>
                  <img src={require("../screens/images/car.jpg")} alt="" style={{borderRadius: 8, width: "100%"}} />
                  <div style={{fontSize: 14, position: "absolute", bottom: 10, left: 10, borderRadius: "50%", background: "#18181A", width: 35, height: 35, display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 0 10px red"}}>
                    4.9
                  </div>
                </div>
                <div style={{fontSize: 14, fontWeight: 300, marginTop: 5}}>Комментарии 33</div>
              </div>
              <div>
                <div style={{position: "relative"}}>
                  <img src={require("../screens/images/car.jpg")} alt="" style={{borderRadius: 8, width: "100%"}} />
                  <div style={{fontSize: 14, position: "absolute", bottom: 10, left: 10, borderRadius: "50%", background: "#18181A", width: 35, height: 35, display: "flex", justifyContent: "center", alignItems: "center", boxShadow: "0 0 10px red"}}>
                    3.5
                  </div>
                </div>
                <div style={{fontSize: 14, fontWeight: 300, marginTop: 5}}>Комментарии 33</div>
              </div>
            </div>}
            {data?.input1 === "Автомобили" &&
            <div style={{marginTop: 10, fontWeight: 300, fontSize: 14}}>Все отзывы</div>}
            {data?.input1 === "Автомобили" &&
            <div style={{marginTop: 20, background: "#18181A", borderRadius: 8}}>
              <div style={{fontSize: 16, padding: "10px", fontWeight: 300, fontSize: 16}}>
                Оценка модели
              </div>
              <Items items={[
                {
                  label: "Внешний вид",
                  value: "4.8"
                },
                {
                  label: "Салон",
                  value: "3.6"
                },
                {
                  label: "Двигатель",
                  value: "3.2"
                },
                {
                  label: "Ходовая часть",
                  value: "4.3"
                }
              ]} />
            </div>}
            {posts_.length > 5 && !loading_ && data?.input1 === "Автомобили" &&
              <>
                <div className={stylesOfPost.anotherTitle}>
                  <div>Рекомендуем</div>
                  <div>
                    <span>Показать все</span>
                    <img src={require("../components/images/arrow-right.svg").default} alt="" />
                  </div>
                </div>
                <Grid items={posts_.slice(3,6)} navigate={navigate} />
              </>}
            <div className={stylesOfPost.wrapper}>
              <Banner navigate={navigate} />
            </div>
          </div>
        </div>}
    </div>
  );
}

export default Post;
