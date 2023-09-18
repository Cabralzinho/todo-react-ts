import { useTodos } from "@/hooks/useTodos";

export const TodoPriority = () => {
  const { sortTodos } = useTodos();

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const priority = e.target.value;
    if (
      priority === "date" ||
      priority === "incomplete" ||
      priority === "complete"
    ) {
      sortTodos(priority);
    }
  };

  return (
    <>
      <label htmlFor="">Order to:</label>
      <select
        onChange={(e) => {
          handlePriorityChange(e);
        }}
        className="w-32 rounded-md bg-indigo-300 dark:bg-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-300 border-2 border-slate-700 dark:border-slate-400 font-bold cursor-pointer text-slate-900"
        id="status"
      >
        <option value="date">Date</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </select>
    </>
  );
};
