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
    {/* Un simple círculo con un ícono/texto dentro */}
    <View
      style={{
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: "#F2F4F4",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: 30, color: "#7F8C8D" }}>!</Text>
    </View>

    <Text
      style={{
        textAlign: "center",
        marginVertical: 5,
        fontSize: 18,
        color: "#2C3E50",
        fontWeight: "300",
      }}
    >
      Aun no hay solicitudes en este momento.
    </Text>
  </View>
);

export default SinSolicitudes;
