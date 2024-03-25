import React, { useState } from "react";
import useTodo from "../../contexts/TodoContext";
import {
  RiEdit2Line,
  RiDeleteBin6Line,
  RiTimeLine,
  RiFileEditLine,
  RiExpandRightFill,
} from "react-icons/ri";

function TodoItem({ todo, selectTodo, expandClose }) {
  const [editTodo, setEditTodo] = useState(false);
  const [showDateAndTime, setShowDateAndTime] = useState(false);
  const { deleteTodo, updateTodo, toggleComplete } = useTodo();
  const [todoText, setTodoText] = useState(todo.todo);

  const update = () => {
    updateTodo(todo.id, { ...todo, todo: todoText });
    setEditTodo(false);
  };

  const deleteTodoItem = () => {
    expandClose();
    deleteTodo(todo.id);
  };

  return (
    <div
      className={`w-full flex items-center px-5 py-2 rounded-lg ${
        todo.isCompleted ? "bg-gray-300/30 opacity-70" : "bg-emerald-500"
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
          className="cursor-pointer"
        />
      </div>

      <div className="ml-4 mr-auto">
        <input
          type="text"
          value={todoText}
          onChange={(e) => setTodoText(e.target.value)}
          readOnly={!editTodo}
          className={`w-36 pl-1 font-bold outline-none tracking-wide bg-transparent text-white text-lg
          ${todo.isCompleted ? "line-through" : ""} ${
            editTodo ? "rounded-lg border border-emerald-800/30 " : ""
          } overflow-ellipsis`}
        />
      </div>

      <div className="px-2">
        {showDateAndTime && (
          <span className="font-medium text-white/70">{todo.dateAndTime}</span>
        )}
      </div>

      <div className="flex space-x-4 text-lg items-center">
        <button
          className="bg-white p-1 rounded text-yellow-700 active:scale-95"
          onClick={() => {
            if (todo.isCompleted) return;

            editTodo ? update() : setEditTodo((prev) => !prev);
          }}
        >
          {editTodo ? <RiFileEditLine /> : <RiEdit2Line />}
        </button>
        <button
          className="bg-white p-1 rounded active:scale-95"
          onClick={() => setShowDateAndTime((prev) => !prev)}
        >
          <RiTimeLine />
        </button>
        <button
          className="bg-white p-1 rounded text-red-600 active:scale-95"
          onClick={deleteTodoItem}
        >
          <RiDeleteBin6Line />
        </button>
        <button
          className="bg-white p-1 rounded text-green-600 active:scale-95"
          onClick={() => selectTodo(todo.id)}
        >
          <RiExpandRightFill />
        </button>
      </div>
    </div>
  );
}

export default TodoItem;
