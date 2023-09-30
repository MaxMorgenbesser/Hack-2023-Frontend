import Store from "./src/redux/Store";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';

import AppNav from "./src/navigation/AppNav";

export default function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
      <AppNav />
      </NavigationContainer>
    </Provider>
  );
}
