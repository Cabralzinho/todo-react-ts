import { useTodos } from "@/hooks/useTodos";

export const TodoFilterSelect = () => {
  const { filterTodos } = useTodos();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const filterChange = e.target.value;
    if (
      filterChange === "all" ||
      filterChange === "incomplete" ||
      filterChange === "complete"
    ) {
      filterTodos(filterChange);
    }
  };

  return (
    <select
      onChange={(e) => {
        handleFilterChange(e);
      }}
      className="w-32 rounded-md bg-indigo-300 dark:bg-indigo-200 hover:bg-indigo-200 dark:hover:bg-indigo-300 border-2 border-slate-700 dark:border-slate-400 font-bold cursor-pointer text-slate-900"
      id="status"
    >
      <option className="font-bold" value="all">
        All
      </option>
      <option className="font-bold" value="incomplete">
        Incomplete
      </option>
      <option className="font-bold" value="complete">
        Complete
      </option>
    </select>
  );
};
