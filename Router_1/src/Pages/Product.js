import { NavLink } from "react-router-dom";
import classes from "./Product.module.css";

function ProductsPage() {
  const PRODUCTS = [
    { id: "p1", title: "Product 1" },
    { id: "p2", title: "Product 2" },
    { id: "p3", title: "Product 3" },
  ];

  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {PRODUCTS.map((prod) => (
          <li key={prod.id}>
            <NavLink
              to={`/products/ ${prod.id}`}
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              {prod.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ProductsPage;
