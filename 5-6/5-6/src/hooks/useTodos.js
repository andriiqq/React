import { useState, useEffect } from "react";

export function useTodos() {
  const [todos, setTodos] = useState([]);
  const [allTodos, setAllTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [limitPerPage, setLimitPerPage] = useState(10);
  const [totalTodos, setTotalTodos] = useState(0);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [currentPage, limitPerPage]);

  async function fetchTodos() {
    try {
      setIsLoading(true);
      const skip = (currentPage - 1) * limitPerPage;
      const res = await fetch(
        `https://dummyjson.com/todos?limit=${limitPerPage}&skip=${skip}`
      );
      const data = await res.json();
      setTodos(data.todos);
      setAllTodos(data.todos);
      setTotalTodos(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredTodos = todos.filter((todo) =>
    todo.todo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToNextPage = () => {
    if (currentPage * limitPerPage < totalTodos) {
      setCurrentPage((p) => p + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const changeLimit = (limit) => {
    setLimitPerPage(limit);
    setCurrentPage(1);
  };

  async function editTodoTitle(id, newTitle) {
    try {
      if (id > 150) {
        setTodos((prev) =>
          prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
        );
        return;
      }

      const res = await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ todo: newTitle }),
      });

      if (!res.ok) throw new Error("Server rejected update");

      const updated = await res.json();
      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: updated.todo } : t))
      );
    } catch (err) {
      console.error("Failed to edit todo:", err);

      setTodos((prev) =>
        prev.map((t) => (t.id === id ? { ...t, todo: newTitle } : t))
      );
    }
  }

  async function addTodo(title) {
    try {
      const res = await fetch("https://dummyjson.com/todos/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          todo: title,
          completed: false,
          userId: 1,
        }),
      });
      const newTodo = await res.json();

      const localId = Date.now();

      setTodos((prev) => [{ ...newTodo, id: localId }, ...prev]);
      setTotalTodos((t) => t + 1);
    } catch (err) {
      console.error("Failed to add todo:", err);
    }
  }

  async function deleteTodo(id) {
    try {
      await fetch(`https://dummyjson.com/todos/${id}`, {
        method: "DELETE",
      });
      setTodos((prev) => prev.filter((t) => t.id !== id));
      setTotalTodos((t) => t - 1);
    } catch (err) {
      console.error("Failed to delete todo:", err);
    }
  }

  return {
    todos: filteredTodos,
    totalTodos,
    isLoading,
    error,
    currentPage,
    limitPerPage,
    searchTerm,
    setSearchTerm,
    goToNextPage,
    goToPrevPage,
    setLimit: changeLimit,
    editTodoTitle,
    addTodo,
    deleteTodo,
  };
}
