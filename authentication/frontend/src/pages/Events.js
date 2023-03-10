import { Suspense } from "react";
import { useLoaderData, json, defer, Await } from "react-router-dom";

import EventsList from "../components/EventsList";

function EventsPage() {
  const { events } = useLoaderData();

  return (
    //暂停等待组件，显示fallback里的内容，当加载还没完成时
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      {/*Await用于延迟数据加载*/}
      <Await resolve={events}>
        {/*先有events数据，在渲染events*/}
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch("http://localhost:8080/eventss");
  if (!response.ok) {
    // return { isError: true, message: "Could not fetch events." };
    // throw new Response(JSON.stringify({ message: "Could not fetch events." }), {
    //   status: 500,
    // });

    //router捕获错误时，需要捕获一个json格式数据
    throw json(
      { message: "Could not fetch events." },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  //defer使浏览器不用等待loadEvents渲染完，才渲染其他DOM，html
  return defer({
    events: loadEvents(),
  });
}
