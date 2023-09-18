import { useContext, useEffect } from "react";
import { Todo, TodosContext } from "src/providers/TodosProviders";
import { generateRandomHash } from "src/utils/generateRandomHash";

type TodoPriority = "all" | "complete" | "incomplete";

type NewTodo = Omit<Todo, "date" | "id">;

type TodoFilter = "all" | "complete" | "incomplete";

export const useTodos = (
  {
    refreshListOnTodoChange,
  }: {
    refreshListOnTodoChange?: boolean;
  } = { refreshListOnTodoChange: false }
) => {
  const {
    todos,
    setTodos,
    filtredTodos,
    setFiltredTodos,
    filter,
    setFilter,
    priority,
    setPriority,
  } = useContext(TodosContext);

  useEffect(() => {
    if (refreshListOnTodoChange) {
      filterTodos(filter);
      priorityTodos(priority);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const filterTodos = (todoFilter: TodoFilter) => {
    setFilter(todoFilter);

    if (todoFilter === "all") {
      return setFiltredTodos(todos);
    }

    const filtred = todos.filter((todo) => todo.status === todoFilter);

    return setFiltredTodos(filtred);
  };

  const priorityTodos = (TodoPriority: TodoPriority) => {
    setPriority(TodoPriority);

    const filteredTodos = [...todos].sort((a, b) => {
      if (TodoPriority === "complete") {
        if (a.status === "incomplete" && b.status === "complete") return 1
        if (a.status === "complete" && b.status === "incomplete") return -1
      }
      if (TodoPriority === "incomplete") {
        if (a.status === "complete" && b.status === "incomplete") return 1
        if (a.status === "incomplete" && b.status === "complete") return -1
      }
      
      return a.date - b.date
    });

    setFiltredTodos(filteredTodos);
  };

  const addTodo = (newTodoData: NewTodo) => {
    const newTodo: Todo = {
      ...newTodoData,
      id: generateRandomHash(),
      date: new Date().getTime(),
    };

    setTodos((prevTodos: any) => [...prevTodos, newTodo]);
  };

  const removeTodoById = (id: Todo["id"]) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const uncompleteTodoById = (id: Todo["id"]) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: "incomplete" };
        }

        return todo;
      })
    );
  };

  const completeTodoById = (id: Todo["id"]) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, status: "complete" };
        }

        return todo;
      })
    );
  };

  const updateTodoById = (id: Todo["id"], newData: NewTodo) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, ...newData };
        }

        return todo;
      })
    );
  };

  return {
    todos,
    priorityTodos,
    filtredTodos,
    setFilter,
    filterTodos,
    addTodo,
    removeTodoById,
    uncompleteTodoById,
    completeTodoById,
    updateTodoById,
  };
};
