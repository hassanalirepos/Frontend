type Task = {
    id: number;
    title: string;
    color: string;
    completed: boolean;
  };
  
  interface TaskCardProps {
    task: Task;
    onToggleComplete: (id: number) => void;
    onDelete: (id: number) => void;
  }
  
  export default function TaskCard({ task, onToggleComplete, onDelete }: TaskCardProps) {
    return (
      <div className={`task-card ${task.color}`}>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggleComplete(task.id)}
        />
        <span>{task.title}</span>
        <button onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    );
  }
  