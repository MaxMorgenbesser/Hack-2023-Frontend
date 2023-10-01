import { TouchableOpacity, View } from "react-native";

import { Text, StyleSheet } from "react-native";


import * as React from "react";

import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { updateFieldApi } from "../api/activityapi";
import { useSelector } from "react-redux";
import { UserSelector } from "../models/UserModels";

interface props {
  name: string;
  checked: boolean;
  value: boolean;
  _id?: string;
  setActivityData: React.SetStateAction<any>
  setCurrentPage:React.SetStateAction<any>
  currentPage:number,
  maxLength:number,
  activityData:ActivityModel
}

const iconSize = 20;
const design = {
  water: {
    text: "Did you drink water?",
    // icon: <Entypo name="water" size={iconSize} />,
  },
  exercise: {
    text: "Did you exercise?",
    // icon: <MaterialCommunityIcons name="dumbbell" size={iconSize} />,
  },
  sleep: {
    text: "Did you sleep 8 hours?",
    // icon: <FontAwesome name="bed" size={iconSize} />,
  },
  nondrinker: {
    text: "Did you avoid alcohol?",
    // icon: <MaterialIcons name="no-drinks" size={iconSize} />,
  },
  nonsmoker: {
    text: "Did you avoid smoking?",
    // icon: <MaterialIcons name="smoke-free" size={iconSize} />,
  },
  sunscreen: {
    text: "Did you use sunscreen?",
    // icon: <FontAwesome name="umbrella" size={iconSize} />,
  },
};

const TrackerItem = ({ name, checked, value, _id, setActivityData, activityData, setCurrentPage, currentPage, maxLength}: props) => {
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
        let data = await response.data.fields
        setActivityData({...activityData, ...data})
        setTimeout(()=> setCurrentPage(currentPage+1),1000)
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <View
        // disabled={checked}
   
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
      <Text style={{marginRight:15, fontSize:20, fontWeight:"800", color:"black"}}>{(design as any)[name].text}</Text>
  
    </View>
    
     <TouchableOpacity    
   
     style={[styles.btn, styles.nbtn]}
 onPress={() => updateField(name, true, false)}>
    <Text style={styles.btnTxt}>No</Text>
 <FontAwesome name="ban" size={24}  />
 </TouchableOpacity>
 <TouchableOpacity   style={[styles.btn, styles.gbtn]}  onPress={() => updateField(name, true, true)}>
 <Text style={styles.btnTxt}>Yes</Text>
 <AntDesign name="checkcircle" size={24} />

 </TouchableOpacity>
 </>
  );
};

const styles = StyleSheet.create({
  item: {
    marginVertical: "1.5%",
    paddingHorizontal: 30,
    paddingVertical:10,
    alignItems:"center",
    display:"flex",

    flexDirection:"row",
    justifyContent: "space-between"
  },
  btnctr: {
    display:"flex",
    flexDirection:"row"
  },
  shadowProp: {
    elevation: 20,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  gbtn: {
    backgroundColor:"green"
  },
  nbtn: {
backgroundColor:"red",
marginTop:50
  },
  btn: {
    borderWidth:2,
    marginVertical:5,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    paddingVertical:4,
    borderRadius:10
  },
  btnTxt:{
    fontSize:30,
    marginRight:5
  }
});
export default TrackerItem;
