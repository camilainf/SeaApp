import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Page2: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Página 2</Text>
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

export default Page2;
