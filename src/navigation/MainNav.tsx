import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/Profile/Profile";
import ScreeningPage from "../pages/Screening/ScreeningPage";
import ScreeningStack from "./ScreeningStack";

import TrackerPage from "../pages/Tracker/Tracker.page";

import CarcinogenPage from "../pages/CarcinoPage/CarcinogenPage";
import CitationPage from "../pages/CitationPage/CitationPage";

const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tabs.Navigator screenOptions={{ headerShown:false}}>
        <Tabs.Screen name="Tracker" component={TrackerPage} />
        <Tabs.Screen name="Get a Screening" component={ScreeningStack} />

        <Tabs.Screen name="Carcinogens" component={CarcinogenPage} />
      
        <Tabs.Screen name="Citations" component={CitationPage} />
      </Tabs.Navigator>
    </>
  );
};

export default MainNav;
