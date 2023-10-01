import Store from "./src/redux/Store";
import { Provider } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import {APP_ID_NOTIFY, APP_KEY} from "@env"

import registerNNPushToken from 'native-notify';


import AppNav from "./src/navigation/AppNav";

export default function App() {
  registerNNPushToken(APP_ID_NOTIFY, APP_KEY);
  return (
    <Provider store={Store}>
      <NavigationContainer>
      <AppNav />
      </NavigationContainer>
    </Provider>
  );
}
