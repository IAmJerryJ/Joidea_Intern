import { useRef, useContext } from "react";
import { TodosContext } from "../store/todo-context";
import classes from "./NewToDo.module.css";

const NewToDo: React.FC = () => {
  const todoCtx = useContext(TodosContext);
  const inputRef = useRef<HTMLInputElement>(null);

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    const enteredText = inputRef.current!.value;

    if (enteredText.trim().length === 0) {
      return;
    }

    todoCtx.addTodo(enteredText);
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <label htmlFor="text">ToDo Text</label>
      <input type="text" id="text" ref={inputRef} />
      <button>Add to do</button>
    </form>
  );
};

export default NewToDo;
