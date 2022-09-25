import { Region } from 'react-native-maps';

export interface PointOfInterest {
  region: Region;
  title: string;
  description: string;
}

export interface Route {
  pointsOfInterest: PointOfInterest[];
}
