import { useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  Pressable,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import { useDispatch } from "react-redux";
import { setTempToken } from "../../redux/slices/UserSlice";
import { submitNumber } from "../../api/authapi";


import formatPhoneNumber from "../../utils/FormatPhoneNumber";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import {NativeStackNavigationProp} from '@react-navigation/native-stack';


const Home = () => {
  const [number, setNumber] = useState<string>("");

  const navigation  = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const pressSubmitNumber = async () => {
    if (!number || number.length < 10) {
      return;
    }
    try {
      const response = await submitNumber(number, "+1");
      if (response.data.success) {
        dispatch(setTempToken(response.data.temptoken));
        navigation.navigate("Pin")
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Pressable style={styles.ctr} onPress={() => Keyboard.dismiss()}>
      <Text>Please enter phone number</Text>
      <TextInput
        keyboardType="number-pad"
        style={styles.input}
        value={number}
        onChangeText={(value) => setNumber(formatPhoneNumber(value, number))}
      ></TextInput>
      <TouchableOpacity style={styles.button}  onPress={()=>pressSubmitNumber()} ><Text>Submit Number</Text></TouchableOpacity >
    </Pressable>
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
    backgroundColor:"blue",
    padding:10,
    color:"white"
  },
});

export default Home;
