import { useDrop } from 'react-dnd';
import TaskCard from '../TaskCard/TaskCard';

const Column = ({ title, tasks, columnId, onMoveTask }) => {
  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item) => {
      if (item.columnId !== columnId) {
        onMoveTask(item.id, item.columnId, columnId);
      }
    },
  });

  return (
    <div ref={drop} className="column">
      <h2 className="column-title">{title}</h2>
      {tasks.map(task => (
        <TaskCard 
          key={task.id} 
          task={task} 
          columnId={columnId}
          onMoveTask={onMoveTask}
        />
      ))}
    </div>
  );
};

export default Column;