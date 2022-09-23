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
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await getCurrentPositionAsync();
      console.log('🚀 ~ file: Map.tsx ~ line 20 ~ location', location);
      setLocation(location);
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }
  if (!location) return { currentRegion: null };
  return { currentRegion: mapLocationToRegion(location) };
};
