import React, { useState } from "react";
import "../App.css";
import { TodoType } from "../App";
import useStore from "../store";

type PropsType = {
  Todo: TodoType;
  // the bellow props was for component drilling .
  // toggleTodo: (id: number) => void;
  // deleteTodo: (id: number) => void;
  // updateTodo: (id: number, title: string) => void;
};

const Todo = ({ Todo }: PropsType) => {
  const [editing, setEditing] = useState(false);
  const updateTodo = useStore((s) => s.updateTodo);
  const deleteTodo = useStore((s) => s.deleteTodo);
  const toggleTodo = useStore((s) => s.toggleTodo);

  const onUpdateDone = () => {
    setEditing(false);
  };

  const handleEditing = () => {
    setEditing(true);
  };

  const completedStyle = {
    fontStyle: "italic",
    // color: "#595959",
    opacity: 0.4,
    textDecoration: "line-through",
  };

  return (
    <div className="custom-list">
      <li className="item">
        <div
          onDoubleClick={handleEditing}
          style={editing ? { display: "none" } : { display: "" }}
        >
          <button onClick={() => deleteTodo(Todo.id)}>Delete</button>
          <button onClick={handleEditing}>Edit</button>

          <input
            type="checkbox"
            className="checkbox"
            checked={Todo.status}
            onChange={() => toggleTodo(Todo.id)}
          />

          <span style={Todo.status ? completedStyle : undefined}>
            {Todo.title}
          </span>
        </div>
        <input
          type="text"
          value={Todo.title}
          style={editing ? { display: "" } : { display: "none" }}
          className="textInput"
          onChange={(e) => {
            updateTodo(Todo.id, e.currentTarget.value);
          }}
          // onKeyDown={(e) => onUpdateDone(e)}
        />
        <button
          onClick={() => onUpdateDone()}
          style={editing ? { display: "" } : { display: "none" }}
        >
          Done
        </button>
      </li>
    </div>
  );
};

export default Todo;
