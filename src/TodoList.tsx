import TodoItem from "./TodoItem";
import type { Todo } from "./types";

const shownIds: number[] = [];

type TodoListProps = {
  todos: Todo[];
  onToggle: (id: number) => void;
};

function TodoList({ todos, onToggle }: TodoListProps) {
  if (todos.length === 0) {
    return <p className="todo-empty">表示するToDoはありません。</p>;
  }

  todos.forEach((todo) => shownIds.push(todo.id));
  console.log("表示した件数", shownIds.length);

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
