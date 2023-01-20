import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  const navigationHandler = () => {
    navigate("/products");
  };

  return (
    <>
      <h1>Home Page</h1>
      <p>
        Go to the <Link to="/products">Products Page</Link>
      </p>
      <button onClick={navigationHandler}>Products</button>
    </>
  );
}

export default HomePage;
