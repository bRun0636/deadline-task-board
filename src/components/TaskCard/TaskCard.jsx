import { useDrag } from 'react-dnd';

const TaskCard = ({ task, onMoveTask, columnId }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: { id: task.id, columnId },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div 
      ref={drag}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <div className="task-title">{task.title}</div>
      <div className="task-date">{task.date}</div>
      <div className="task-tags">
        {task.tags.map(tag => (
          <span key={tag} className={`tag ${tag}`}>{tag}</span>
        ))}
      </div>
      {task.assignedTo && (
        <div className="task-assignee">@{task.assignedTo}</div>
      )}
    </div>
  );
};

export default TaskCard;