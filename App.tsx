import { StyleSheet, View } from 'react-native';
import React from 'react';
import { theme } from './src/shared/theme';
import { Map } from './src/modules/map/presentation/Map';

export default function App() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
