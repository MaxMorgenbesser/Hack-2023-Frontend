import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ProfilePage from "../pages/Profile/Profile";
import TrackingPage from "../pages/Tracking/Tracking";
import CarcinogenPage from "../pages/CarcinoPage/CarcinogenPage";
import CitationPage from "../pages/CitationPage/CitationPage";
const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <>
      <Tabs.Navigator>
        <Tabs.Screen name="Get a Screening" component={ProfilePage} />
        <Tabs.Screen name="Carcinogens" component={CarcinogenPage} />
        <Tabs.Screen name="Tracking" component={TrackingPage} />
        <Tabs.Screen name="Citations" component={CitationPage} />
      </Tabs.Navigator>
    </>
  );
};

export default MainNav;
