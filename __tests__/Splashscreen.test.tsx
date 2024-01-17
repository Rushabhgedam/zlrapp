/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../app/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import SplashScreen from '../app/splashscreen';
import { IProps } from '../app/types';
import { render, screen } from '@testing-library/react-native';
jest.useFakeTimers();

describe('Splash Screen test suite', () => {
  const navigationMock = {
    navigate: jest.fn(),
  };
  it('renders the initial component', () => {
    render(<SplashScreen navigation={navigationMock} />);
    expect(screen).toMatchSnapshot()
  });
  it('navigates to homescreen after 3 seconds', () => {
    jest.advanceTimersByTime(3000);
    expect(navigationMock.navigate).toHaveBeenCalledWith('homescreen');
  });
});