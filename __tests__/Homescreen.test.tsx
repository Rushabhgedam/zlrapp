

import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { GET_COUNTRIES_OF_CONTINENTS } from "../app/graphql/queries";

import { ApolloClient, ApolloProvider, InMemoryCache, useQuery, } from '@apollo/client';
import HomeScreen from "../app/homescreen";
import { MockedProvider } from '@apollo/client/testing';

const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "https://countries.trevorblades.com/graphql"
})

const navigationMock = {
  navigate: jest.fn(),
};







jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 360, height: 640 })),
}));


const continentMock = {
  code: 'AF',
  name: 'Africa',
};

const countriesMock = {
  continent: {
    countries: [
      {
        name: 'Uganda',
        emoji: '🌍',
        continent: {
          name: 'Africa',
        },
      },

    ],
  },
};

const mockData = {
  continent: {
    countries: [
      { name: 'MockCountry1', emoji: '🌍', continent: { name: 'MockContinent1' } },
      { name: 'MockCountry2', emoji: '🌎', continent: { name: 'MockContinent2' } },
    ],
  },
};


describe('HomeScreen', () => {
  it('Initial renders homescreen', async () => {
    const mock1 = [
      {
        request: {
          query: GET_COUNTRIES_OF_CONTINENTS,
          variables: { code: "AF" },
        },
        result: { data: mockData },
      }
    ];
    render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <HomeScreen navigation={navigationMock} />
      </MockedProvider>
    );
    expect(screen).toMatchSnapshot()
  });


  test("Checks the component tree rendered correctly", async () => {
    const mock2 = [
      {
        request: {
          query: GET_COUNTRIES_OF_CONTINENTS,
          variables: { code: "AF" },
        },
        result: { data: mockData },
      }
    ];
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <MockedProvider mocks={mock2} addTypename={false}>
        <HomeScreen navigation={navigationMock} />
      </MockedProvider>
    );
    expect(getByText('Select Continent')).toBeTruthy();
    fireEvent.press(getByTestId('continent0'));
    await waitFor(() => {
      expect(getByText('Available Countries in Africa are')).toBeTruthy();
    });
    const searchBar = getByPlaceholderText('Search Country here...')
    fireEvent.changeText(searchBar, "AF")
    expect(searchBar).toBeTruthy();
  })
});