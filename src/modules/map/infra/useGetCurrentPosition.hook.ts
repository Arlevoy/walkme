import { INITIAL_REGION } from '#modules/map/presentation/Map/Map.constants';
import React, { useEffect, useState } from 'react';
import MapView, { Region } from 'react-native-maps';
import {
  getLastKnownPositionAsync,
  mapLocationToRegion,
  requestForegroundPermissionsAsync,
} from '../../../shared/services/location.service';

export const useGetCurrentRegion = (
  mapViewRef: React.MutableRefObject<MapView | null>
): {
  currentRegion: Region;
  onCurrentPositionPress: () => void;
} => {
  const [currentRegion, setCurrentRegion] = useState<Region>();
  console.log('🚀 ~ file: useGetCurrentPosition.hook.ts ~ line 17 ~ currentRegion', currentRegion);

  const setRegionFromLocation = async () => {
    const location = await getLastKnownPositionAsync();
    if (!location) return;
    setCurrentRegion(mapLocationToRegion(location));
  };

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');

        return;
      }

      setRegionFromLocation();
    })();
  }, []);

  const onCurrentPositionPress = async () => {
    try {
      const location = await getLastKnownPositionAsync();
      if (!location || !mapViewRef || !mapViewRef.current) return;
      mapViewRef.current.animateCamera({ center: location.coords });
    } catch (error) {
      console.log(error);
    }
  };

  return { currentRegion: currentRegion || INITIAL_REGION, onCurrentPositionPress };
};
