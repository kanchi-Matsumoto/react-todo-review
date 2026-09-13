import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router";
import "./App.css";
import AboutPage from "./AboutPage";
import NotFoundPage from "./NotFoundPage";
import TodoDetailPage from "./TodoDetailPage";
import TodoListPage from "./TodoListPage";
import type { ApiTodo, Todo } from "./types";

const TODOS_URL = "https://jsonplaceholder.typicode.com/todos?_limit=8";

const toTodo = (apiTodo: ApiTodo): Todo => ({
  id: apiTodo.id,
  text: apiTodo.title,
  done: apiTodo.completed,
});

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch(TODOS_URL);

        if (!response.ok) {
          throw new Error("ToDoの取得に失敗しました");
        }

        const data: ApiTodo[] = await response.json();
        setTodos(data.map(toTodo));
      } catch (error) {
        if (error instanceof Error) {
          setLoadError(error.message);
        } else {
          setLoadError("ToDoの取得に失敗しました");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAdd = (text: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      done: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  };

  const handleToggle = (id: number) => {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <h1 className="app-title">React ToDo</h1>
        <nav className="app-nav">
          <Link className="app-nav-link" to="/">
            ToDo一覧
          </Link>
          <Link className="app-nav-link" to="/about">
            このアプリについて
          </Link>
        </nav>
      </header>

      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              todos={todos}
              isLoading={isLoading}
              loadError={loadError}
              onAdd={handleAdd}
              onToggle={handleToggle}
            />
          }
        />
        <Route
          path="/todos/:id"
          element={
            <TodoDetailPage
              todos={todos}
              isLoading={isLoading}
              onToggle={handleToggle}
            />
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
