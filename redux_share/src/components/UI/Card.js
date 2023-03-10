import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <section
      //拼接className，如果props中有新的className就添加
      className={`${classes.card} ${props.className ? props.className : ""}`}
    >
      {props.children}
    </section>
  );
};

export default Card;
