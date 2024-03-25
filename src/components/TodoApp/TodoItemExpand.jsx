import React, { useEffect, useState } from "react";
import useTodo from "../../contexts/TodoContext";
import { RiEdit2Line, RiDeleteBin6Line, RiFileEditLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";

function TodoItemExpand({ todo, expandClose }) {
  const [editTodo, setEditTodo] = useState(false);
  const { deleteTodo, updateTodo, toggleComplete } = useTodo();
  const [todoText, setTodoText] = useState(todo.todo);

  useEffect(() => {
    setTodoText(todo.todo);
  }, [todo]);

  const update = () => {
    updateTodo(todo.id, { ...todo, todo: todoText });
    setEditTodo(false);
  };

  const deleteTodoItem = () => {
    deleteTodo(todo.id);
    expandClose();
  };

  const completionTime = () => {
    const dateAndTimeComplete = new Date();
    const completedTime = `${dateAndTimeComplete.getDate()}/${
      dateAndTimeComplete.getMonth() + 1
    }/${
      dateAndTimeComplete.getFullYear() % 100
    } - ${dateAndTimeComplete.getHours()}:${dateAndTimeComplete.getMinutes()}`;
    return completedTime;
  };

  return (
    <div className="w-full flex flex-col bg-slate-300 rounded p-1">
      <div className="flex justify-between items-center rounded px-2 bg-gray-500 py-1">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleComplete(todo.id)}
          className="cursor-pointer"
        />
        <div className="space-x-2 text-sm items-center">
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
            className="bg-white p-1 rounded text-red-600 active:scale-95"
            onClick={deleteTodoItem}
          >
            <RiDeleteBin6Line />
          </button>
        </div>

        <button className="text-lg text-red-500" onClick={() => expandClose()}>
          <ImCancelCircle />
        </button>
      </div>

      <div className="p-1">
        <textarea
          cols="30"
          rows="7"
          value={todoText}
          readOnly={!editTodo}
          onChange={(e) => setTodoText(e.target.value)}
          className={`resize-none bg-black/10 outline-none text-lg ${
            todo.isCompleted ? "line-through" : ""
          }`}
        ></textarea>
      </div>

      <div className="flex flex-col font-medium text-sm tracking-wider text-zinc-700">
        <span>Created : {todo.dateAndTime}</span>
        <span>Completed : {todo.isCompleted ? completionTime() : "--"}</span>
      </div>
    </div>
  );
}

export default TodoItemExpand;
