import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: {
    id: 1,
    todo: "todo msg",
    isCompleted: false,
    dateAndTime: "date and time",
  },

  addTodo: (todo) => {},
  deleteTodo: (id) => {},
  updateTodo: (id, todo) => {},
  toggleComplete: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export default function useTodo() {
  return useContext(TodoContext);
}
