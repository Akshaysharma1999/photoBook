import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './services/store/reducers';
import { loadState, saveState } from './utils/sessionPersistence';
import throttle from 'lodash/throttle';

const persistedState = loadState();

const store = createStore(
  rootReducer,
  persistedState,
  composeWithDevTools(applyMiddleware(reduxThunk)),
);

store.subscribe(
  throttle(() => {
    let save = { ...store.getState() };    
    saveState({ ...save });
  }, 1000),
);

export default function configureStore() {
  return store;
}