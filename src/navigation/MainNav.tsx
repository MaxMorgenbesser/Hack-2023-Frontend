import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/Profile/Profile";
const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tabs.Navigator>
        <Tabs.Screen name="Get a Screening" component={ProfilePage} />
        <Tabs.Screen name="Cancer f&q" component={ProfilePage} />
        <Tabs.Screen name="Citations" component={ProfilePage} />
        <Tabs.Screen name="Tracking" component={ProfilePage} />

      </Tabs.Navigator>
    </>
  );
};

export default MainNav;
