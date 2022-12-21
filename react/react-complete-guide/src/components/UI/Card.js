import "./Card.css";

const Card = (props) => {
  // To make the element has both itself class and 'Card' class
  const classes = "card " + props.className;
  return <div className={classes}>{props.children}</div>;
}

export default Card;
