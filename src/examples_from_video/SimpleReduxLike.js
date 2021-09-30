//Reducer - не изменяет стейт, а возвращает новый
const updateState = (state, action) => {
    switch (action.type) {
        case 'PLUS':
            return { ...state,
                count: state.count + action.amount }
        case 'MINUS':
            return {
                ...state,
                count : state.count - action.amount}
        default:
            return state;
    }
}

class Store {
    constructor(updateState, state) {
        this._state = state;
        this._updateState = updateState;
        this._callbacks = [];
    }

    getState = () => this._state;

    dispatch = (action) => {
        this._state = this._updateState(this._state, action);
        this._callbacks.forEach(cb => cb());
    }

    subscribe = (callback) => {
        this._callbacks.push(callback);
    }
}

const initialState = {
    count : 0,
    name: 'user'
}

const store = new Store(updateState, initialState);
store.subscribe(() => console.log(store.getState()));

const plusAction = (amount) => ({type: 'PLUS', amount: amount});
const minusAction = (amount) => ({type: 'MINUS', amount: amount});

const { dispatch } = store;

const bindActionCreator = (creator, dispatch) => (...args) => {
    dispatch(creator(...args));
}

const plus = bindActionCreator(plusAction, dispatch);
const minus = bindActionCreator(minusAction, dispatch);

plus(3);

minus(5);

plus(7);

plus(3);

dispatch({});