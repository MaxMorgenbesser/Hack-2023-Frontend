import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ScreeningPage from "../pages/Screening/ScreeningPage";
import ProfilePage from "../pages/Profile/Profile";

const Stack = createNativeStackNavigator();

const ScreeningStack = () => {
  return (
    <>
      <Stack.Navigator>
        <Stack.Screen
          name="screening_page"
          component={ScreeningPage}
          options={{ header: () => null }}
        />
        <Stack.Screen name="profile" component={ProfilePage} />
      </Stack.Navigator>
    </>
  );
};

export default ScreeningStack;
