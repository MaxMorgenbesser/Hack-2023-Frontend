import moment from "moment";
import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";

interface HeaderProps {
  dateToCompare: number;
  openQuestionPage: (k: boolean) => void;
}

const Header = ({ dateToCompare, openQuestionPage }: HeaderProps) => {
  const today = moment(new Date());
  const toCompare = moment(dateToCompare);
  const daysToShow = today.diff(toCompare, "days");

  return (
    <View style={styles.heroContainer}>
      <Image
        source={require("../../../assets/images/awareness_image.jpeg")}
        style={styles.heroImage}
      />
      <View style={styles.heroItems}>
        <View style={styles.heroHeading}>
          <Text style={styles.heroHeadingDays}>{daysToShow}</Text>
          <Text style={styles.heroHeadingCopy}>days</Text>
        </View>
        <Text style={styles.heroSubCopy}>Since your last pre-screening</Text>
        <Pressable onPress={() => openQuestionPage(true)}>
          <View style={styles.btnItem}>
            <Text style={styles.btnItemText}>Log Recent Visit</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heroContainer: {
    backgroundColor: "#2746f8",
    paddingBottom: 32,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "#ee0000",
    borderTopWidth: 3,
  },
  heroImage: {
    height: 200,
  },
  heroItems: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    paddingTop: 32,
  },
  heroHeading: {
    marginBottom: 12,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "baseline",
  },
  heroHeadingDays: {
    fontSize: 52,
    fontWeight: "bold",
    textAlign: "center",
    color: "#ffffff",
  },
  heroHeadingCopy: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ffffff",
    textAlign: "center",
  },
  heroSubCopy: {
    fontSize: 16,
    color: "#ffffff",
    marginBottom: 24,
  },
  btnItem: {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 250,
    padding: 8,
    borderRadius: 8,
  },
  btnItemText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2746f8",
  },
});

export default Header;
