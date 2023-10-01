import { TouchableOpacity, View } from "react-native";

import { Text, StyleSheet } from "react-native";

import Entypo from "react-native-vector-icons/Entypo";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as React from "react";

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { updateFieldApi } from "../api/activityapi";
import { useSelector } from "react-redux";
import { UserSelector } from "../models/UserModels";

interface props {
  name: string;
  checked: boolean;
  value: boolean;
  _id?: string;
  setActivityData: React.SetStateAction<any>
  activityData:ActivityModel
}

const iconSize = 20;
const design = {
  water: {
    text: "Did you drink enough water today?",
    icon: <Entypo name="water" size={iconSize} />,
  },
  exercise: {
    text: "Did you exercise today?",
    icon: <MaterialCommunityIcons name="dumbbell" size={iconSize} />,
  },
  sleep: {
    text: "Did you get 8 hours of sleep?",
    icon: <FontAwesome name="bed" size={iconSize} />,
  },
  nondrinker: {
    text: "Did you avoid alcohol today?",
    icon: <MaterialIcons name="no-drinks" size={iconSize} />,
  },
  nonsmoker: {
    text: "Did you avoid smoking today?",
    icon: <MaterialIcons name="smoke-free" size={iconSize} />,
  },
  sunscreen: {
    text: "Did you use sunscreen today?",
    icon: <FontAwesome name="umbrella" size={iconSize} />,
  },
};

const TrackerItem = ({ name, checked, value, _id, setActivityData, activityData }: props) => {
  const token = useSelector((state: UserSelector) => state.user.token);
  const updateField = async (
    name: string,
    checked: boolean,
    value: boolean
  ) => {
    try {
      if (_id) {
        console.log(_id)
        const response = await updateFieldApi(
          _id,
          {
            [`${name}`]: {
              checked: checked,
              value: value,
            },
          },
          token
        );
        let data = await response.data.fields
        setActivityData({...activityData, ...data})
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <TouchableOpacity
        // disabled={checked}
      onPress={() => updateField(name, true, true)}
      style={[
        styles.item,
        styles.shadowProp,
        {
          borderWidth: 3,
          borderColor: !checked ? "black" : value ? "green" : "red",
          backgroundColor:  !checked ? "rgba(247, 195, 248, 1)" : value ? "rgba(201, 242, 155, 1)" : "red",
          opacity:!checked ? 1 : .7,
        },
      ]}
    >
      <Text>{(design as any)[name].text}</Text>
      {(design as any)[name].icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: "1.5%",
    paddingHorizontal: 20,
    paddingVertical:10,
  
    display:"flex",
    flexDirection:"row",
    justifyContent: "space-between"
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
export default TrackerItem;
