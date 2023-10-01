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
  const fade = {
    start: 0.8,
    end: 1,
  };
  const scale = {
    start: 0.96,
    end: 1,
  };
  return (
    <View style={styles.container}>
      <View style={styles.goBackContainer}>
        <Pressable
          onPress={handleOnBackPressed}
          style={({ pressed }) => [
            {
              opacity: pressed ? fade.start : fade.end,
              transform: [{ scale: pressed ? scale.start : scale.end }],
            },
          ]}
        >
          <Text style={{ fontWeight: "bold", color: "#F5F5F5" }}>Go back</Text>
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
          <Pressable
            onPress={() => setAnswers(1)}
            style={({ pressed }) => [
              styles.btnItem,
              answers === 1 ? styles.selectedBtn : {},
              {
                opacity: pressed ? fade.start : fade.end,
                transform: [{ scale: pressed ? scale.start : scale.end }],
              },
            ]}
          >
            <Text
              style={[
                styles.btnItemText,
                answers === 1 ? styles.btnItemTextSelected : {},
              ]}
            >
              Yes
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setAnswers(2)}
            style={({ pressed }) => [
              styles.btnItem,
              answers === 2 ? styles.selectedBtn : {},
              {
                opacity: pressed ? fade.start : fade.end,
                transform: [{ scale: pressed ? scale.start : scale.end }],
              },
            ]}
          >
            <Text
              style={[
                styles.btnItemText,
                answers === 2 ? styles.btnItemTextSelected : {},
              ]}
            >
              No
            </Text>
          </Pressable>
        </View>
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>When was it ?</Text>
          <Text
            style={[
              styles.questionText,
              { fontSize: 16, fontWeight: "normal" },
            ]}
          >
            {date ? moment(date).format("LL") : ""}
          </Text>
          <Pressable
            onPress={openModal}
            style={({ pressed }) => [
              styles.questionButton,
              {
                opacity: pressed ? fade.start : fade.end,
                transform: [{ scale: pressed ? scale.start : scale.end }],
              },
            ]}
          >
            <Text style={styles.btnItemText}>
              {`${date ? "Change" : "Pick"} date`}
            </Text>
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
            color="#2746F8"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
  },
  heroImage: {
    height: 200,
  },
  goBackContainer: {
    borderColor: "#EE0000",
    borderTopWidth: 3,
    backgroundColor: "#2746F8",
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  selectedBtn: {
    backgroundColor: "#2746F8",
    color: "#F5F5F5",
    borderColor: "#2746F8",
  },
  questionContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2746F8",
    padding: 16,
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#F5F5F5",
  },
  questionButton: {
    backgroundColor: "#F5F5F5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    padding: 8,
    borderRadius: 8,
    marginTop: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionButtonText: { fontSize: 16, fontWeight: "bold", color: "#2746F8" },
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
    backgroundColor: "#F5F5F5",
    flexGrow: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    borderColor: "#333333",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  btnItemText: {
    fontSize: 16,
    color: "#333333",
    fontWeight: "bold",
  },
  btnItemTextSelected: {
    color: "#F5F5F5",
  },
});
export default QuestionnairePage;
