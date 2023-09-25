import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../routes/types";

type Props = {
  navigation: StackNavigationProp<RootStackParamList>;
};

const Mas: React.FC<Props> = ({ navigation }) => {

  const handleNavigationToRegister = () => {
    navigation.navigate("Auth");
  };

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={() => {
        console.log('Cerrar sesion');
        handleNavigationToRegister();
      }}>
        <View style={styles.tarjetaUltimosTrabajos}>
          <Text style={styles.text}> Cerrar sesión</Text>
        </View>

      </TouchableNativeFeedback >

    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  tarjetaUltimosTrabajos: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 30,
    marginBottom: 20,
    backgroundColor: 'red'
  },

  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },

});

export default Mas;
