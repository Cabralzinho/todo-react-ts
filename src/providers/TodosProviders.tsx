import React, { createContext, useState } from "react"

export type Todo = {
  id: string
  title: string
  status: "complete" | "incomplete"
  date: number
}

type TodosProvidersProp = {
  children: React.ReactNode
}

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filtredTodos: Todo[];
  setFiltredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filter: TodoFilter;
  setFilter: React.Dispatch<React.SetStateAction<TodoFilter>>;
}

type TodoFilter = Todo["status"] | "all"

export const TodosContext = createContext<TodosContextType>({} as TodosContextType);

const getTodosOnLocalStorage = (): Todo[] => {
  const todos = localStorage.getItem("todos");

  if (!todos) {
    return [];
  }

  return JSON.parse(todos);
};

export const TodosProviders = ({children}: TodosProvidersProp) => {
  const [todos, setTodos] = useState<Todo[]>(getTodosOnLocalStorage())
  const [filtredTodos, setFiltredTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<TodoFilter>("all");

  return (
      <TodosContext.Provider value={{todos, setTodos, filtredTodos, setFiltredTodos, filter, setFilter}}>
        {children}
      </TodosContext.Provider>
    )
}