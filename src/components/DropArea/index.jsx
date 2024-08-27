import React, { useState } from "react";
import styles from "./style.module.css";
const DropArea = () => {
  const [show, setShow] = useState(false);
  return (
    <div
      onDragEnter={() => setShow(true)}
      onDragLeave={() => setShow(false)}
      className={show ? styles.dropArea : styles.hideDropArea}
    >
      Drop here
    </div>
  );
};

export default DropArea;
