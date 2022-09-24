import { IconBaseProps } from '#shared/assets/icons/interface';
import { theme } from '#shared/theme';
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';

export const CurrentPositionIcon: React.FunctionComponent<IconBaseProps> = ({
  color = theme.colors.black,
  size = 46,
}) => (
  <Svg width={size} height={size} xmlns="http://www.w3.org/2000/svg">
    <Path d="M12 8.25a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5Z" fill="#000" />
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 1.25a.75.75 0 0 1 .75.75v1.282a8.752 8.752 0 0 1 7.968 7.968H22a.75.75 0 0 1 0 1.5h-1.282a8.752 8.752 0 0 1-7.968 7.968V22a.75.75 0 0 1-1.5 0v-1.282a8.752 8.752 0 0 1-7.968-7.968H2a.75.75 0 0 1 0-1.5h1.282a8.752 8.752 0 0 1 7.968-7.968V2a.75.75 0 0 1 .75-.75ZM4.75 12a7.25 7.25 0 1 0 14.5 0 7.25 7.25 0 0 0-14.5 0Z"
      fill={color}
    />
  </Svg>
);
