import TodosContextProvider from "./store/todo-context";

import NewToDo from "./components/NewToDo";
import ToDos from "./components/ToDos";

function App() {
  return (
    <TodosContextProvider>
      <NewToDo />
      <ToDos />
    </TodosContextProvider>
  );
}

export default App;
