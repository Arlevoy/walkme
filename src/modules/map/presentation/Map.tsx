import React, { FunctionComponent } from 'react';

import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import { theme } from '../../../shared/theme';

import { useGetCurrentRegion } from '../infra/useGetCurrentPosition.hook';
import { OverlayCard } from './OverlayCard';

interface MapStyles {
  container: ViewStyle;
  map: ViewStyle;
}

const styles = StyleSheet.create<MapStyles>({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

export const Map: FunctionComponent = () => {
  const { currentRegion } = useGetCurrentRegion();
  const HOME = {
    latitude: 48.85937441095902,
    latitudeDelta: 0.005,
    longitude: 2.3898020245080662,
    longitudeDelta: 0.005,
  };
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={currentRegion || HOME}
        onRegionChange={(args) => console.log(args)}
      >
        <Marker key={1} coordinate={HOME} title={'HOME'} description={'Home'} />
      </MapView>
      <OverlayCard />
    </View>
  );
};
