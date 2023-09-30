import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/Profile/Profile";
const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tabs.Navigator>
        <Tabs.Screen name="profile" component={ProfilePage} />
      </Tabs.Navigator>
    </>
  );
};

export default MainNav;
