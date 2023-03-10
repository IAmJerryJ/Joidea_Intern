import { RouterProvider, createBrowserRouter } from "react-router-dom";

import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import { action as manipulateEventAction } from "./components/EventForm";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkTokenLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    //首页
    path: "/",
    //基本外观
    element: <RootLayout />,
    id: "root",
    //token是验证时，从后端传过来的
    loader: tokenLoader,
    //错误页面
    errorElement: <ErrorPage />,
    //子路由
    children: [
      //index：true，表示是当前路由下的首页，element就是路由导向的页面
      { index: true, element: <HomePage /> },
      {
        path: "events",
        //event的基本界面
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            //页面刚加载时，需要加载的数据函数
            loader: eventsLoader,
          },
          {
            //路径标识符
            path: ":eventId",
            id: "event-detail",
            loader: eventDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                //页面刚加载时，需要加载的action函数，一些操作，比如http请求等
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
                loader: checkTokenLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: manipulateEventAction,
            loader: checkTokenLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  //使用router，传入上面配置好的路由参数
  return <RouterProvider router={router} />;
}

export default App;
