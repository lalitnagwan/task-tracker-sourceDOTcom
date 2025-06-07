import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from '../features/tasks/tasksSlice';
import undoable from 'redux-undo';

const store = configureStore({
  reducer: {
    tasks: undoable(tasksReducer, {
      limit: 10,
      filter: function filterActions(action) {
        return [
          'tasks/addTask',
          'tasks/updateTask',
          'tasks/deleteTask',
          'tasks/toggleTaskStatus',
          'tasks/reorderTasks'
        ].includes(action.type);
      }
    })
  }
});

export default store;