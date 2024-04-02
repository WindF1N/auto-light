import React from 'react';
import './styles/FixedButton.css';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  const [isProButtonVisible, setIsProButtonVisible] = useState(false);

  const { accessToken, refreshToken, account } = useMainContext();

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    console.log(accessToken && refreshToken)
  };

  const goBack = () => {
    window.history.back();
  };

  const openButtons = () => {
    setIsProButtonVisible(!isProButtonVisible);
  };

  const handleDoubleClick = useDoubleClick(() => navigate('/'), openButtons);

  return (
    <div className={props.upper && 'upper' || props.send && 'send'}>
      <div className={`fixed-button add ${isProButtonVisible ? 'visible' : ''}`} onClick={() => {
          if (accessToken && refreshToken) {
            navigate('/add');
          } else {
            navigate('/login');
          }
        }}>
        <img src={require("./images/plus.svg").default} className="" alt="plus" />
      </div>

      <div className={`fixed-button search ${isProButtonVisible ? 'visible' : ''}`} onClick={() => navigate('/search')}>
        <img src={require("./images/menu-search-button.svg").default} className="" alt="menu-search" />
      </div>

      <div className={`fixed-button acc ${isProButtonVisible ? 'visible' : ''}`} onClick={(accessToken && refreshToken) ? () => navigate(`/users/${account?.username}`) : () => navigate('/login')}>
        <img src={account?.avatar || require("./images/non-avatar.svg").default} className="" alt="avatar" />
      </div>

      <div className={`fixed-button ${isProButtonVisible ? 'visible' : ''}`} onClick={!props.send ? handleDoubleClick : props.onClick}>
        <img src={require("./images/light-logo.svg").default} className="" alt="light logo" />
      </div>

      <div className="fixed-button-back" onClick={goBack}>
        <img src={require("./images/arrow-right.svg").default} className="" alt="arrow" />
      </div>

      <div className={`fixed-button-up ${isProButtonVisible ? 'visible' : ''}`} onClick={!props.send ? scrollUp : props.onDelete}>
        {!props.send ?
          <img src={require("./images/arrow-right.svg").default} alt="arrow" />
          : <img src={require("./images/close.svg").default} alt="arrow" style={{width: "100%"}}/> }
      </div>
    </div>
  );
};

export default FixedButton;
