import React, { FunctionComponent, useRef, useState } from 'react';

import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { theme } from '../../../../shared/theme';

import { useGetCurrentRegion } from '#modules/map/infra/useGetCurrentPosition.hook';
import { FIRST_ROUTE } from '#modules/map/presentation/Map/Map.constants';
import { OverlayCardInterface } from '#modules/map/presentation/OverlayCard/OverlayCard.interface';
import { CurrentPositionIcon } from '#shared/assets/icons/CurrentPositionIcon';
import { OverlayCard } from '../OverlayCard/OverlayCard';

interface MapStyles {
  container: ViewStyle;
  map: ViewStyle;
  currentPositionIcon: ViewStyle;
  startRouteButton: ViewStyle;
  startRouteText: TextStyle;
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
  startRouteButton: {
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.unit,
    opacity: 0.9,
    padding: theme.spacing.unit * 2,
    position: 'absolute',
    top: 0,
  },
  startRouteText: {
    color: theme.colors.primary,
    fontSize: theme.font.size.L,
  },
});

const HOME = {
  latitude: 48.85937441095902,
  latitudeDelta: 0.005,
  longitude: 2.489802024508066,
  longitudeDelta: 0.005,
};

const DEFAULT_PADDING = {
  top: theme.spacing.unit * 4,
  bottom: theme.spacing.unit * 4,
  right: theme.spacing.unit * 4,
  left: theme.spacing.unit * 4,
};

export const Map: FunctionComponent = () => {
  const [overlayCardStatus, setOverlayCardStatus] =
    useState<OverlayCardInterface['status']>('HIDDEN');
  const onMarkerPress = () => {
    setOverlayCardStatus('DISPLAYED');
  };
  const mapViewRef = useRef<MapView>(null);
  const { currentRegion, onCurrentPositionPress } = useGetCurrentRegion(mapViewRef);

  const onCloseOverlayCard = () => setOverlayCardStatus('HIDDEN');

  const onStartRoutePress = () => {
    if (!mapViewRef || !mapViewRef.current) return;
    mapViewRef.current.fitToCoordinates(FIRST_ROUTE, { edgePadding: DEFAULT_PADDING });
  };

  return (
    <SafeAreaView>
      <View testID="map" style={styles.container}>
        <MapView
          ref={mapViewRef}
          style={styles.map}
          initialRegion={currentRegion}
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
          <Marker key={1} coordinate={HOME} onPress={onMarkerPress} testID={'marker'} />
          {FIRST_ROUTE.map((region) => (
            <Marker key={region.latitude} coordinate={region} onPress={onMarkerPress} />
          ))}
        </MapView>
        <TouchableOpacity onPress={onCurrentPositionPress} style={styles.currentPositionIcon}>
          <CurrentPositionIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onStartRoutePress} style={styles.startRouteButton}>
          <Text style={styles.startRouteText}>Démarre ton premier parcours !</Text>
        </TouchableOpacity>
        <OverlayCard status={overlayCardStatus} onClose={onCloseOverlayCard} />
      </View>
    </SafeAreaView>
  );
};
