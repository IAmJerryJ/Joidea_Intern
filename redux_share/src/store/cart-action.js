//从slice中提取action进行使用
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
  //因为fetch函数是个异步操作，所以需要在函数前加上async

  //redux thunk使我们可以在action中返回函数，而不只是一个对象。当redux toolkit发现返回的是一个函数时，
  //他会帮助执行这个函数。当返回的函数中(inner function)接受的是dispatch参数时，我们就可以在返回函数中使用dispatch
  return async (dispatch) => {
    const fetchRequest = async () => {
      const response = await fetch(
        "https://reduxcart-dbb74-default-rtdb.firebaseio.com/cart.json"
      );

      //回应失败错误，比如url错误，404错误
      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }

      const data = await response.json();

      return data;
    };

    try {
      //要用await，因为fetchRequest是个异步函数
      const cartData = await fetchRequest();
      //因为是第一次提取，所以要直接替换购物车的内容
      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (error) {
      //提取过程中有任何错误，catch error，比如类型错误等等
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Fetching cart data failed!",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    //传输过程中...
    dispatch(
      uiActions.showNotification({
        status: "pending",
        title: "Sending...",
        message: "Is sending cart data...",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://reduxcart-dbb74-default-rtdb.firebaseio.com/cart.json",
        {
          //PUT是请求增加方法
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Sending cart data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully sending cart data!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      );
    }
  };
};
