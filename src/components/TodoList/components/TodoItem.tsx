import { Icons } from "../../Icons";
import { TodoItemEditButton } from "./TodoItemEditButton";
import { Todo } from "src/providers/TodosProviders";
import { useTodos } from "src/hooks/useTodos";

type TodoItemProps = {
  title: Todo["title"];
  id: Todo["id"];
  status: Todo["status"];
  date: Todo["date"];
};

export const TodoItem = ({ title, id, status, date }: TodoItemProps) => {
  const {
    uncompleteTodoById,
    completeTodoById,
    removeTodoById,
  } = useTodos();

  const isComplete = status === "complete";

  return (
    <div
      className={`flex items-center gap-2 p-3 rounded-lg text-2xl w-full 
      ${isComplete ? "bg-green-200 dark:bg-green-400" : "bg-slate-100 dark:bg-slate-300"}`}
    >
      {isComplete ? (
        <Icons.BoxCheck
          className={"cursor-pointer"}
          onClick={() => uncompleteTodoById(id)}
        />
      ) : (
        <Icons.Box
          className={"cursor-pointer"}
          onClick={() => completeTodoById(id)}
        />
      )}
      <div className="flex w-full justify-between items-center">
        <div>
          {isComplete ? (
            <p className="text-base line-through font-bold uppercase dark:text-gray-900">
              {title}
            </p>
          ) : (
            <p className="text-base font-bold uppercase dark:text-gray-900">{title}</p>
          )}
          <p className="text-xs text-gray-600">
            {new Date(date).toLocaleString()}
          </p>
        </div>
        <div className="flex gap-6 text-lg text-slate-800">
          <div
            onClick={() => removeTodoById(id)}
            className="bg-gray-300 dark:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-slate-100 cursor-pointer p-2 rounded"
          >
            <Icons.Trash />
          </div>
          <div>
            <TodoItemEditButton
              id={id}
              title={title}
              status={status}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
