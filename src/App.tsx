import "./App.css";
import { TodoList } from "./components/TodoList";
import { AddTodoButton } from "./components/AddTodoButton";
import { TodosProviders } from "./providers/TodosProviders";
import { TodoFilterSelect } from "./components/TodoFilterSelect";
import { TodoPriority } from "./components/TodoPriority";

function App() {
  return (
    <>
      <TodosProviders>
        <div className="flex justify-center min-h-screen w-screen">
          <div className="flex flex-col w-full max-w-[700px]">
            <main className="w-full">
              <div className="flex flex-col justify-center items-center gap-16">
                <h1 className="uppercase dark:text-slate-100">Todo list</h1>
                <div className="flex justify-between mobile:px-2 w-full container">
                  <AddTodoButton />
                  <TodoFilterSelect />
                  <TodoPriority />
                </div>
              </div>
            </main>
            <TodoList />
          </div>
        </div>
      </TodosProviders>
    </>
  );
}

export default App;
