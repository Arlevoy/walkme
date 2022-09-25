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
import { PointOfInterest } from '#modules/routes/domain/route.interface';
import { getRoutesById } from '#modules/routes/infra/routes.api';
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

const DEFAULT_PADDING = {
  top: theme.spacing.unit * 4,
  bottom: theme.spacing.unit * 4,
  right: theme.spacing.unit * 4,
  left: theme.spacing.unit * 4,
};

export const Map: FunctionComponent = () => {
  const [overlayCardStatus, setOverlayCardStatus] =
    useState<OverlayCardInterface['status']>('HIDDEN');
  const [selectedPoi, setSelectedPoi] = useState<PointOfInterest>();
  const onMarkerPress = (poi: PointOfInterest) => () => {
    setSelectedPoi(poi);
    setOverlayCardStatus('DISPLAYED');
  };
  const mapViewRef = useRef<MapView>(null);
  const { currentRegion, onCurrentPositionPress } = useGetCurrentRegion(mapViewRef);

  const onCloseOverlayCard = () => setOverlayCardStatus('HIDDEN');

  const onStartRoutePress = () => {
    if (!mapViewRef || !mapViewRef.current) return;
    mapViewRef.current.fitToCoordinates(FIRST_ROUTE, { edgePadding: DEFAULT_PADDING });
  };
  const firstRoute = getRoutesById(1);

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
          {firstRoute[0]?.pointsOfInterest.map((poi) => (
            <Marker key={poi.title} coordinate={poi.region} onPress={onMarkerPress(poi)} />
          ))}
        </MapView>
        <TouchableOpacity
          testID="currentPositionButton"
          onPress={onCurrentPositionPress}
          style={styles.currentPositionIcon}
        >
          <CurrentPositionIcon />
        </TouchableOpacity>
        <TouchableOpacity onPress={onStartRoutePress} style={styles.startRouteButton}>
          <Text style={styles.startRouteText}>Démarre ton premier parcours !</Text>
        </TouchableOpacity>
        {selectedPoi && (
          <OverlayCard poi={selectedPoi} status={overlayCardStatus} onClose={onCloseOverlayCard} />
        )}
      </View>
    </SafeAreaView>
  );
};
