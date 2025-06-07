import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ActionCreators } from 'redux-undo';

export default function UndoRedoControls() {
  const dispatch = useDispatch();
  const canUndo = useSelector((state) => state.tasks.past.length > 0);
  const canRedo = useSelector((state) => state.tasks.future.length > 0);

  return (
    <div className="undo-redo-controls">
      <button onClick={() => dispatch(ActionCreators.undo())} disabled={!canUndo} aria-label="Undo">
        Undo
      </button>
      <button onClick={() => dispatch(ActionCreators.redo())} disabled={!canRedo} aria-label="Redo">
        Redo
      </button>
    </div>
  );
}