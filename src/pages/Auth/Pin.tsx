import { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

import { CodeField, Cursor } from "react-native-confirmation-code-field";

import { useDispatch, useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";

import { submitPin } from "../../api/authapi";

import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";
import FunFactsCarousel from "./PinComponents/FunFactCarosel";
import jwtDecode from "jwt-decode";
import Icon from "react-native-vector-icons/AntDesign";

import { setId, setToken } from "../../redux/slices/UserSlice";

const Pin = () => {
  const [pin, setPin] = useState<string>("");

  const dispatch = useDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const tempToken = useSelector((state: UserSelector) => state.user.tempToken);
  const { _id }: any = jwtDecode(tempToken);

  const onSubmitPin = async () => {
    try {
      const response = submitPin(pin, _id, tempToken);
      const token = (await response).data.token;

      await AsyncStorage.setItem("token", token);
      dispatch(setToken(token));

      const { _id: id }: any = jwtDecode(token);
      dispatch(setId(id));

      navigation.navigate("MainNav", { screen: "profile" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.ctr}>
      <View style={styles.carouselContainer}>
        <FunFactsCarousel />
      </View>
      <View style={styles.ctr2}>
        <Text style={styles.note}>Please enter the pin</Text>
        <Text></Text>
        <CodeField
          value={pin}
          onChangeText={setPin}
          cellCount={4}
          keyboardType="numeric"
          textContentType="oneTimeCode"
          renderCell={({ index, symbol, isFocused }) => (
            <Text style={[styles.cell]} key={index}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          )}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={onSubmitPin}>
        {/* <Text>Submit Pin</Text> */}
        <Icon name="rightcircleo" size={40} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    flexDirection: "column",
    backgroundColor: "#f5dbf4",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  ctr2: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  note: {
    fontSize: 16,
  },

  input: {
    backgroundColor: "white",
    width: "80%",
    height: "10%",
  },
  button: {
    marginTop: 20,
    // backgroundColor: "blue",
    // padding: 10,
    // color: "white",
  },
  cell: {
    backgroundColor: "#FFFFFF26",
    borderRadius: 15,
    overflow: "hidden",
    height: 85,
    width: 65,
    lineHeight: 85,
    marginHorizontal: "2%",
    fontSize: 55,
    color: "black",
    fontWeight: "600",
    textAlign: "center",
    borderColor: "black",
    borderWidth: 1,
  },

  carouselContainer: {
    height: 120,
    width: "100%",
    marginBottom: 20,
    padding: 10,
  },
});

export default Pin;
