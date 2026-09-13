import TodoItem from "./TodoItem";
import type { Todo } from "./types";

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
};

function TodoList({ todos, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-empty">表示するToDoはありません。</p>;
  }

  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          id={todo.id}
          text={todo.text}
          done={todo.done}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
