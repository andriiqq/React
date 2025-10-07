import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Search todos..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{
        marginBottom: "20px",
        padding: "5px",
        width: "80%",
      }}
    />
  );
}
