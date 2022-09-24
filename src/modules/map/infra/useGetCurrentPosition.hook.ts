import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import {
  getCurrentPositionAsync,
  mapLocationToRegion,
  requestForegroundPermissionsAsync,
} from '../../../shared/services/location.service';
import { Region } from 'react-native-maps';

export const useGetCurrentRegion = (): { currentRegion: Region | null } => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      const location = await getCurrentPositionAsync();
      setLocation(location);
    })();
  }, []);

  if (!location) return { currentRegion: null };

  return { currentRegion: mapLocationToRegion(location) };
};
