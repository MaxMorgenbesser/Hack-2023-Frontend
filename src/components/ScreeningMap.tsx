import { useState } from "react";

import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import MapView, { MapMarker } from "react-native-maps";
import { GoogleSelector, places } from "../models/GoogleModel";

import { useSelector } from "react-redux";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking } from "react-native";

const ScreeningMap = () => {
  const data = useSelector((state: GoogleSelector) => state.google);
  const [selectedPlace, setSelectedPlace] = useState<places>();
  return (
    <View style={styles.ctr}>
      
        {selectedPlace && (
          <View>
            <Text style={styles.title}>{selectedPlace?.displayName.text}</Text>
            <Text style={styles.txt}>{selectedPlace.formattedAddress}</Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(selectedPlace.googleMapsUri)}
            >
              <Text style={styles.link}>Get Directions</Text>
            </TouchableOpacity>
          </View>
        )}
      
      <MapView 
        initialRegion={{
          latitude: data.places[0].location.latitude,
          longitude: data.places[0].location.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        style={styles.mapctr}
      >
        {data.places.map((place, a) => {
          return (
            <MapMarker
              key={a}
              coordinate={place.location}
              onPress={() => setSelectedPlace(place)}
            >
              <FontAwesome name="map-marker" size={80} color={"#ff2299"} />
            </MapMarker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  mapctr: {
    height: "60%",
    width: "80%",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    alignSelf:'center',
    borderWidth:3,
    borderColor:"rgba(0,0,0,.5)"
  },
  ctr: {
    height: "100%",
    width: "100%",
    paddingBottom:400
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    paddingHorizontal: "8%",
  },
  txt: {
    paddingHorizontal: "8%",
  },
  link: {
    color: "#0000EE",
    marginTop: 10,
    fontSize: 30,
    paddingHorizontal: "8%",
    marginBottom:"5%"
  },
});
export default ScreeningMap;
