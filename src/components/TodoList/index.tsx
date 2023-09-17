import { useTodos } from "@/hooks/useTodos"
import { TodoItem } from "./components/TodoItem"

export const TodoList = () => {
  const {filtredTodos} = useTodos({refreshListOnTodoChange: true})

  return (
    <section className="flex justify-center items-center mt-4">
      <div className="flex flex-col bg-gray-300 dark:bg-gray-500 p-2 items-center justify-center w-full mobile:w-full  rounded-xl gap-4 container">
        {filtredTodos.length === 0 && <h6 className="text-center dark:text-white">Sem nenhuma tarefa</h6>}
        {filtredTodos.map(todo =>
          <TodoItem
            key={todo.id}
            {...todo}
          />)}
      </div>
    </section>
  )
}