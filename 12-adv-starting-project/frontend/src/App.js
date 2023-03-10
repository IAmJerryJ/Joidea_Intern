// Challenge / Exercise

// 1. Add five new (dummy) page components (content can be simple <h1> elements)
//    - HomePage
//    - EventsPage
//    - EventDetailPage
//    - NewEventPage
//    - EditEventPage
// 2. Add routing & route definitions for these five pages
//    - / => HomePage
//    - /events => EventsPage
//    - /events/<some-id> => EventDetailPage
//    - /events/new => NewEventPage
//    - /events/<some-id>/edit => EditEventPage
// 3. Add a root layout that adds the <MainNavigation> component above all page components
// 4. Add properly working links to the MainNavigation
// 5. Ensure that the links in MainNavigation receive an "active" class when active
// 6. Output a list of dummy events to the EventsPage
//    Every list item should include a link to the respective EventDetailPage
// 7. Output the ID of the selected event on the EventDetailPage
// BONUS: Add another (nested) layout route that adds the <EventNavigation> component above all /events... page components
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import RootLayout from "./Pages/Root";
import HomePage from "./Pages/HomePage";
import EventsPage, { loader as eventsLoader } from "./Pages/Events";
import EventDetailPage, {
  loader as eventsDetailLoader,
  action as deleteEventAction,
} from "./Pages/EventDetailPage";
import NewEventPage from "./Pages/NewEventPage";
import EditEventPage from "./Pages/EditEventPage";
import EventsRootLayout from "./Pages/EventRoot";
import ErrorPage from "./Pages/Error";
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter([
  {
    //首页
    path: "/",
    //基本外观
    element: <RootLayout />,
    //错误页面
    errorElement: <ErrorPage />,
    //子路由
    children: [
      //index：true，表示是当前路由下的首页，element就是路由导向的页面
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <EventsRootLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            //页面刚加载时，需要加载的数据函数
            loader: eventsLoader,
          },
          {
            path: "new",
            element: <NewEventPage />,
            //页面刚加载时，需要加载的action函数，一些操作，比如http请求等
            action: manipulateEventAction,
          },
          {
            path: ":eventId",
            //路径标识符
            id: "event-detail",
            loader: eventsDetailLoader,
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: manipulateEventAction,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  //使用router，传入上面配置好的路由参数
  return <RouterProvider router={router} />;
}

export default App;
