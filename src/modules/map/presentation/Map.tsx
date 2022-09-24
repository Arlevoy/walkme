import React, { FunctionComponent, useState } from 'react';

import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions, ViewStyle } from 'react-native';
import { theme } from '../../../shared/theme';

import { useGetCurrentRegion } from '../infra/useGetCurrentPosition.hook';
import { OverlayCard } from './OverlayCard/OverlayCard';
import { OverlayCardInterface } from '#modules/map/presentation/OverlayCard/OverlayCard.interface';

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

const HOME = {
  latitude: 48.85937441095902,
  latitudeDelta: 0.005,
  longitude: 2.3898020245080662,
  longitudeDelta: 0.005,
};

export const Map: FunctionComponent = () => {
  const { currentRegion } = useGetCurrentRegion();
  const [overlayCardStatus, setOverlayCardStatus] =
    useState<OverlayCardInterface['status']>('HIDDEN');

  const onMarkerPress = () => {
    setOverlayCardStatus('DISPLAYED');
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={currentRegion || HOME}>
        <Marker key={1} coordinate={HOME} onPress={onMarkerPress} />
      </MapView>
      <OverlayCard status={overlayCardStatus} />
    </View>
  );
};
