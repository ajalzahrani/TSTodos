import { create } from "zustand";
import produce from "immer";

const saveTodos = (todos: TodoList) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = (): TodoList | [] => {
  const todos = localStorage.getItem("todos");
  console.log("loaded todos: ", todos);

  if (todos !== null) {
    const parsedTodos = JSON.parse(todos);
    return parsedTodos;
  } else {
    return [];
  }
};

export type TodoType = {
  id: number;
  title: string;
  status: boolean; // true is completed
};

export type TodoList = TodoType[];

type StoreType = {
  todos: TodoList | null;
  //   setTodos: (todos: TodoList | null) => void;
  addTodo: (todoTitle: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
};

type State = {
  todos: TodoList | [];
};

type Action = {
  addTodo: (todo: TodoType) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
};

// const initialState: State = {
//   todos: loadTodos(),
// };

const useStore = create<State & Action>()((set) => ({
  // ...initialState, // set the initial state
  todos: [],
  addTodo: (todo) =>
    set(
      produce((draft) => {
        draft.todos?.push(todo);
        saveTodos(draft.todos);
      })
    ),
  toggleTodo: (id) =>
    set(
      produce((draft) => {
        let indexOf = -1;
        for (let i = 0; i < draft.todos.length; i++) {
          if (draft.todos[i].id === id) {
            indexOf = i;
          }
        }
        draft.todos[indexOf].status = !draft.todos[indexOf].status;
        saveTodos(draft.todos);
      })
    ),
  deleteTodo: (id) =>
    set(
      produce((draft) => {
        const filteredTodos = draft.todos.filter(
          (todo: TodoType) => todo.id !== id
        );
        draft.todos = filteredTodos;
        saveTodos(draft.todos);
      })
    ),
  updateTodo: (id, title) =>
    set(
      produce((draft) => {
        let indexOf = -1;
        for (let i = 0; i < draft.todos.length; i++) {
          if (draft.todos[i].id === id) {
            indexOf = i;
          }
        }
        draft.todos[indexOf].title = title;
        saveTodos(draft.todos);
      })
    ),
}));

useStore.setState(() => ({ todos: loadTodos() }));

export default useStore;
