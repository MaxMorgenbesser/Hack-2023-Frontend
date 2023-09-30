import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/Profile/Profile";
import TrackerPage from "../pages/Tracker/Tracker.page";
const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tabs.Navigator screenOptions={{ headerShown:false}}>
        <Tabs.Screen name="Tracker" component={TrackerPage} />
        <Tabs.Screen name="Get a Screening" component={ProfilePage} />
        <Tabs.Screen name="Cancer fa q" component={ProfilePage} />
        <Tabs.Screen name="Citations" component={ProfilePage} />
      </Tabs.Navigator>
    </>
  );
};

export default MainNav;
