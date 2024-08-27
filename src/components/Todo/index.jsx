import React from "react";
import { useDispatch } from "react-redux";
import { deleteTodo } from "../../controller/todoSlice";
import styles from "./style.module.css";
import { FaRegTrashAlt } from "react-icons/fa";

const Todo = ({ id, droppableId, title, type }) => {
  const dispatch = useDispatch();

  const handelDelete = () => {
    dispatch(deleteTodo({ droppableId, id }));
  };

  return (
    <div className={styles.todoItems}>
      <div className={styles.todoItem}>
        {type === "list" ? (
          <ul style={{ padding: "0px" }}>
            <li>{title}</li>
          </ul>
        ) : (
          <p style={{ padding: "0 5px" }}>{title}</p>
        )}
      </div>
      <button
        style={{
          padding: "10px",
          border: "none",
          backgroundColor: "transparent",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={handelDelete}
      >
        <FaRegTrashAlt />
      </button>
    </div>
  );
};

export default Todo;
