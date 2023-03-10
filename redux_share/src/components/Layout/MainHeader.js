import CartButton from "../Cart/CartButton";
import classes from "./MainHeader.module.css";

const MainHeader = () => {
  return (
    <header className={classes.header}>
      <h1>ReduxCart</h1>
      <nav>
        {/*为什么用ul？ */}

        <CartButton />
      </nav>
    </header>
  );
};

export default MainHeader;
