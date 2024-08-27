import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: { title: "Todo", items: [] },
  inprogress: { title: "In progress", items: [] },
  done: { title: "Done", items: [] },
};

const TodoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todo.items.push(action.payload);
    },
    deleteTodo: (state, action) => {
      const { droppableId, id } = action.payload;
      state[droppableId].items = state[droppableId].items.filter(
        (todo) => todo.id !== id
      );
    },
    updateTodo: (state, action) => {
      const { droppableId, id, changes } = action.payload;
      state[droppableId].items = state[droppableId].items.map((todo) =>
        todo.id === id ? { ...todo, ...changes } : todo
      );
    },
    moveTodo: (state, action) => {
      const { source, destination } = action.payload;
      if (!destination) return;

      // Remove the item from the source array
      const [movedItem] = state[source.droppableId].items.splice(
        source.index,
        1
      );

      // Add the item to the destination array
      state[destination.droppableId].items.splice(
        destination.index,
        0,
        movedItem
      );
    },
  },
});

export const { addTodo, deleteTodo, updateTodo, moveTodo } = TodoSlice.actions;

export default TodoSlice.reducer;
