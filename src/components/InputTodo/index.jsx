import React, { useState } from "react";
import styles from "./style.module.css";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { addTodo } from "../../controller/todoSlice";

export const InputTodo = () => {
  const [input, setInput] = useState("");
  const [type, setTodoType] = useState("");
  const dispatch = useDispatch();

  const handelSubmit = (e) => {
    e.preventDefault();
    if (input.trim() !== "") {
      const newTodo = {
        id: uuidv4(),
        title: input,
        type: type,
      };
      dispatch(addTodo(newTodo));
      setInput("");
      console.log("added");
    }
  };

  return (
    <form onSubmit={handelSubmit} className={styles.formInput}>
      <input
        type="text"
        placeholder="Add Task"
        className={styles.inputTodo}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div style={{ marginLeft: "10px" }}>
        <button type="submit" className={styles.btn}>
          Add
        </button>
        <select
          className={styles.selectType}
          onChange={(e) => setTodoType(e.target.value)}
        >
          <option value="text">Text</option>
          <option value="list">List</option>
        </select>
      </div>
    </form>
  );
};
