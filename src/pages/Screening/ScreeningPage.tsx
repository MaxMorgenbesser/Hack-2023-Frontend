import { API_URL } from "@env";
import axios, { AxiosResponse } from "axios";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Pressable } from "react-native";
import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Header from "./Header";
import { ScreeningProps, ScreeningResponseProps } from "./types/ScreeningProps";
import { ScreeningState } from "./types/ScreeningState";
import QuestionnairePage, { OnSubmitPressedProps } from "./QuestionnairePage";

const ScreeningPage = () => {
  const [screeningData, setScreeningData] = useState<ScreeningState>({
    loading: true,
    data: null,
  });

  const [openQuestionPage, setOpenQuestionPage] = useState(false);

  const token = useSelector((state: UserSelector) => state.user.token);
  const url = API_URL + "/screening";

  useEffect(() => {
    setScreeningData((oldState) => ({ ...oldState, loading: true }));

    axios
      .get<ScreeningResponseProps>(url, {
        headers: { Authorization: token },
      })
      .then((res) => {
        setScreeningData({ loading: false, data: res.data.data });
      })
      .catch((err) => {
        setScreeningData({
          loading: false,
          data: null,
        });
      });
  }, []);

  const onPressAddVisit = () => {};

  const postQuestions = (args: OnSubmitPressedProps) => {
    axios
      .post<any, AxiosResponse<ScreeningResponseProps>>(
        url,
        {
          lastScreeningDate: args.lastScreeningDate,
          screened: args.screened,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((res) => {
        setScreeningData({ loading: false, data: res.data.data });
      });
  };

  if (screeningData.loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (
    (!screeningData.loading &&
      (!screeningData.data || !Object.keys(screeningData.data).length)) ||
    openQuestionPage
  ) {
    return (
      <QuestionnairePage
        onSubmitPressed={postQuestions}
        onBackPressed={() => setOpenQuestionPage(false)}
      />
    );
  }

  return (
    <View>
      <View>
        <Header
          dateToCompare={screeningData.data?.lastScreeningDate as number}
        />
        <View style={styles.btnContainer}>
          <Pressable onPress={() => setOpenQuestionPage(true)}>
            <View style={styles.btnItem}>
              <Text style={styles.btnItemText}>Log recent visit</Text>
            </View>
          </Pressable>
          <Pressable>
            <View style={styles.btnItem}>
              <Text style={styles.btnItemText}>Schedule a visit</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 18,
    paddingStart: 32,
    paddingEnd: 32,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  btnItem: {
    width: 150,
    height: 92,
    backgroundColor: "#ffffff",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    borderColor: "#333333",
    borderWidth: 2,
  },
  btnItemText: {
    fontSize: 16,
  },
});

export default ScreeningPage;
