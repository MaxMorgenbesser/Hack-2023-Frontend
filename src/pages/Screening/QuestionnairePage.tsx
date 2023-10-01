import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Button } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import moment from "moment";
import axios from "axios";
import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";
import { API_URL } from "@env";

interface QuestionnairePageProps {
  onSubmitPressed: (props: OnSubmitPressedProps) => void;
}

export interface OnSubmitPressedProps {
  [k: string]: unknown;
}

const QuestionnairePage = ({ onSubmitPressed }: QuestionnairePageProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [answers, setAnswers] = useState<0 | 1 | 2>(0);

  const onDismissSingle = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirmSingle = useCallback(
    (params: any) => {
      setOpen(false);
      setDate(params?.date);
    },
    [setOpen, setDate]
  );

  const openModal = () => setOpen(true);

  const submitForm = () => {
    onSubmitPressed({
      lastScreeningDate: date?.getTime(),
      screened: answers === 1 ? true : false,
    });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.questionText}>Question 1</Text>
        <View style={styles.btnContainer}>
          <Pressable onPress={() => setAnswers(1)}>
            <View
              style={{
                ...styles.btnItem,
                ...(answers === 1 ? styles.selectedBtn : {}),
              }}
            >
              <Text style={styles.btnItemText}>Yes</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setAnswers(2)}>
            <View
              style={{
                ...styles.btnItem,
                ...(answers === 2 ? styles.selectedBtn : {}),
              }}
            >
              <Text style={styles.btnItemText}>No</Text>
            </View>
          </Pressable>
        </View>
        <Text style={styles.questionText}>Question 2</Text>
        <View style={styles.divider}></View>
        <Text>{date ? moment(date).format("LL") : ""}</Text>
        <View style={styles.divider}></View>
        <Pressable onPress={openModal}>
          <View style={styles.btnItem}>
            <Text style={styles.btnItemText}>{`${
              date ? "Change" : "Pick"
            } date`}</Text>
          </View>
        </Pressable>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
          validRange={{ endDate: new Date() }}
        />
        <View style={styles.divider}></View>
        <Button
          onPress={submitForm}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  selectedBtn: {
    backgroundColor: "#b2f6ff",
  },
  questionText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "bold",
    marginTop: 18,
  },
  btnContainer: {
    marginTop: 18,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 18,
  },
  divider: {
    marginBottom: 16,
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

export default QuestionnairePage;
