import React from "react";
import { useSelector } from "react-redux";

export default function TaskDashboard() {
  const { tasks } = useSelector((state) => state.tasks.present);
  const completed = tasks.filter((t) => t.status === "completed").length;
  const active = tasks.filter((t) => t.status === "active").length;
  const total = tasks.length;

  return (
    <section className="task-dashboard" aria-label="Task Completion Dashboard">
      <div>
        <strong>Total Tasks:</strong> {total}
      </div>
      <div>
        <strong>Completed:</strong> {completed}
      </div>
      <div>
        <strong>Active:</strong> {active}
      </div>
      <div>
        <strong>Completion Rate:</strong>{" "}
        {total ? Math.round((completed / total) * 100) : 0}%
      </div>
    </section>
  );
}
