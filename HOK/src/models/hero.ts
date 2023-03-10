import { Effect, Reducer, request, Subscription } from 'umi';

export interface HeroProps {
  ename: number;
  cname: string;
  title: string;
  new_type: number;
  hero_type: number;
  skin_name: string;
}

export interface HeroModelState {
  name: string;
  heros: HeroProps[];
  filterKey: number;
  freeheros: HeroProps[];
  itemHover: number;
}

export interface HeroModelType {
  namespace: 'hero';
  state: HeroModelState;
  effects: {
    query: Effect;
    fetch: Effect;
  };
  reducers: {
    save: Reducer<HeroModelState>;
  };
  subscriptions: { setup: Subscription };
}

const HeroModel: HeroModelType = {
  namespace: 'hero',

  state: {
    name: 'hero',
    heros: [],
    filterKey: 0,
    freeheros: [],
    itemHover: 0,
  },

  effects: {
    *query({ payload }, { call, put }) {},
    //function type: any
    *fetch({ type, payload }, { put, call, select }): any {
      const data = yield request('/api/herolist.json');
      const freeheros = yield request('/apimock/freeheros.json', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
          number: 10,
        }),
      });
      yield put({
        type: 'save',
        payload: {
          heros: data,
          freeheros: freeheros,
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
        if (pathname === '/hero') {
          dispatch({
            type: 'fetch',
          });
        }
      });
    },
  },
};

export default HeroModel;
