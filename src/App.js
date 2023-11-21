// Dependencies
import React, { useState } from "react";

// Styles
import "./tailwind.output.css";

export default function App() {
  return (
    <div className="h-screen md:h-screen py-8  bg-gradient-to-r from-purple-600 to-indigo-800">
      <Container />
    </div>
  );
}
function Container() {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState("");

  function handleAddItems(newTodo) {
    setTodoList((curTodoList) => [...curTodoList, newTodo]);
  }

  function handleUpdateMarkedItem(id) {
    setTodoList((curTodo) =>
      curTodo.map((todo) =>
        todo.id === id ? { ...todo, marked: !todo.marked } : todo
      )
    );
  }

  function handleEditTodo(todoName, id) {
    setTodo(todoName);
    setTodoList((curList) => curList.filter((todo) => todo.id !== id));
  }

  function handleDeleteTodo(id) {
    setTodoList((curList) => curList.filter((todo) => todo.id !== id));
  }

  function handleClearComplete() {
    setTodoList((curList) => curList.filter((todo) => !todo.marked));
  }

  function handleReset() {}

  return (
    <div className="max-w-xl mx-auto">
      <TodoInput toAddItems={handleAddItems} todo={todo} setTodo={setTodo} />
      <TodoList
        todoList={todoList}
        onUpdateMarkedItem={handleUpdateMarkedItem}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
        onClearComplete={handleClearComplete}
      />
    </div>
  );
}

function TodoInput({ toAddItems, todo, setTodo }) {
  function handleSubmit(e) {
    e.preventDefault();
    if (!todo) return;

    const newTodo = { todo, marked: false, id: crypto.randomUUID() };
    toAddItems(newTodo);
    setTodo("");
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-xl flex py-10 px-8 rounded-md space-x-10"
    >
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
        placeholder="Task to be done.."
        className="px-4 border border-gray-400 font-medium placeholder:font-normal w-full text-blue-800 focus:outline-none focus:border-purple-600 py-2 rounded-md "
      />
      <button className="border hover:scale-110 transition-transform bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-medium py-2 px-8 rounded-md">
        Add
      </button>
    </form>
  );
}

function TodoList({
  todoList,
  onUpdateMarkedItem,
  onEditTodo,
  onDeleteTodo,
  onClearComplete
}) {
  return (
    todoList.length > 0 && (
      <div className="bg-white shadow-xl mt-16 px-8 pt-8 pb-8 rounded-md">
        {todoList.map((todo) => (
          <TodoCard
            todo={todo}
            key={todo.id}
            onUpdateMarkedItem={onUpdateMarkedItem}
            onEditTodo={onEditTodo}
            onDeleteTodo={onDeleteTodo}
          />
        ))}

        <div className="flex justify-between mt-10">
          <button className="border hover:scale-110 transition-transform bg-gradient-to-r from-red-600 to-indigo-800 text-white font-medium py-2 px-8 rounded-md">
            Reset
          </button>
          <button
            onClick={onClearComplete}
            className="border focus:outline-none hover:scale-110 transition-transform bg-gradient-to-r from-purple-600 to-indigo-800 text-white font-medium py-2 px-8 rounded-md"
          >
            Clear completed
          </button>
        </div>
      </div>
    )
  );
}

function TodoCard({ todo, onUpdateMarkedItem, onEditTodo, onDeleteTodo }) {
  return (
    <div className="bg-white flex justify-between py-4 pb-2 border-b border-gray-300">
      <div className="flex items-center gap-6">
        <p
          onClick={() => onUpdateMarkedItem(todo.id)}
          className={`font-bold text-purple-600 border border-gray-400 cursor-pointer px-1 rounded-md ${
            todo.marked ? "text-opacity-100" : "text-opacity-0"
          } shadow-md`}
        >
          &#10003;
        </p>
        <p
          className={`font-medium ${
            todo.marked
              ? "line-through text-purple-400"
              : "decoration-none text-purple-900"
          }  text-lg`}
        >
          {todo.todo}
        </p>
      </div>

      <div className="flex gap-5">
        <Buttons
          img="/edit-11.png"
          onClick={() => onEditTodo(todo.todo, todo.id)}
        />
        <Buttons img="/delete-32.png" onClick={() => onDeleteTodo(todo.id)} />
      </div>
    </div>
  );
}

function Buttons({ img, onClick }) {
  return (
    <section
      onClick={onClick}
      className="bg-gradient-to-r cursor-pointer hover:scale-110 transition-transform from-purple-600 to-indigo-800 rounded-md hover: py-3 px-3"
    >
      <img src={img} alt="delete" className="w-4" />
    </section>
  );
}
