import { NavLink, Form, useRouteLoaderData } from "react-router-dom";

import classes from "./MainNavigation.module.css";
import NewsletterSignup from "./NewsletterSignup";

function MainNavigation() {
  //Router组件提供的方法，可以直接使用对应路由下的loader方法
  const token = useRouteLoaderData("root");
  const urlArray = [
    { url: "/", text: "Home", end: true },
    { url: "/events", text: "Events" },
    { url: "/newsletter", text: "Newsletter" },
    // { url: "/auth?mode=login"  , text: "Authentication" },
  ];
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          {urlArray.map(({ url, text, end }) => {
            return (
              <li key={url}>
                <NavLink
                  to={url}
                  className={({ isActive }) =>
                    isActive ? classes.active : undefined
                  }
                  end={end}
                >
                  {text}
                </NavLink>
              </li>
            );
          })}

          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          {token && (
            <li>
              {/*Router Form的独特写法，可以指向路由下的action */}
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
