# ReactJS Task Tracker Application with Redux

A comprehensive Task Tracker application built with ReactJS and Redux, allowing users to efficiently manage their daily tasks.

---

## Project Overview

This application lets users create, update, delete, and organize tasks, supporting filtering, searching, categorization, priorities, and persistent storage. It also features drag-and-drop task reordering, undo/redo, data export/import, accessibility, and a statistics dashboard.

---

## Features

### Core Functionality

- **Task Management**: Create, read, update, delete tasks
- **Task Status**: Toggle between completed/active
- **Filtering**: Filter by status (all/completed/active)
- **Search**: Search tasks by title or description
- **Categories**: Organize tasks by tags/categories
- **Priority Levels**: Assign & color-code priorities

### Technical Requirements

- **Frontend Framework**: ReactJS (functional components & hooks)
- **State Management**: Redux & Redux Toolkit
- **Middleware**: Redux Thunk (for async ops)
- **Persistence**: LocalStorage (or IndexedDB)
- **Responsive Design**: Mobile-first

### User Experience

- **Intuitive UI**: Clean, user-friendly interface
- **Task Organization**: Drag-and-drop reordering
- **Visual Indicators**: Color-coded priorities/status

### Bonus Features

- **Data Visualization**: Task completion statistics dashboard
- **Undo/Redo**: History for actions
- **Collaboration**: Share tasks/lists (mock)
- **Export/Import**: JSON import/export
- **Accessibility**: Keyboard navigation, screen reader support

---

## Getting Started

### Prerequisites

- Node.js >= 16.x
- npm or yarn

### Installation

```bash
git clone https://github.com/lalitnagwan/task-tracker-sourceDOTcom.git
cd task-tracker-sourceDOTcom
npm install
```

### Running Locally

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Test Coverage

```bash
npm test
```

---

## Folder Structure

- `/src`
  - `/components` – React components
  - `/features` – Redux slices and features
  - `/store` – Redux store setup
  - `/utils` – Utility functions
  - `/assets` – Icons, images, styles
  - `/hooks` – Custom React hooks
  - `/__tests__` – Unit & integration tests

---

## Deployment

- Deploy on Netlify/Vercel or your preferred hosting platform.

---

## Documentation

- Well-documented source code with comments
- See `/docs` for setup and feature instructions

---

## License

MIT

---

_This project fulfills all requirements and features as per the assignment given to me._
