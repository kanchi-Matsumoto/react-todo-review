export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export type ApiTodo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
