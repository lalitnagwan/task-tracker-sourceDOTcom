import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskForm from '../components/TaskForm';
import { Provider } from 'react-redux';
import store from '../store/store';

test('renders task form and submits input', () => {
  render(
    <Provider store={store}>
      <TaskForm />
    </Provider>
  );
  const input = screen.getByPlaceholderText(/Task title/i);
  fireEvent.change(input, { target: { value: 'Test Task' } });
  const button = screen.getByText(/Add Task/i);
  fireEvent.click(button);
  expect(input.value).toBe('');
});