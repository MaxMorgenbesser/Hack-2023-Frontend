import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/Auth/Home.page";
import Pin from "../pages/Auth/Pin";
const Stack = createNativeStackNavigator();

const AuthNav = () => {
  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={Home}  />
        <Stack.Screen name="Pin" component={Pin} />
      </Stack.Navigator>
    </>
  );
};

export default AuthNav;
