import styles from './styles/UserList.module.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UserList({ items }) {

  const navigate = useNavigate();

  return (
    <div className={styles.list}>
      <div className={styles.items}>
        {items.map((user) => (
        <div className={styles.item} key={user._id} onClick={() => navigate("/users/" + user._id)}>
            <div className={styles.avatar}>
                <img src={user.avatar || require("./images/non-avatar.svg").default} alt="" />
            </div>
            <div>
                <div>{user.username}</div>
                <div>{user.name}</div>
                {user.reviews && <div style={{display: "flex", gap: 5, alignItems: "center"}}><span style={{color: "#fff", fontSize: 11, fontWeight: 300}}>{user.reviews.price}</span><img src={user.reviews.stars} alt="" /><span style={{fontSize: 11, fontWeight: 300}}>{user.reviews.count} отзывов</span></div>}
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}

export default UserList;
