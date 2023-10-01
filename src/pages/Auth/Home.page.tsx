import { useState, useEffect, useRef } from "react";

import {
  TextInput,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Keyboard,
  TouchableOpacity,
  View,
} from "react-native";

import { useDispatch } from "react-redux";
import { setTempToken } from "../../redux/slices/UserSlice";
import { submitNumber } from "../../api/authapi";

import Icon from "react-native-vector-icons/AntDesign";
import formatPhoneNumber from "../../utils/FormatPhoneNumber";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Home = () => {
  const [number, setNumber] = useState<string>("");
  const [error, setError] = useState<string>("");

  const numberInputRef = useRef(null);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (numberInputRef?.current) {
      numberInputRef?.current.focus();
    }
  }, []);

  const pressSubmitNumber = async () => {
    if (!number || number.length < 10) {
      setError("This number is entered incorrectly");
      return;
    }
    try {
      const response = await submitNumber(number, "+1");
      if (response.data.success) {
        dispatch(setTempToken(response.data.temptoken));
        navigation.navigate("Pin");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Pressable style={styles.ctr} onPress={() => Keyboard.dismiss()}>
      <Image
        source={require("../../../assets/images/acs-logo.png")}
        style={styles.logo}
      />

      <Text></Text>
      <Text></Text>
      <View style={styles.flexContainer}>
        <TextInput
          ref={numberInputRef}
          keyboardType="number-pad"
          style={styles.input}
          value={number}
          onChangeText={(value) => setNumber(formatPhoneNumber(value, number))}
          placeholder="Enter your phone number"
          placeholderTextColor="#333"
        ></TextInput>
        <TouchableOpacity onPress={() => pressSubmitNumber()}>
          <Icon name="rightcircleo" size={40} style={styles.submitArrow} />
          {/* <Text>Submit Number</Text> */}
        </TouchableOpacity>
      </View>
      <Text>{error}</Text>
      <Text></Text>
      <Text>We will send you an authentication code</Text>

      <View style={styles.bottomText}>
        <Text>Cancer information, answers, and hope.</Text>
        <Text>Available every minute of every day.</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  ctr: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#F5F5F5",

    zIndex: -1,
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: "white",
  },
  input: {
    backgroundColor: "white",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 5,
    width: "70%",
    height: 50,
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,

    // textAlign: "center",
  },
  button: {
    marginTop: 30,
    backgroundColor: "#2746f8",
    borderRadius: 5,
    padding: 10,
    borderColor: "white",
  },
  logo: {
    width: 260,
    height: 140,
  },

  bottomText: {
    marginTop: 120,
    textAlign: "center",
  },

  flexContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  submitArrow: {
    marginTop: 10,
    marginLeft: 5,
  },
});

export default Home;
