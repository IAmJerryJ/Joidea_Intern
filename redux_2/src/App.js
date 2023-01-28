import { useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Notification from "./components/UI/Notification";
import { sendCartData, fetchCartData } from "./store/cart-action";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector((state) => state.cart);
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    //第一次渲染提取database中购物车数据，dependecy是dispatch，因为dispatch来自第三方库，可能会有所改变
    dispatch(fetchCartData());
  }, [dispatch]);

  useEffect(() => {
    //第一次渲染不发送购物车内数据，只提取
    if (isInitial) {
      isInitial = false;
      return;
    }

    //因为第一次渲染会进入上面的useEffect，导致fetch数据，进而cart里面内容变化，向database发送数据,changed在cart slice定义
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {/*顶部提示是否发送成功组件*/}
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      {/*项目顶部组件*/}
      <Layout>
        {/*是否渲染购物车*/}
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
