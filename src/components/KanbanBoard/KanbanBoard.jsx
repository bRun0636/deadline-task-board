import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from '../Column/Column';
import { TaskStatus } from '../../types/dto/TaskDTO';
import { initialTasks } from '../../data/tasks';

const KanbanBoard = () => {
  const [columns, setColumns] = useState({
    [TaskStatus.BACKLOG]: initialTasks.filter(t => t.status === TaskStatus.BACKLOG),
    [TaskStatus.APPROVED]: initialTasks.filter(t => t.status === TaskStatus.APPROVED),
    [TaskStatus.CODING]: initialTasks.filter(t => t.status === TaskStatus.CODING),
    [TaskStatus.TESTING]: initialTasks.filter(t => t.status === TaskStatus.TESTING),
    [TaskStatus.DEPLOYED]: initialTasks.filter(t => t.status === TaskStatus.DEPLOYED),
  });

  const handleMoveTask = (taskId, fromColumnId, toColumnId) => {
    setColumns(prev => {
      // Находим задачу
      const task = prev[fromColumnId].find(t => t.id === taskId);
      if (!task) return prev;

      // Обновляем статус задачи
      const updatedTask = { ...task, status: toColumnId };

      return {
        ...prev,
        [fromColumnId]: prev[fromColumnId].filter(t => t.id !== taskId),
        [toColumnId]: [...prev[toColumnId], updatedTask],
      };
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="kanban-board">
        {Object.entries(columns).map(([status, tasks]) => (
          <Column
            key={status}
            title={status}
            tasks={tasks}
            columnId={status}
            onMoveTask={handleMoveTask}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default KanbanBoard;