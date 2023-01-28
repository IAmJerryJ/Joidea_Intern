//从slice中提取action进行使用
import { cartActions } from "./cart-slice";
import { uiActions } from "./ui-slice";

export const fetchCartData = () => {
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
