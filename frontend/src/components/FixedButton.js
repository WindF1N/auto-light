import React from 'react';
import './styles/FixedButton.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useMainContext } from '../context';

const useDoubleClick = (callback, onSingleClick = () => {}, timeout = 150) => {
  const [clickCount, setClickCount] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (clickCount === 2) {
        callback();
      } else if (clickCount === 1) {
        onSingleClick();
      }
      setClickCount(0);
    }, timeout);

    return () => clearTimeout(timer);
  }, [clickCount, callback, onSingleClick, timeout]);

  return () => setClickCount(prev => prev + 1);
};

const FixedButton = (props) => {
  let location = useLocation();
  const navigate = useNavigate();
  const [ isProButtonVisible, setIsProButtonVisible ] = useState(false);
  const [ canGoBack, setCanGoBack ] = useState(false);
  const [ canScrollUp, setCanScrollUp ] = useState(false);
  const { accessToken, refreshToken, account, sendMessage, text, setText, canSend, setCanSend, newCommentPostId } = useMainContext();

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(accessToken && refreshToken)
  }

  const goBack = () => {
    window.history.back();
  }

  const openButtons = () => {
    setIsProButtonVisible(!isProButtonVisible);
  }

  const handleDoubleClick = useDoubleClick(() => navigate('/'), openButtons);

  useEffect(() => {
    const updateCanGoBack = () => {
      setCanGoBack(window.location.pathname !== '/');
    };

    const handleScroll = () => {
      if (document.documentElement.scrollTop > 400) {
        setCanScrollUp(true);
      } else {
        setCanScrollUp(false);
      }
    };

    window.addEventListener('popstate', updateCanGoBack);
    window.addEventListener('scroll', handleScroll);

    updateCanGoBack();

    return () => {
      window.removeEventListener('popstate', updateCanGoBack);
      window.removeEventListener('scroll', handleScroll);
    }
  }, [location.pathname])

  const handleClick = (e) => {
    setText('');
    setCanSend(false);
    sendMessage(JSON.stringify(["comments", "add", newCommentPostId, text]));
  }

  const handleDelete = () => {
    setText('');
    setCanSend(false);
  }

  return (
    <div className={props.upper && 'upper' || canSend && 'send'}>
      <div className={`fixed-button add ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {
          if (accessToken && refreshToken) {
            navigate('/add');
            setIsProButtonVisible(false);
          } else {
            navigate('/login');
            setIsProButtonVisible(false);
          }
        }}>
        <img src={require("./images/plus.svg").default} className="" alt="plus" />
      </div>
      <div className={`fixed-button search ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {navigate('/search');setIsProButtonVisible(false);}}>
        <img src={require("./images/menu-search-button.svg").default} className="" alt="menu-search" />
      </div>
      <div className={`fixed-button like ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {navigate('/activity');setIsProButtonVisible(false);}}>
        <img src={require("./images/like.svg").default} className="" alt="menu-activity" />
      </div>
      <div className={`fixed-button messenger ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {navigate('/messenger');setIsProButtonVisible(false);}}>
        <img src={require("../screens/images/messenger.svg").default} className="" alt="menu-messenger" />
      </div>
      <div className={`fixed-button home ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {navigate('/');setIsProButtonVisible(false);}}>
        <img src={require("../screens/images/home.svg").default} className="" alt="menu-home" />
      </div>
      <div className={`fixed-button acc ${isProButtonVisible ? 'visible' : ''}`} onClick={(accessToken && refreshToken) ? () => {navigate(`/users/${account?._id}`);setIsProButtonVisible(false);} : () => {navigate('/login');setIsProButtonVisible(false);}}>
        <img src={account?.avatar || require("./images/non-avatar.svg").default} className="" alt="avatar" />
      </div>
      <div className={`fixed-button ${isProButtonVisible ? 'visible' : ''}`} onClick={!canSend ? handleDoubleClick : handleClick}>
        <img src={require("./images/light-logo.svg").default} className="" alt="light logo" />
      </div>
      {canGoBack ?
        <div className="fixed-button-back" onClick={goBack}>
          <img src={require("./images/arrow-right.svg").default} className="" alt="arrow" />
        </div>
      :
        <div className="fixed-message">
          <div></div>
          <div></div>
          <div>Я тут, если что</div>
        </div>}
      {(canScrollUp || canSend) &&
      <div className={`fixed-button-up ${isProButtonVisible ? 'visible' : ''}`} onClick={!canSend ? scrollUp : handleDelete}>
        {!canSend ?
          <img src={require("./images/arrow-right.svg").default} alt="arrow" />
          : <img src={require("./images/close.svg").default} alt="arrow" style={{width: "100%"}}/> }
      </div>}
    </div>
  );
};

export default FixedButton;
