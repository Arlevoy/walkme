import { INITIAL_REGION } from '#modules/map/presentation/Map/Map.constants';
import { useEffect, useState } from 'react';
import { Region } from 'react-native-maps';
import {
  getLastKnownPositionAsync,
  mapLocationToRegion,
  requestForegroundPermissionsAsync,
} from '../../../shared/services/location.service';

export const useGetCurrentRegion = (
  setRegion: (region: Region) => void
): {
  currentRegion: Region;
  onCurrentPositionPress: () => void;
} => {
  const [currentRegion, setCurrentRegion] = useState<Region>();

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
      if (!location) return;
      setRegion(mapLocationToRegion(location));
    } catch (error) {
      console.log(error);
    }
  };

  return { currentRegion: currentRegion || INITIAL_REGION, onCurrentPositionPress };
};
