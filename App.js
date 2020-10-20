import React from "react";
import Route from "./routes/index.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persister, store } from "./redux";

console.disableYellowBox = true;

class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persister}>
          <Route />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;