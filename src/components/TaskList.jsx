import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTask,
  toggleTaskStatus,
  reorderTasks,
} from "../features/tasks/tasksSlice";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import TaskForm from "./TaskForm";

function filterTasks(
  tasks,
  { filter, search, selectedCategory, selectedPriority }
) {
  return tasks
    .filter((t) => {
      if (filter === "completed") return t.status === "completed";
      if (filter === "active") return t.status === "active";
      return true;
    })
    .filter((t) => {
      if (!search) return true;
      return (
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        (t.description &&
          t.description.toLowerCase().includes(search.toLowerCase()))
      );
    })
    .filter(
      (t) => selectedCategory === "All" || t.category === selectedCategory
    )
    .filter(
      (t) => selectedPriority === "All" || t.priority === selectedPriority
    );
}

export default function TaskList() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.tasks.present);
  const [editTask, setEditTask] = useState(null);

  const tasks = filterTasks(state.tasks, state);

  function handleDelete(id) {
    if (window.confirm("Delete this task?")) dispatch(deleteTask(id));
  }

  function handleToggle(id) {
    dispatch(toggleTaskStatus(id));
  }

  function handleDragEnd(result) {
    if (!result.destination) return;
    const reordered = Array.from(tasks);
    const [removed] = reordered.splice(result.source.index, 1);
    reordered.splice(result.destination.index, 0, removed);

    const newOrder = state.tasks
      .filter((t) => !tasks.map((tt) => tt.id).includes(t.id))
      .concat(reordered);

    dispatch(reorderTasks(newOrder));
  }

  if (!tasks.length) return <div className="empty-state">No tasks found.</div>;

  return (
    <div className="task-list-container" aria-label="Task List">
      {editTask && <TaskForm editTask={editTask} setEditTask={setEditTask} />}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tasklist">
          {(provided) => (
            <ul
              className="task-list"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tasks.map((task, idx) => (
                <Draggable key={task.id} draggableId={task.id} index={idx}>
                  {(provided) => (
                    <li
                      className={`task-item ${task.status} priority-${task.priority.toLowerCase()}`}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      tabIndex={0}
                      aria-label={`Task: ${task.title}`}
                    >
                      <div className="task-main">
                        <input
                          type="checkbox"
                          checked={task.status === "completed"}
                          onChange={() => handleToggle(task.id)}
                          aria-label="Toggle completed"
                        />
                        <span className="task-title">{task.title}</span>
                        {task.category && (
                          <span className="task-category">{task.category}</span>
                        )}
                        <span className="task-priority">{task.priority}</span>
                      </div>
                      <div className="task-actions">
                        <button
                          onClick={() => setEditTask(task)}
                          aria-label="Edit"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(task.id)}
                          aria-label="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                      {task.description && (
                        <div className="task-desc">{task.description}</div>
                      )}
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
