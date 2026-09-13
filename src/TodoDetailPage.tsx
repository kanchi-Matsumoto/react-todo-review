import { Link, useParams } from "react-router";
import type { Todo } from "./types";

type TodoDetailPageProps = {
  todos: Todo[];
  isLoading: boolean;
  onToggle: (id: number) => void;
};

function TodoDetailPage({ todos, isLoading, onToggle }: TodoDetailPageProps) {
  const { id } = useParams();

  if (isLoading) {
    return (
      <main className="todo-app">
        <p className="todo-status" role="status">
          読み込み中です
        </p>
      </main>
    );
  }

  const todo = todos.find((item) => item.id === Number(id));

  if (todo === undefined) {
    return (
      <main className="todo-app">
        <h2 className="page-title">ToDoが見つかりません</h2>
        <p>URLのidを確認してください。</p>
        <Link className="todo-back-link" to="/">
          ToDo一覧へ戻る
        </Link>
      </main>
    );
  }

  return (
    <main className="todo-app">
      <h2 className="page-title">{todo.text}</h2>

      <div className="todo-detail">
        <p className="todo-detail-meta">ID：{todo.id}</p>
        <p className="todo-detail-meta">
          状態：{todo.done ? "完了済み" : "未完了"}
        </p>

        <label className="todo-item-label">
          <input
            className="todo-checkbox"
            type="checkbox"
            checked={todo.done}
            onChange={() => onToggle(todo.id)}
          />
          <span className="todo-text">この画面でも切り替えられます</span>
        </label>
      </div>

      <Link className="todo-back-link" to="/">
        ToDo一覧へ戻る
      </Link>
    </main>
  );
}

export default TodoDetailPage;
