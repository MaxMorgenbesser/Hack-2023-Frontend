import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => {
  return (
    <View style={styles.heroContainer}>
      <View style={styles.heroItems}>
        <View style={styles.heroHeading}>
          <Text style={styles.heroHeadingDays}>68</Text>
          <Text style={styles.heroHeadingCopy}>days</Text>
        </View>
        <Text style={styles.heroSubCopy}>Since your last pre-screening</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: "#ffffff",
    padding: 18,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  heroItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    textAlign: "center",
    borderRadius: 42,
  },
  heroHeading: {
    marginBottom: 18,
  },
  heroHeadingDays: {
    fontSize: 42,
    fontWeight: "bold",
    textAlign: "center",
  },
  heroHeadingCopy: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
  },
  heroSubCopy: {
    fontSize: 18,
    color: "#333333",
  },
});

export default Header;
