

import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { GET_ALL_COUNTRIES, GET_COUNTRIES_OF_CONTINENTS } from "../app/graphql/queries";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import HomeScreen from "../app/screens/home";
import { ReactNode } from "react";

const navigationMock = {
  navigate: jest.fn(),
};

jest.mock('react-native/Libraries/Utilities/Dimensions', () => ({
  get: jest.fn(() => ({ width: 360, height: 640 })),
}));

const mockData = {
  continent: {
    countries: [
      { name: 'MockCountry1', emoji: '🌍', continent: { name: 'MockContinent1' } },
      { name: 'MockCountry2', emoji: '🌎', continent: { name: 'MockContinent2' } },
    ],
  },
};

const allCountriesList = {
  "countries": [
    {
      "name": "Andorra",
      "continent": {
        "name": "Europe",
        "code": "EU"
      },
      "emoji": "🇦🇩"
    },
    {
      "name": "United Arab Emirates",
      "continent": {
        "name": "Asia",
        "code": "AS"
      },
      "emoji": "🇦🇪"
    },
  ]
}

const mock1 = [
  {
    request: {
      query: GET_ALL_COUNTRIES,
    },
    result: { data: allCountriesList },
  },
  {
    request: {
      query: GET_COUNTRIES_OF_CONTINENTS,
      variables: { code: "AF" },
    },
    result: { data: mockData },
  },
];

const MockApolloProvider = ({ children }: {children: ReactNode}) => <MockedProvider mocks={mock1} addTypename={false}>{children}</MockedProvider>


describe('HomeScreen test suite', () => {
  it('Check for initial render of homescreen', async () => {
    render(
      <MockApolloProvider>
        <HomeScreen navigation={navigationMock} />
      </MockApolloProvider>
    );
    expect(screen).toMatchSnapshot()
  });


  test("the component tree rendered correctly with search bar & placeholder", async () => {
    const { getByText, getByPlaceholderText, getByTestId } = render(
      <MockApolloProvider>
        <HomeScreen navigation={navigationMock} />
      </MockApolloProvider>
    );
    expect(getByTestId('searchBar')).toBeTruthy();
    expect(getByText('Select Continent')).toBeTruthy();
    expect(getByPlaceholderText('Please select continent')).toBeTruthy();
  })

  it("should click the continent item to receive the list of countries in a continent", async () => {
    const { getByTestId, getByText, getByPlaceholderText } = render(
      <MockApolloProvider>
        <HomeScreen navigation={navigationMock} />
      </MockApolloProvider>
    );
    fireEvent.press(getByTestId('continent0'));
    await waitFor(() => {
      expect(getByText('Available Countries in Africa are')).toBeTruthy();
    });
    const searchBar = getByPlaceholderText('Search Country here...')
    fireEvent.changeText(searchBar, "AF")
    expect(searchBar.props.value).toBe("AF");
  })
});