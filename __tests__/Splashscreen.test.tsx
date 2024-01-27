import React from 'react';
import 'react-native';
import { render, screen } from '@testing-library/react-native';
import SplashScreen from '../app/screens/splash';

jest.useFakeTimers();

describe('Splash Screen test suite', () => {
  const navigationMock = {
    navigate: jest.fn(),
    replace: jest.fn(),
  };
  it('renders the initial component', () => {
    render(<SplashScreen navigation={navigationMock} />);
    expect(screen).toMatchSnapshot()
  });
  it('navigates to homescreen after 3 seconds', () => {
    jest.advanceTimersByTime(3000);
    expect(navigationMock.replace).toHaveBeenCalledWith('homescreen');
  });
});