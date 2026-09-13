import { Link } from "react-router";

type TodoItemProps = {
  id: number;
  text: string;
  done: boolean;
  onToggle: (id: number) => void;
};

function TodoItem({ id, text, done, onToggle }: TodoItemProps) {
  return (
    <article className={done ? "todo-card todo-card--done" : "todo-card"}>
      <label className="todo-item-label">
        <input
          className="todo-checkbox"
          type="checkbox"
          checked={done}
          onChange={() => onToggle(id)}
        />
        <span className={done ? "todo-text todo-text--done" : "todo-text"}>
          {text}
        </span>
      </label>
      <Link className="todo-item-link" to={`/todos/${id}`}>
        詳細
      </Link>
    </article>
  );
}

export default TodoItem;
