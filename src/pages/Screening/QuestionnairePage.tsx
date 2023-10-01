import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, Pressable, Button, Image } from "react-native";
import { DatePickerModal } from "react-native-paper-dates";
import moment from "moment";

interface QuestionnairePageProps {
  onSubmitPressed: (props: OnSubmitPressedProps) => void;
  onBackPressed: () => void;
}

export interface OnSubmitPressedProps {
  [k: string]: unknown;
}

const QuestionnairePage = ({
  onSubmitPressed,
  onBackPressed,
}: QuestionnairePageProps) => {
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
    onBackPressed();
  };

  const handleOnBackPressed = () => {
    onBackPressed();
  };

  return (
    <View style={styles.container}>
      <View style={styles.goBackContainer}>
        <Pressable onPress={handleOnBackPressed}>
          <Text style={{ fontWeight: "bold", color: "#ffffff" }}>Go back</Text>
        </Pressable>
      </View>
      <Image
        source={require("../../../assets/images/awareness_image.jpeg")}
        style={styles.heroImage}
      />
      <View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>
            Have you had a recent cancer pre-screening?
          </Text>
        </View>
        <View style={styles.btnContainer}>
          <Pressable onPress={() => setAnswers(1)}>
            <View
              style={{
                ...styles.btnItem,
                ...(answers === 1 ? styles.selectedBtn : {}),
              }}
            >
              <Text
                style={{
                  ...styles.btnItemText,
                  ...(answers === 1 ? styles.btnItemTextSelected : {}),
                }}
              >
                Yes
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setAnswers(2)}>
            <View
              style={{
                ...styles.btnItem,
                ...(answers === 2 ? styles.selectedBtn : {}),
              }}
            >
              <Text
                style={{
                  ...styles.btnItemText,
                  ...(answers === 2 ? styles.btnItemTextSelected : {}),
                }}
              >
                No
              </Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>When was it ?</Text>
          <Text
            style={{
              ...styles.questionText,
              fontSize: 16,
              fontWeight: "normal",
            }}
          >
            {date ? moment(date).format("LL") : ""}
          </Text>
          <Pressable onPress={openModal}>
            <View style={styles.questionButton}>
              <Text style={styles.btnItemText}>{`${
                date ? "Change" : "Pick"
              } date`}</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.divider}></View>

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
        <View style={{ paddingHorizontal: 32 }}>
          <Button
            onPress={submitForm}
            title="Submit"
            color="#2746f8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
  },
  heroImage: {
    height: 200,
  },
  goBackContainer: {
    borderColor: "#ee0000",
    borderTopWidth: 3,
    backgroundColor: "#2746f8",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedBtn: {
    backgroundColor: "#2746f8",
    color: "#ffffff",
    borderColor: "#2746f8",
  },
  questionContainer: {
    backgroundColor: "#2746f8",
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  questionButton: {
    backgroundColor: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    padding: 8,
    borderRadius: 8,
    marginTop: 18,
  },
  questionButtonText: { fontSize: 16, fontWeight: "bold", color: "#2746f8" },
  btnContainer: {
    marginTop: 18,
    marginBottom: 18,
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
  },
  divider: {
    marginBottom: 16,
  },
  btnItem: {
    width: 72,
    height: 72,
    backgroundColor: "#ffffff",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#333333",
    borderWidth: 2,
  },
  btnItemText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
  },
  btnItemTextSelected: {
    color: "#ffffff",
  },
});

export default QuestionnairePage;
