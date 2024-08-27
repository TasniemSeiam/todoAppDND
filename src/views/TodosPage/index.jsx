import React from "react";
import { InputTodo } from "../../components/InputTodo";
import styles from "./style.module.css";
import Todo from "../../components/Todo";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { moveTodo } from "../../controller/todoSlice";
import _ from "lodash";

const TodosPage = () => {
  const dispatch = useDispatch();
  const list = useSelector((state) => state.todos);

  const handelDragEnd = (result) => {
    const { destination, source } = result;

    // If there's no destination (dropped outside the list), return early
    if (!destination) return;

    // Dispatch the move action to Redux
    dispatch(
      moveTodo({
        source,
        destination,
      })
    );
  };

  return (
    <main>
      <InputTodo />
      <DragDropContext onDragEnd={handelDragEnd}>
        <div className={styles.container}>
          {_.map(list, (data, key) => {
            return (
              <div key={key} className={styles.column}>
                <h4 className={styles.label}>{key}</h4>
                <Droppable droppableId={String(key)}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className={styles.todoContainer}
                    >
                      {data.items.map((todo, index) => (
                        <Draggable
                          key={todo.id}
                          draggableId={String(todo.id)}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Todo
                                title={todo.title}
                                type={todo.type}
                                id={todo.id}
                                droppableId={key} // Pass the droppableId
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>
    </main>
  );
};

export default TodosPage;
