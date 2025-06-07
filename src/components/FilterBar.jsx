import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFilter,
  setSearch,
  setCategory,
  setPriority,
} from "../features/tasks/tasksSlice";

export default function FilterBar() {
  const dispatch = useDispatch();
  const { filter, search, selectedCategory, selectedPriority, tasks } =
    useSelector((state) => state.tasks.present);

  const categories = Array.from(
    new Set(tasks.map((t) => t.category).filter(Boolean))
  );
  const priorities = [
    "All",
    ...Array.from(new Set(tasks.map((t) => t.priority).filter(Boolean))),
  ];

  return (
    <div className="filter-bar">
      <label>
        Status:
        <select
          value={filter}
          onChange={(e) => dispatch(setFilter(e.target.value))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <label>
        Category:
        <select
          value={selectedCategory}
          onChange={(e) => dispatch(setCategory(e.target.value))}
        >
          <option value="All">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </label>
      <label>
        Priority:
        <select
          value={selectedPriority}
          onChange={(e) => dispatch(setPriority(e.target.value))}
        >
          {priorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </label>
      <input
        type="search"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        aria-label="Search tasks"
      />
    </div>
  );
}
