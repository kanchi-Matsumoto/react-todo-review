import { useState } from "react";
import TodoForm from "./TodoForm";
import TodoList from "./TodoList";
import type { Todo } from "./types";

type Filter = "all" | "active" | "completed";

type TodoListPageProps = {
  todos: Todo[];
  isLoading: boolean;
  loadError: string;
  onAdd: (text: string) => void;
  onToggle: (id: number) => void;
  onSortByText: () => void;
};

function TodoListPage({
  todos,
  isLoading,
  loadError,
  onAdd,
  onToggle,
  onSortByText,
}: TodoListPageProps) {
  const [filter, setFilter] = useState<Filter>("all");

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.done;
    if (filter === "completed") return todo.done;
    return true;
  });

  const remainingCount = todos.filter((todo) => !todo.done).length;
  const completedCount = todos.filter((todo) => todo.done).length;

  return (
    <main className="todo-app">
      <TodoForm onAdd={onAdd} />

      <div
        className="todo-filters"
        role="group"
        aria-label="ToDoの表示フィルタ"
      >
        <button
          className="todo-filter-button"
          type="button"
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          すべて
        </button>
        <button
          className="todo-filter-button"
          type="button"
          aria-pressed={filter === "active"}
          onClick={() => setFilter("active")}
        >
          未完了
        </button>
        <button
          className="todo-filter-button"
          type="button"
          aria-pressed={filter === "completed"}
          onClick={() => setFilter("completed")}
        >
          完了済み
        </button>
      </div>

      <p className="todo-summary">
        未完了：{remainingCount}件 / 完了済み：{completedCount}件
      </p>

      {isLoading && (
        <p className="todo-status" role="status">
          読み込み中です
        </p>
      )}

      {loadError !== "" && (
        <p className="todo-load-error" role="alert">
          {loadError}
        </p>
      )}

      {!isLoading && loadError === "" && (
        <TodoList todos={filteredTodos} onToggle={onToggle} />
      )}

      <div className="todo-bulk-actions">
        <button
          className="todo-bulk-button"
          type="button"
          onClick={() => {
            todos.forEach((todo) => {
              if (!todo.done) onToggle(todo.id);
            });
          }}
        >
          未完了をすべて完了にする
        </button>
        <button
          className="todo-bulk-button"
          type="button"
          onClick={onSortByText}
        >
          名前順に並べ替える
        </button>
      </div>
    </main>
  );
}

export default TodoListPage;
