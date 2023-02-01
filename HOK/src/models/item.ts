import { Effect, Reducer, request, Subscription } from 'umi';

export interface ItemModelState {
  name: string;
  items: [];
}

export interface ItemModelType {
  namespace: 'item';
  state: ItemModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<ItemModelState>;
  };
  subscriptions: { setup: Subscription };
}

const ItemModel: ItemModelType = {
  namespace: 'item',

  state: {
    name: 'item',
    items: [],
  },

  effects: {
    *query({ payload }, { call, put }) {},
    *fetch({ type, payload }, { put, call, select }) {
      const data = yield request('/api/itemlist.json');
      yield put({
        type: 'save',
        payload: {
          items: data,
        },
      });
    },
  },
  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, query }) => {
        if (pathname === '/item') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default ItemModel;
