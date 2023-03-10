import { useRouteError } from "react-router-dom";

import PageContent from "../components/PageContent";

function ErrorPage() {
  const error = useRouteError();

  //默认报错信息
  let title = "An error occurred!";
  let message = "Something went wrong!";

  //其余，系统有messag的报错，status都是500
  if (error.status === 500) {
    console.log(error);
    message = error.data.message;
  }

  //无法获取status
  if (error.status === 404) {
    title = "Not found!";
    message = "Could not find resource or page.";
  }

  return (
    <>
      {/*报错界面*/}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
