import React from 'react';
import GreenHouseDetails from './GreenHouseDetails';
import { render, screen, waitFor, act } from '@testing-library/react';
import fetchMock from 'jest-fetch-mock';

beforeEach(() => {
  fetchMock.resetMocks();
});

test('renders loading spinner initially', () => {
  render(<GreenHouseDetails />);
  expect(screen.getByText(/Loading greenhouse details.../i)).toBeInTheDocument();
});

test('renders greenhouse details as null after loading', () => {
  render(<GreenHouseDetails />);
  expect(screen.queryByText(/ID:/i)).toBeNull();
  expect(screen.queryByText(/Window opened:/i)).toBeNull();
  expect(screen.queryByText(/Greenhouse name:/i)).toBeNull();
  expect(screen.queryByText(/Description:/i)).toBeNull();
  expect(screen.queryByText(/Temperature:/i)).toBeNull();
  expect(screen.queryByText(/Light intensity:/i)).toBeNull();
  expect(screen.queryByText(/CO2 levels:/i)).toBeNull();
  expect(screen.queryByText(/Humidity:/i)).toBeNull();
});

test('renders greenhouse details after successful fetch', async () => {
  const mockData = {
    GreenHouseId: 1,
    GreenHouseName: 'Test Greenhouse',
    Description: 'A test greenhouse',
    Temperature: '25°C',
    LightIntensity: 'High',
    Co2Levels: '400 ppm',
    Humidity: '60%',
    IsWindowOpen: true
  };

  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  await act(async () => {
    render(<GreenHouseDetails />);
  });

  await waitFor(() => expect(screen.getByText(/ID: 1/i)).toBeInTheDocument());

  expect(screen.queryByText(/ID: 1/i)).toBeInTheDocument();
  expect(screen.queryByText(/Window opened: Yes/i)).toBeInTheDocument();
  expect(screen.queryByText(/Greenhouse name: Test Greenhouse/i)).toBeInTheDocument();
  expect(screen.queryByText(/Description: A test greenhouse/i)).toBeInTheDocument();
  expect(screen.queryByText(/Temperature: 25°C/i)).toBeInTheDocument();
  expect(screen.queryByText(/Light intensity: High/i)).toBeInTheDocument();
  expect(screen.queryByText(/CO2 levels: 400 ppm/i)).toBeInTheDocument();
  expect(screen.queryByText(/Humidity: 60%/i)).toBeInTheDocument();
});
