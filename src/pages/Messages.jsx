import React from "react";

import styles from "../style/Messages.module.css";

const Messages = ({ messages, name }) => {
  let now = new Date().toLocaleTimeString()
  return (
    <div className={styles.messages}>
      {messages.map(({ user, message }, i) => {
        const itsMe =
          user.name === name;
        const className = itsMe ? styles.me : styles.user;

        return (
          <div key={i} className={`${styles.message} ${className}`}>
            <span className={styles.user}>{user.name}</span>

            <div className={styles.text}>{message}</div>
            <div className={styles.time}>
              {now}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Messages;