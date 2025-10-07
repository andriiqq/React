import React, { useState } from "react";
import { useTodos } from "./hooks/useTodos";
import TodoList from "./components/TodoList";
import Pagination from "./components/Pagination";
import SearchBar from "./components/SearchBar";

export default function App() {
  const {
    todos,
    isLoading,
    error,
    currentPage,
    goToNextPage,
    goToPrevPage,
    totalTodos,
    limitPerPage,
    setSearchTerm,
    searchTerm,
    editTodoTitle,
    addTodo,
    deleteTodo,
  } = useTodos();

  const [newTitle, setNewTitle] = useState("");

  const handleAdd = () => {
    if (newTitle.trim() === "") return;
    addTodo(newTitle);
    setNewTitle("");
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div style={{ width: "600px", margin: "0 auto", textAlign: "center" }}>
      <h1>To-Do List</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Enter new task..."
          style={{ padding: "5px", width: "70%" }}
        />
        <button onClick={handleAdd} style={{ marginLeft: "10px" }}>
          Add
        </button>
      </div>

      <SearchBar value={searchTerm} onChange={setSearchTerm} />
      <TodoList todos={todos} onEdit={editTodoTitle} onDelete={deleteTodo} />
      <Pagination
        currentPage={currentPage}
        total={totalTodos}
        limit={limitPerPage}
        onNext={goToNextPage}
        onPrev={goToPrevPage}
      />
    </div>
  );
}
