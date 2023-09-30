// BibliographyPage.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

type Citation = {
  id: number;
  text: string;
};

const citations: Citation[] = [
  { id: 1, text: "Author, A. A. (Year). Title of work. Publisher." },
  // Add more citations in the same format
];

const BibliographyPage: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      {citations.map((citation) => (
        <Text key={citation.id} style={styles.citation}>
          {citation.text}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
  },
  citation: {
    fontSize: 16,
    marginBottom: 10,
    fontStyle: "italic",
  },
});

export default BibliographyPage;
