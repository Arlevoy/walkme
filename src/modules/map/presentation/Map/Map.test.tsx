import { Map } from '#modules/map/presentation/Map/Map';
import { fireEvent, render } from '@testing-library/react-native';
import React from 'react';

describe('Map', () => {
  it('should render Map', () => {
    const screen = render(<Map />);

    expect(screen).toMatchSnapshot();
  });

  it('should display card on marker presss', async () => {
    const screen = render(<Map />);

    const marker = screen.getByTestId('marker');

    fireEvent.press(marker);

    expect(screen.getByText('My Home')).toBeTruthy();
  });
});
