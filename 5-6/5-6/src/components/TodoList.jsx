import React from "react";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, onEdit, onDelete }) {
  if (todos.length === 0) return <p>No todos found</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
