import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const FunFactsCarousel: React.FC = () => {
  const [funFacts] = useState<string[]>([
    "Did you know? Regular colorectal cancer screening with colonoscopy can reduce the risk of dying from the disease by about 60-70%.",
    "Did you know? Mammography screening can reduce breast cancer mortality by about 20% among women aged 40 to 74.",
    "Did you know? Since the introduction of the Pap test, the incidence and death rate from cervical cancer in the U.S. have decreased by more than 60%.",
  ]);

  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);

  useEffect(() => {
    const changePage = () => {
      let nextPage = currentPage + 1;
      if (nextPage >= funFacts.length) {
        nextPage = 0;
      }
      setCurrentPage(nextPage);
      pagerRef.current?.setPage(nextPage);
    };

    const interval = setInterval(changePage, 6000); // change page every 3 seconds

    return () => clearInterval(interval); // Clear the interval when the component unmounts
  }, [currentPage, funFacts.length]);

  return (
    <PagerView ref={pagerRef} style={styles.viewPager} initialPage={0}>
      {funFacts.map((fact, index) => (
        <View key={index} style={styles.page}>
          <Text style={styles.fact}>{fact}</Text>
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  viewPager: {
    flex: 1,
    height: 100,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fact: {
    fontSize: 15,
  },
});

export default FunFactsCarousel;
