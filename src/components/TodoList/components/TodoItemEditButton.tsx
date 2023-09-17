import { useEffect, useState } from "react";
import { Icons } from "../../Icons";
import ReactDOM from "react-dom";
import { Todo } from "@/providers/TodosProviders";
import { useTodos } from "@/hooks/useTodos";

type TodoItemEditButtonProp = {
  id: Todo["id"];
  title: Todo["title"];
  status: Todo["status"];
};

export const TodoItemEditButton = ({
  id,
  title: currentTitle,
  status: currentStatus,
}: TodoItemEditButtonProp) => {
  const [windowIsOpen, setWindowIsOpen] = useState(false);
  const [title, setTitle] = useState(currentTitle);
  const [status, setStatus] = useState(currentStatus);

  const { updateTodoById } = useTodos();

  const handleKeyPress = (e: any) => {
    if (windowIsOpen && "Enter" === e.key) {
      updateTodoById(id, { title, status });
      setWindowIsOpen(false);
    }
  };  

  useEffect(() => {
    window.addEventListener("keypress", handleKeyPress);

    return () => {
      window.removeEventListener("keypress", handleKeyPress);
    };
  }, [title]);

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const statusChange = e.target.value;

    if (statusChange === "incomplete" || statusChange === "complete") {
      setStatus(statusChange);
    }
  };

  return (
    <>
      <div
        onClick={() => setWindowIsOpen(true)}
        className="bg-gray-300 dark:bg-gray-400 hover:bg-gray-400 dark:hover:bg-gray-500 hover:text-slate-100 cursor-pointer p-2 rounded"
      >
        <Icons.Pencil />
      </div>
      {windowIsOpen &&
        ReactDOM.createPortal(
          <div className="flex fixed flex-col justify-center w-screen h-screen bg-black/30 items-center z-[999]">
            <div className="bg-indigo-300 dark:bg-indigo-800 p-10 rounded-2xl shadow-md  dark:shadow-indigo-600">
              <div className="relative flex justify-end z-[999] text-4xl">
                <Icons.XMark
                  className={"cursor-pointer absolute dark:text-slate-200"}
                  onClick={() => setWindowIsOpen(false)}
                />
              </div>
              <form className="flex flex-col w-96 gap-4">
                <h4 className="dark:text-white">Edit Todo</h4>
                <label
                  className="flex flex-col gap-1 text-lg text-gray-800 dark:text-zinc-50 font-bold"
                  htmlFor="title"
                >
                  Title
                  <input
                    className="rounded h-10 px-2 uppercase dark:text-slate-950"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                  />
                </label>
                <label
                  className="flex flex-col gap-1 text-lg text-gray-800 dark:text-zinc-50 font-bold"
                  htmlFor="type"
                >
                  Status
                  <select
                    className="rounded h-10 dark:text-slate-950"
                    defaultValue={status}
                    onChange={(e) => handleStatusChange(e)}
                    id="type"
                  >
                    <option className="font-bold" value="incomplete">
                      Incomplete
                    </option>
                    <option className="font-bold" value="complete">
                      Complete
                    </option>
                  </select>
                </label>
                <div className="flex gap-4 flex-col">
                  <button
                    type="button"
                    onClick={() => {
                      updateTodoById(id, { title, status });
                      setWindowIsOpen(false);
                    }}
                    className="bg-blue-300 dark:bg-blue-700 hover:bg-blue-500 dark:hover:bg-blue-600 dark:text-white shadow-sm shadow-slate-950 p-2 rounded-md font-bold w-full"
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={() => setWindowIsOpen(false)}
                    className="dark:text-white p-2 rounded-md font-bold w-full"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.querySelector("#window") as Element
        )}
    </>
  );
};
