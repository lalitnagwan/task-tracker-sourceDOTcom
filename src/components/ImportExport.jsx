import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { importTasks } from "../features/tasks/tasksSlice";

export default function ImportExport() {
  const dispatch = useDispatch();
  const { tasks } = useSelector((state) => state.tasks.present);

  function handleExport() {
    const blob = new Blob([JSON.stringify(tasks, null, 2)], {
      type: "application/json",
    });
    const href = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = href;
    a.download = "tasks-export.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(href);
  }

  function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const imported = JSON.parse(event.target.result);
        if (Array.isArray(imported)) dispatch(importTasks(imported));
      } catch (err) {
        alert("Invalid file format");
      }
    };
    reader.readAsText(file);
  }

  return (
    <div className="import-export">
      <button onClick={handleExport}>Export Tasks</button>
      <input
        type="file"
        accept="application/json"
        onChange={handleImport}
        aria-label="Import tasks"
      />
    </div>
  );
}
