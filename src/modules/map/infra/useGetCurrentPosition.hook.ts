import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import { Region } from 'react-native-maps';
import {
  getCurrentPositionAsync,
  mapLocationToRegion,
  requestForegroundPermissionsAsync,
} from '../../../shared/services/location.service';

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
