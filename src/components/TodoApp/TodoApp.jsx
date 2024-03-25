import React, { useContext, useEffect, useState } from "react";
import { TodoContextProvider } from "../../contexts/TodoContext";
import { v4 as uniqueId } from "uuid";
import { userContext } from "../../contexts/UserContext";
import TodoForm from "./TodoForm";
import TodoItem from "./TodoItem";
import TodoItemExpand from "./TodoItemExpand";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [expandTodo, setExpandTodo] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState("");

  const addTodo = (todo) => {
    setTodos((prevTodos) => [{ id: uniqueId(), ...todo }, ...prevTodos]);
  };

  const deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, todo) => {
    setTodos((prevTodos) =>
      prevTodos.map((currTodo) => (currTodo.id === id ? todo : currTodo))
    );
  };

  const toggleComplete = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleExpansion = (todo) => {
    if (!expandTodo) setExpandTodo(true);
    setSelectedTodo(todo);
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todoList"));
    if (todos && todos.length > 0) setTodos(todos);
    console.log('RENDERED')
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todos));
  }, [todos]);

  const { user } = useContext(userContext);

  return (
    <TodoContextProvider
      value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}
    >
      <div className="w-full flex flex-col items-center">
        <p className="text-center relative top-1 text-neutral-700 dark:text-white text-lg font-medium">
          Hey {user ? user : "user"}, This app allows you to efficiently
          organize your tasks. Easily create, manage, and mark tasks <br /> as
          complete to stay on top of your to-do list.
        </p>
        <div
          className={`relative flex justify-center gap-x-20 mt-8 bg-[#5c73c0] rounded-xl py-5 px-10 border-2 border-black dark:border-white ${
            expandTodo ? "w-4/6" : "w-3/6"
          }`}
        >
          <div className="w-full">
            <p className="text-center text-4xl text-white font-bold">
              Todo App
            </p>
            <div className="my-5">
              <TodoForm />
            </div>
            <div className="max-h-56 overflow-y-scroll">
              {todos.map((todo) => (
                <div key={todo.id} className="my-3">
                  <TodoItem 
                  todo={todo} 
                  selectTodo={handleExpansion}
                  expandClose={() => setExpandTodo(false)}
                  />
                </div>
              ))}
            </div>
          </div>

          {expandTodo && (
            <div className="absolute bg-white w-1 top-0 bottom-0 ml-56"></div>
          )}

          {expandTodo && (
            <div className="mt-5">
              <TodoItemExpand
                todo={todos?.find((todo) => todo.id === selectedTodo)}
                expandClose={() => setExpandTodo(false)}
              />
            </div>
          )}
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default TodoApp;
