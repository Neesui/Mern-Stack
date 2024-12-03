import "./App.css";
import MyRoute from "./MyRoute";
// import { legacy_createStore } from "redux"; //it helps compiler to know that any reducer is a reducer
import { Provider } from "react-redux"; //it helps to provide data from reducer to any components.
// import cartReducer from "./redux/reducers/CartReducer";
import store from "./store";
function App() {
  // const store = legacy_createStore(cartReducer);
  return (
    <>
      <Provider store={store}>
        <MyRoute />
      </Provider>
    </>
  );
}

export default App;
