import { API_URL } from "@env";


import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text,  } from "react-native";

import axios, { AxiosResponse } from "axios";

import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";

import {  ScreeningResponseProps } from "./types/ScreeningProps";
import { ScreeningState } from "./types/ScreeningState";

import Header from "./Header";
import QuestionnairePage, { OnSubmitPressedProps } from "./QuestionnairePage";

import { ScrollView } from "react-native";

import ScreeningMap from "../../components/ScreeningMap";

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
    
      <ScrollView style={styles.ctr} >
        <Header
          dateToCompare={screeningData.data?.lastScreeningDate as number}
          openQuestionPage={(value) => setOpenQuestionPage(value)}
        />
        <View style={styles.placeContainer}>
          <Text style={styles.placeHeading}>Screening Available nearby</Text>
        </View>
        <ScreeningMap />
      </ScrollView>
   

  
  );
};

const styles = StyleSheet.create({
  btnContainer: {
    marginTop: 14,
    paddingStart: 20,
    paddingEnd: 20,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  btnItem: {
    width: 150,
    height: 92,
    backgroundColor: "#ffffff",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#2746f8",
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderWidth: 4,
  },
  btnItemText: {
    fontSize: 16,
  },
  ctr: {
    height:1000,
    flex:1
  },
  placeContainer: {
    padding: 16,
  },
  placeHeading: {
    fontSize: 18,
    paddingLeft:"6%",
    fontWeight: "bold",
    color: "#333333",
  },
});

export default ScreeningPage;
