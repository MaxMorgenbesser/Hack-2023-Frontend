import { View, Text, StyleSheet } from "react-native";



import { useEffect, useState } from "react";

import { useSelector } from "react-redux";
import { UserSelector } from "../../models/UserModels";
import { getUserActivities } from "../../api/activityapi";
import TrackerItem from "../../components/TrackerItem";



const TrackerPage = () => {
  const user = useSelector((state: UserSelector) => state.user);
  const [activityData, setActivityData] = useState<ActivityModel>();
  const [loading, setLoading] = useState<boolean>(true);
  const getUserActivityData = async () => {
    try {
      const response = await getUserActivities(user._id, user.token);
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
        <Text style={styles.headerText}>Daily Cancer Risk Check</Text>
        <View style={styles.risksContainer}>
      {activityData &&
        Object.keys(activityData).map((activity, a) => {
          if (activity !== "user_id" && activity !== "date" && activity !== "_id") {
            return (
              <TrackerItem
              activityData={activityData}
              setActivityData={setActivityData}
                _id={activityData._id}
                key={a}
                name={activity}
                checked={(activityData as any)[activity].checked as any}
                value={(activityData as any)[activity].value}
              ></TrackerItem>
            );
          }
        })}
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
    ctr :{
        display:"flex",
        paddingVertical:"20%",
        alignItems:"center",
        justifyContent:"center",
        height:"100%",
        paddingHorizontal:"2%"
    },
    headerText: {
        fontSize:22,
        fontWeight:"800",

    },
    risksContainer: {
        marginTop:"10%",
        alignSelf:"center",
        display:"flex",
        flexDirection:"column",
        justifyContent:"space-around"
    }

});
export default TrackerPage;
