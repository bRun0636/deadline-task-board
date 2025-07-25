import './KanbanBoard.css';
import Column from '../Column/Column';
import { TaskStatus, createTask } from '../../types/dto/TaskDTO';
import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { initialTasks } from '../../data/tasks';

const KanbanBoard = ({ isNavbarClosed }) => {
  const [columns, setColumns] = useState({
    [TaskStatus.BACKLOG]: initialTasks.filter(t => t.status === TaskStatus.BACKLOG),
    [TaskStatus.APPROVED]: initialTasks.filter(t => t.status === TaskStatus.APPROVED),
    [TaskStatus.CODING]: initialTasks.filter(t => t.status === TaskStatus.CODING),
    [TaskStatus.TESTING]: initialTasks.filter(t => t.status === TaskStatus.TESTING),
    [TaskStatus.DEPLOYED]: initialTasks.filter(t => t.status === TaskStatus.DEPLOYED),
  });

  const [newColumnTitle, setNewColumnTitle] = useState('');
  const [addingColumn, setAddingColumn] = useState(false);

  const handleMoveTask = (taskId, fromColumnId, toColumnId) => {
    setColumns(prev => {
      const task = prev[fromColumnId].find(t => t.id === taskId);
      if (!task) return prev;

      const updatedTask = { ...task, status: toColumnId };

      return {
        ...prev,
        [fromColumnId]: prev[fromColumnId].filter(t => t.id !== taskId),
        [toColumnId]: [...prev[toColumnId], updatedTask],
      };
    });
  };

  const addNewColumn = () => {
    if (!newColumnTitle.trim()) return;
    if (columns[newColumnTitle]) return alert("Колонка с таким названием уже есть");

    setColumns(prev => ({
      ...prev,
      [newColumnTitle]: [],
    }));
    setNewColumnTitle('');
    setAddingColumn(false);
  };

  const addNewTask = (columnId, taskData) => {
    const newTask = createTask({
      ...taskData,
      status: columnId,
      date: new Date().toLocaleDateString(),
    });
    setColumns(prev => ({
      ...prev,
      [columnId]: [...prev[columnId], newTask],
    }));
  };

  return (
    <>
      <div className={`add-column-container ${isNavbarClosed ? 'navbar-closed' : ''}`}>
        {!addingColumn ? (
          <button className="add-column-btn" onClick={() => setAddingColumn(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Добавить колонку
          </button>
        ) : (
          <div className="add-column-form">
            <input
              type="text"
              value={newColumnTitle}
              onChange={e => setNewColumnTitle(e.target.value)}
              placeholder="Название колонки"
              className="column-input"
            />
            <button className="confirm-btn" onClick={addNewColumn}>Добавить</button>
            <button className="cancel-btn" onClick={() => setAddingColumn(false)}>Отмена</button>
          </div>
        )}
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="kanban-board">
          {Object.entries(columns).map(([status, tasks]) => (
            <Column
              key={status}
              title={status}
              tasks={tasks}
              columnId={status}
              onMoveTask={handleMoveTask}
              onAddTask={addNewTask}
            />
          ))}
        </div>
      </DndProvider>
    </>
  );
};

export default KanbanBoard;
