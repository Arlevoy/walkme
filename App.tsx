import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Map } from './src/modules/map/presentation/Map/Map';
import { theme } from './src/shared/theme';

export default function App() {
  return (
    <View style={styles.container}>
      <Map />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'center',
  },
});
