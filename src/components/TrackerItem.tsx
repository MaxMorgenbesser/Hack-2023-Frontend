import { TouchableOpacity, View } from "react-native";

import { Text, StyleSheet } from "react-native";

import * as React from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import { updateFieldApi } from "../api/activityapi";
import { useSelector } from "react-redux";
import { UserSelector } from "../models/UserModels";

interface props {
  name: string;
  checked: boolean;
  value: boolean;
  _id?: string;
  setActivityData: React.SetStateAction<any>;
  setCurrentPage: React.SetStateAction<any>;
  currentPage: number;
  maxLength: number;
  activityData: ActivityModel;
  totalCompleted:number;
  setTotalCompleted:React.SetStateAction<any>;
}

const iconSize = 20;
const design = {
  water: {
    text: "Did you drink water?",
    description: "Regular hydration is correlated with a lowered risk of cancer.(4)"
    // icon: <Entypo name="water" size={iconSize} />,
  },
  exercise: {
    text: "Did you exercise?",
    description:"Inactive individuals are 15-30% more likely to develop cancer than active ones.(7)"
    // icon: <MaterialCommunityIcons name="dumbbell" size={iconSize} />,
  },
  sleep: {
    text: "Did you sleep 8 hours?",
    description: "Individuals who get regular sleep can be 10-15% less likely to develop cancer.(1)"
    // icon: <FontAwesome name="bed" size={iconSize} />,
  },
  nondrinker: {
    text: "Did you avoid alcohol?",
    description:"Heavy drinkers can be up to 30% more likely to develop certain types of cancer.(6)"
    // icon: <MaterialIcons name="no-drinks" size={iconSize} />,
  },
  nonsmoker: {
    text: "Did you avoid smoking?",
    description:"Heavy drinkers can be up to 30% more likely to develop certain types of cancer.(6)"
    // icon: <MaterialIcons name="smoke-free" size={iconSize} />,
  },
  sunscreen: {
    text: "Did you use sunscreen?",
    description:"Those who regularly use sunscreen are much less likely to develop skin cancer.(4)"
    // icon: <FontAwesome name="umbrella" size={iconSize} />,
  },
};

const TrackerItem = ({
  name,
  checked,
  value,
  _id,
  setActivityData,
  activityData,
  setCurrentPage,
  currentPage,
  totalCompleted,
  setTotalCompleted
}: props) => {
  const token = useSelector((state: UserSelector) => state.user.token);
  const updateField = async (
    name: string,
    checked: boolean,
    value: boolean
  ) => {
    try {
      if (_id) {
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
        let data = await response.data.fields;
        setActivityData({ ...activityData, ...data });
        setTimeout(() => setCurrentPage(currentPage + 1), 500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <View


        style={[
          styles.item,
          styles.shadowProp,
          {
            borderWidth: 3,
            borderColor: !checked ? "black" : value ? "green" : "red",
            backgroundColor: !checked
              ? "rgba(247, 195, 248, 1)"
              : value
              ? "rgba(201, 242, 155, 1)"
              : "red",
            opacity: !checked ? 1 : 0.7,
          },
        ]}
      >
        <Text
          style={{
            marginRight: 15,
            fontSize: 20,
            fontWeight: "800",
            color: "black",
          }}
        >
          {(design as any)[name].text}
          
        </Text>
          
      </View>
      <Text style={{fontSize:20, textAlign:"center"}}>{(design as any)[name].description}</Text>
          <View style={styles.btnctr}>
      <TouchableOpacity
        style={[styles.btn, styles.nbtn]}
        onPress={() => updateField(name, true, false)}
      >
        <Text style={styles.btnTxt}>No</Text>
        <FontAwesome name="ban" size={24} />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, styles.gbtn]}
        onPress={() => {
            setTotalCompleted(totalCompleted+1)
            updateField(name, true, true)}}
      >
        <Text style={styles.btnTxt}>Yes</Text>
        <AntDesign name="checkcircle" size={24} />
      </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: "1.5%",
    paddingHorizontal: 30,
    paddingVertical: 10,
    alignItems: "center",
    display: "flex",
    textAlign:"center",

    flexDirection: "row",
    justifyContent: "center",
  },
  btnctr: {
    display: "flex",
    flexDirection: "row",
    justifyContent:"space-around",
    marginTop:"10%"
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gbtn: {
    backgroundColor: "green",
  },
  nbtn: {
    backgroundColor: "red",
    
  },
  btn: {
    borderWidth: 2,
    marginVertical: 5,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 4,
    borderRadius: 10,
    width:"45%",
    
  },
  btnTxt: {
    fontSize: 30,
    marginRight: 5,
  },
});
export default TrackerItem;
