import React from "react";
import {
  createBottomTabNavigator, 
} from "@react-navigation/bottom-tabs";
import { View, Image } from "react-native";
import TrackerPage from "../pages/Tracker/Tracker.page";
import ScreeningStack from "./ScreeningStack";
import CarcinogenPage from "../pages/CarcinoPage/CarcinogenPage";
import CitationPage from "../pages/CitationPage/CitationPage";

type TabNavigatorParams = {
  TrackerPage: undefined;
  ScreeningStack: undefined;
  CarcinogenPage: undefined;
  CitationPage: undefined;

};
const Tabs = createBottomTabNavigator();

const MainNav = () => {
  return (
    <Tabs.Navigator

      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: { backgroundColor: "grey", paddingTop:20 },
        
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = require("../../assets/images/stethoscope.png");

          switch (route.name) {
            case "Tracker":
              iconName = require("../../assets/images/stethoscope.png");
              break;
            case "Get a Screening":
              iconName = require("../../assets/images/calendar.png");
              break;
            case "Carcinogens":
              iconName = require("../../assets/images/question.png");
              break;
            case "Citations":
              iconName = require("../../assets/images/magnifying-glass.png");
              break;
          }
          return (
            <View
              style={{
                backgroundColor: focused ? "white" : "#2746f8",
                borderRadius: 70,
                padding: 10,
              }}
            >
              <Image
                source={iconName}
                style={{ tintColor: focused ? "black" :"white", width: size, height: size }}
              />
            </View>
          );
        },
      })}
    >
      <Tabs.Screen name="Tracker" component={TrackerPage} />
      <Tabs.Screen name="Get a Screening" component={ScreeningStack} />

      {/* <Tabs.Screen name="Carcinogens" component={CarcinogenPage} /> */}
      <Tabs.Screen name="Citations" component={CitationPage} />
    </Tabs.Navigator>
  );
};

export default MainNav;
