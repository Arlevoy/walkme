import * as Location from 'expo-location';
import { Region } from 'react-native-maps';

export const requestForegroundPermissionsAsync =
  async (): Promise<Location.LocationPermissionResponse> => {
    return await Location.requestForegroundPermissionsAsync();
  };

export const getCurrentPositionAsync = async (): Promise<Location.LocationObject> => {
  return await Location.getCurrentPositionAsync();
};

export const mapLocationToRegion = (location: Location.LocationObject): Region => {
  const { latitude, longitude } = location.coords;

  return {
    latitude,
    longitude,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };
};
