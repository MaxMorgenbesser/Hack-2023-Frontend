import { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { CodeField, Cursor } from "react-native-confirmation-code-field";

import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";
import jwtDecode from "jwt-decode";

import { submitPin } from "../../api/authapi";

import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Pin = () => {
  const [pin, setPin] = useState<string>("");
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const tempToken = useSelector((state: UserSelector) => state.user.tempToken);
  const { _id }: any = jwtDecode(tempToken);

  const onSubmitPin = async () => {
    try {
      const response = submitPin(pin, _id, tempToken);
      await AsyncStorage.setItem("token", (await response).data?.token);
      navigation.navigate("MainNav", { screen: "profile" });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <View style={styles.ctr}>
      <Text>Please enter the pin</Text>
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
      <TouchableOpacity style={styles.button} onPress={onSubmitPin}>
        <Text>Submit Pin</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "pink",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    backgroundColor: "white",
    width: "80%",
    height: "10%",
  },
  button: {
    marginTop: 30,
    backgroundColor: "blue",
    padding: 10,
    color: "white",
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
    borderColor: "white",
    borderWidth: 1,
  },
});

export default Pin;
