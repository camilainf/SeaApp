import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page1 = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página 1</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default Page1;
