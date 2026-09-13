function AboutPage() {
  return (
    <main className="todo-app">
      <h2 className="page-title">このアプリについて</h2>
      <p>
        JSONPlaceholderから取得したToDoを表示し、追加と完了の切り替えができる練習用のアプリです。
      </p>
      <p>追加したToDoは、ページを再読み込みすると消えます。</p>
    </main>
  );
}

export default AboutPage;
