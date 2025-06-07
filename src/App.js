import React from 'react';
import TaskDashboard from './components/TaskDashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import ImportExport from './components/ImportExport';
import UndoRedoControls from './components/UndoRedoControls';
import './assets/styles/main.css';

export default function App() {
  return (
    <div className="app-container">
      <header>
        <h1>Task Tracker <span>SourceDOTcom</span></h1>
      </header>
      <main>
        <TaskDashboard />
        <TaskForm />
        <FilterBar />
        <UndoRedoControls />
        <TaskList />
        <ImportExport />
      </main>
      <footer>
        <small>© 2025 Task Tracker SourceDOTcom | <a href="https://github.com/your-username/task-tracker-redux">GitHub Repo - Lalit Nagwan</a></small>
      </footer>
    </div>
  );
}