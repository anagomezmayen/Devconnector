import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [thunk];
const store =  createStore(
  rootReducer, 
  {}, 
  compose(
  applyMiddleware(...middleware), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
  );
/**Quitar la linea en produccion
 * 
 * quitar compose() y dejar unicamente applyMiddleware
 * 
 */
export default store;