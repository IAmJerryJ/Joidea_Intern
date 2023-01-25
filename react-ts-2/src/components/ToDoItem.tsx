import classes from "./ToDoItem.module.css";

const ToDoItem: React.FC<{ text: string; removeTodoHandler: () => void }> = (
  props
) => {
  return (
    <li className={classes.item} onClick={props.removeTodoHandler}>
      {props.text}
    </li>
  );
};

export default ToDoItem;
