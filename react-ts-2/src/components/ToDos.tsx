import React,{useContext} from "react";
import ToDoItem from "./ToDoItem";
import classes from "./ToDos.module.css";
import { TodosContext } from "../store/todo-context";


const ToDos: React.FC = () => {
  const todoCtx = useContext(TodosContext);
  return (
    <ul className={classes.todos}>
      {todoCtx.items.map((item) => (
        <ToDoItem
          key={item.id}
          text={item.text}
          removeTodoHandler={todoCtx.removeTodo.bind(null, item.id)}
        />
      ))}
    </ul>
  );
};

export default ToDos;
