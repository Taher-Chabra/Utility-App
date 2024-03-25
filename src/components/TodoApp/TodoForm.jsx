import React, { useState } from "react";
import useTodo from "../../contexts/TodoContext";

function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();

    if (!todo) return;
    const dateAndTime = new Date();
    addTodo({
      todo,
      isCompleted: false,
      dateAndTime: `${dateAndTime.getDate()}/${dateAndTime.getMonth() + 1}/${
        dateAndTime.getFullYear() % 100
      } - ${dateAndTime.getHours()}:${dateAndTime.getMinutes()}`,
    });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="w-full flex">
      <input
        type="text"
        placeholder="Write task Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        className="w-full text-white font-medium outline-none border border-black/10 rounded-l-lg px-3 bg-gray-700/50 py-1.5"
      />
      <button
        type="submit"
        className="px-3 bg-green-600 text-white rounded-r-lg hover:bg-green-700 active:scale-y-95"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
