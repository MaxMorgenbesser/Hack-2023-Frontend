import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";

import { useSelector } from "react-redux";
import { GoogleSelector, places } from "../models/GoogleModel";

import MapView, { MapMarker } from "react-native-maps";


import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Linking } from "react-native";

const ScreeningMap = () => {
  const data = useSelector((state: GoogleSelector) => state.google);
  const [selectedPlace, setSelectedPlace] = useState<places | null>(null);

  const mapref:any = useRef()
  return (
    <View style={styles.container}>
      <MapView
      ref={mapref}
        initialRegion={{
          latitude: data.places[0].location.latitude,
          longitude: data.places[0].location.longitude,
          latitudeDelta: 0.08,
          longitudeDelta: 0.08,
        }}
        style={styles.mapStyle}
      >
        {data.places.map((place, index) => (
          <MapMarker
            key={index}
            coordinate={place.location}
            onPress={() => {
                mapref?.current?.animateToRegion({
                  latitude:place.location.latitude,
                  longitude:place.location.longitude,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.04,
                })
              setSelectedPlace(place)}}
          >
            <FontAwesome name="map-marker" size={80} color={"#FF2299"} />
          </MapMarker>
        ))}
      </MapView>
      {selectedPlace && (
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{selectedPlace?.displayName.text}</Text>
          <Text style={styles.addressText}>
            {selectedPlace.formattedAddress}
          </Text>
          <TouchableOpacity
            onPress={() => Linking.openURL(selectedPlace.googleMapsUri)}
            style={styles.directionLink}
          >
            <Text style={styles.linkText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: "#F5F5F5",
  },
  mapStyle: {
    height: 400,
    width: 400,
    alignSelf: "center",
    borderRadius: 20,
    overflow: "hidden",
    marginVertical: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  infoContainer: {
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginHorizontal: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 5,
  },
  addressText: {
    fontSize: 18,
    color: "#7F7F7F",
    marginBottom: 15,
  },
  directionLink: {
    alignItems: "center",
    backgroundColor: "#FF2299",
    paddingVertical: 10,
    borderRadius: 10,
  },
  linkText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
export default ScreeningMap;