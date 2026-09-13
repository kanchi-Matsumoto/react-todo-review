import { useState, type FormEvent } from "react";

type TodoFormProps = {
  onAdd: (text: string) => void;
};

function TodoForm({ onAdd }: TodoFormProps) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const text = input.trim();

    if (text === "") {
      setError("ToDoを入力してください");
      return;
    }

    onAdd(text);
    setInput("");
    setError("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="todo-form-label" htmlFor="new-todo">
        新しいToDo
      </label>
      <input
        id="new-todo"
        type="text"
        value={input}
        onChange={(event) => setInput(event.target.value)}
        aria-describedby={error === "" ? undefined : "todo-error"}
        className="todo-input"
      />
      <button className="todo-add-button" type="submit">
        追加
      </button>

      {error !== "" && (
        <p className="todo-error" id="todo-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}

export default TodoForm;
