import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";

const FunFactsCarousel: React.FC = () => {
  const [funFacts] = useState<string[]>([
    "Did you know? The shortest war in history was between Britain and Zanzibar on August 27, 1896. Zanzibar surrendered after 38 minutes.",
    "Did you know? Honey never spoils. Archeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old!",
    "Did you know? A day on Venus is longer than its year. It takes Venus about 243 Earth days to rotate once on its axis but it takes only 225 Earth days to orbit the Sun.",
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
          <Text>{fact}</Text>
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
});

export default FunFactsCarousel;
