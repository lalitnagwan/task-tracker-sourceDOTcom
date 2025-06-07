import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, updateTask } from "../features/tasks/tasksSlice";

const initialForm = {
  title: "",
  description: "",
  category: "",
  priority: "Medium",
};

export default function TaskForm({ editTask, setEditTask }) {
  const dispatch = useDispatch();
  const [form, setForm] = useState(editTask || initialForm);
  const categories = useSelector((state) => {
    const cats = state.tasks.present.tasks
      .map((t) => t.category)
      .filter(Boolean);
    return ["Work", "Personal", "Shopping", "Health"];
  });
  const priorities = useSelector((state) => state.tasks.present.priorities);

  React.useEffect(() => {
    if (editTask) setForm(editTask);
  }, [editTask]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    if (editTask) {
      dispatch(updateTask({ ...form }));
      setEditTask(null);
    } else {
      dispatch(addTask(form));
    }
    setForm(initialForm);
  }

  return (
    <form className="task-form" onSubmit={handleSubmit} aria-label="Task form">
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Task title"
        aria-label="Task title"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        aria-label="Task description"
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        aria-label="Category"
      >
        <option value="">Select category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <select
        name="priority"
        value={form.priority}
        onChange={handleChange}
        aria-label="Priority"
      >
        {priorities.map((p) => (
          <option key={p} value={p}>
            {p}
          </option>
        ))}
      </select>
      <button type="submit">{editTask ? "Update" : "Add"} Task</button>
      {editTask && (
        <button type="button" onClick={() => setEditTask(null)}>
          Cancel
        </button>
      )}
    </form>
  );
}
