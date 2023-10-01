import { View, Text, StyleSheet, Image, Dimensions } from "react-native";

import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";
import { getUserActivities } from "../../api/activityapi";
import TrackerItem from "../../components/TrackerItem";

const TrackerPage = () => {
  const user = useSelector((state: UserSelector) => state.user);
  const [activityData, setActivityData] = useState<ActivityModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const [totalcompleted, setTotalCompleted] = useState<number>(0);
  const [keys, setKeys] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const getUserActivityData = async () => {
    try {
      const response = await getUserActivities(user._id, user.token);
      setKeys(
        Object.keys(response.data.activities).filter(
          (key) => key != "date" && key != "_id" && key != "user_id"
        )
      );
      setActivityData(response.data.activities);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getUserActivityData();
  }, []);





  return (
    <View style={styles.ctr}>
      <Image
        source={require("../../../assets/images/screening-poster.png")}
        style={{ width: Dimensions.get("screen").width * 0.66, height: 350 }}
      ></Image>
      <Text style={styles.headerText}>Daily Cancer Risk Check</Text>
      <View style={styles.risksContainer}>
        {activityData && keys && keys.length - 1 >= currentPage ? (
          <TrackerItem
            maxLength={keys.length - 1}
            totalCompleted={totalcompleted}
            setTotalCompleted={setTotalCompleted}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            activityData={activityData}
            setActivityData={setActivityData}
            _id={activityData._id}
            name={keys[currentPage]}
            checked={(activityData as any)[keys[currentPage]].checked as any}
            value={(activityData as any)[keys[currentPage]].value}
          ></TrackerItem>
        ) : (
          <View>
            {!loading && (
              <>
                <Text style={{ fontSize: 30 }}>Test Completed</Text>
                <Text style={{ fontSize:30, textAlign:"center"}}>
                  {totalcompleted}/{keys.length}
                </Text>
              </>
            )}
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  ctr: {
    display: "flex",
    paddingBottom: "20%",
    alignItems: "center",
    paddingTop:'3%',
    // backgroundColor:'',
    // justifyContent:"center",
    height: "100%",
    paddingHorizontal: "2%",
  },
  headerText: {
    fontSize: 22,
    fontWeight: "800",
    marginTop: 20,
  },
  risksContainer: {
    marginTop: "10%",
    alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});
export default TrackerPage;
