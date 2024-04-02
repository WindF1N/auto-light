import styles from './styles/Title.module.css';
import { useState } from 'react';

function Title({ text, allowGrid, allowBlocks, allowActions, actions }) {

  return (
    <div className={styles.title}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.views}>
        {allowGrid &&
          <div className={styles.view}>
            <img src={require("./images/display1-active.svg").default} alt="" />
          </div>}
        {allowBlocks &&
          <div className={styles.view}>
            <img src={require("./images/display2.svg").default} alt="" />
          </div>}
        {allowActions &&
          actions.map((action) => (
            <div className={styles.view} onClick={action.onClick}>
              <img src={action.icon} alt="" />
            </div>
          ))}
      </div>
    </div>
  );
}

export default Title;
