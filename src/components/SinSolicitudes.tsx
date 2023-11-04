// SinSolicitudes.js o SinSolicitudes.tsx
import React from "react";
import { View, Text } from "react-native";

const SinSolicitudes = () => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    }}
  >
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#EEF2FF",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "#4E479A" }}>!</Text>
    </View>

    <Text
      style={{
        textAlign: "center",
        marginVertical: 5,
        fontSize: 18,
        color: "#4E479A",
        fontWeight: "300",
      }}
    >
      Aun no hay solicitudes en este momento.
    </Text>
  </View>
);

export default SinSolicitudes;
