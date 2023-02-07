import { useState } from "react";
import "./App.css";
import Todo from "./components/Todo";
import useStore from "./store";

export type TodoType = {
  id: number;
  title: string;
  status: boolean; // true is completed
};

export type TodoList = TodoType[];

function App() {
  const [todoTitle, setTodoTitle] = useState<string>("");
  const todos = useStore((s) => s.todos);
  const addTodo = useStore((s) => s.addTodo);

  const submit = () => {
    const newTodo: TodoType = {
      id: Math.random() * 2.5,
      title: todoTitle,
      status: false,
    };

    addTodo(newTodo);
  };

  return (
    <div className="App">
      <input
        type="text"
        // onKeyDown={(e) => onKeyDownHandler(e)}
        onChange={(e: React.FormEvent<HTMLInputElement>) =>
          setTodoTitle(e.currentTarget.value)
        }
        className="input"
      />
      <button onClick={submit}>submit</button>
      <div className="custom-list">
        <ul>
          {todos?.map((todo, i) => {
            return <Todo key={i} Todo={todo} />;
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
