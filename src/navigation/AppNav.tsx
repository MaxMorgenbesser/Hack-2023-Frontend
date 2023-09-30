import { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import AuthNav from "./AuthNav";
import MainNav from "./MainNav";

import { useDispatch } from "react-redux";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { setToken } from "../redux/slices/UserSlice";

const Stack = createNativeStackNavigator();

const AppNav = () => {
  const dispatch = useDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  
  const getToken = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
      navigation.navigate("MainNav");
    }
  };

  useEffect(() => {
    // getToken();
  }, []);
  return (
    <>
      <Stack.Navigator
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Auth" component={AuthNav} />
        <Stack.Screen name="MainNav" component={MainNav} />
      </Stack.Navigator>
    </>
  );
};

export default AppNav;
