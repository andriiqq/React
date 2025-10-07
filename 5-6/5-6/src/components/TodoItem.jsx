import React, { useState } from "react";

export default function TodoItem({ todo, onEdit, onDelete, onToggleComplete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(todo.todo);

  const handleSave = () => {
    onEdit(todo.id, newTitle);
    setIsEditing(false);
  };

  return (
    <li className="todo-item">
      <div className="todo-left">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id)}
        />

        {isEditing ? (
          <input
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
            className="edit-input"
          />
        ) : (
          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.todo}
          </span>
        )}
      </div>

      <div className="todo-actions">
        {isEditing ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button
              style={{ marginLeft: "5px", color: "red" }}
              onClick={() => onDelete(todo.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </li>
  );
}
