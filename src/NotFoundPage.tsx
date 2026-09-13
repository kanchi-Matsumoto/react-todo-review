import { Link } from "react-router";

function NotFoundPage() {
  return (
    <main className="todo-app">
      <h2 className="page-title">ページが見つかりません</h2>
      <p>URLが間違っているか、削除されたページの可能性があります。</p>
      <Link className="todo-back-link" to="/">
        ToDo一覧へ戻る
      </Link>
    </main>
  );
}

export default NotFoundPage;
