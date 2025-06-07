import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { saveTasksToStorage, loadTasksFromStorage } from '../../utils/storage';

const initialState = {
  tasks: loadTasksFromStorage() || [],
  status: 'idle',
  error: null,
  filter: 'all',
  search: '',
  categories: [],
  priorities: ['Low', 'Medium', 'High'],
  selectedCategory: 'All',
  selectedPriority: 'All'
};

export const addTaskAsync = createAsyncThunk(
  'tasks/addTaskAsync',
  async (task, thunkAPI) => {

    return new Promise((resolve) => setTimeout(() => resolve(task), 300));
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask(state, action) {
      state.tasks.push({ ...action.payload, id: uuidv4(), createdAt: Date.now(), status: 'active' });
      saveTasksToStorage(state.tasks);
    },
    updateTask(state, action) {
      const idx = state.tasks.findIndex((t) => t.id === action.payload.id);
      if (idx > -1) {
        state.tasks[idx] = { ...state.tasks[idx], ...action.payload };
        saveTasksToStorage(state.tasks);
      }
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      saveTasksToStorage(state.tasks);
    },
    toggleTaskStatus(state, action) {
      const idx = state.tasks.findIndex((t) => t.id === action.payload);
      if (idx > -1) {
        state.tasks[idx].status = state.tasks[idx].status === 'completed' ? 'active' : 'completed';
        saveTasksToStorage(state.tasks);
      }
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearch(state, action) {
      state.search = action.payload;
    },
    setCategory(state, action) {
      state.selectedCategory = action.payload;
    },
    setPriority(state, action) {
      state.selectedPriority = action.payload;
    },
    reorderTasks(state, action) {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    importTasks(state, action) {
      state.tasks = action.payload;
      saveTasksToStorage(state.tasks);
    },
    clearTasks(state) {
      state.tasks = [];
      saveTasksToStorage(state.tasks);
    }
  },
  extraReducers(builder) {
    builder
      .addCase(addTaskAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push({ ...action.payload, id: uuidv4(), createdAt: Date.now(), status: 'active' });
        saveTasksToStorage(state.tasks);
        state.status = 'succeeded';
      })
      .addCase(addTaskAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  addTask,
  updateTask,
  deleteTask,
  toggleTaskStatus,
  setFilter,
  setSearch,
  setCategory,
  setPriority,
  reorderTasks,
  importTasks,
  clearTasks
} = tasksSlice.actions;

export default tasksSlice.reducer;