import React, { FunctionComponent, useState } from 'react';

import { Dimensions, StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { theme } from '../../../../shared/theme';

import { useGetCurrentRegion } from '#modules/map/infra/useGetCurrentPosition.hook';
import { INITIAL_REGION } from '#modules/map/presentation/Map/Map.constants';
import { OverlayCardInterface } from '#modules/map/presentation/OverlayCard/OverlayCard.interface';
import { CurrentPositionIcon } from '#shared/assets/icons/CurrentPositionIcon';
import { OverlayCard } from '../OverlayCard/OverlayCard';

interface MapStyles {
  container: ViewStyle;
  map: ViewStyle;
  currentPositionIcon: ViewStyle;
}

const styles = StyleSheet.create<MapStyles>({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    flex: 1,
    justifyContent: 'center',
  },
  currentPositionIcon: {
    padding: theme.spacing.unit * 3,
    position: 'absolute',
    right: 0,
    top: 50,
  },
  map: {
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
  },
});

const HOME = {
  latitude: 48.85937441095902,
  latitudeDelta: 0.005,
  longitude: 2.489802024508066,
  longitudeDelta: 0.005,
};

export const Map: FunctionComponent = () => {
  const [overlayCardStatus, setOverlayCardStatus] =
    useState<OverlayCardInterface['status']>('HIDDEN');
  const onMarkerPress = () => {
    setOverlayCardStatus('DISPLAYED');
  };
  const [region, setRegion] = useState<Region>(INITIAL_REGION);

  const { currentRegion, onCurrentPositionPress } = useGetCurrentRegion(setRegion);

  const onCloseOverlayCard = () => setOverlayCardStatus('HIDDEN');
  const onRegionChange = (region: Region) => setRegion(region);

  return (
    <View testID="map" style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        initialRegion={currentRegion}
        showsMyLocationButton={true}
        onRegionChange={onRegionChange}
        showsUserLocation={true}
      >
        <Marker key={1} coordinate={HOME} onPress={onMarkerPress} testID={'marker'} />
      </MapView>
      <TouchableOpacity onPress={onCurrentPositionPress} style={styles.currentPositionIcon}>
        <CurrentPositionIcon />
      </TouchableOpacity>
      <OverlayCard status={overlayCardStatus} onClose={onCloseOverlayCard} />
    </View>
  );
};
