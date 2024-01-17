

import { fireEvent, render, screen, waitFor } from "@testing-library/react-native";
import { GET_COUNTRIES_OF_CONTINENTS } from "../app/graphql/queries";

import { ApolloClient, InMemoryCache } from '@apollo/client';
import { MockedProvider } from '@apollo/client/testing';
import HomeScreen from "../app/homescreen";

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


const mock1 = [
  {
    request: {
      query: GET_COUNTRIES_OF_CONTINENTS,
      variables: { code: "AF" },
    },
    result: { data: mockData },
  }
];
describe('HomeScreen', () => {
  it('Initial renders homescreen', async () => {
    render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <HomeScreen navigation={navigationMock} />
      </MockedProvider>
    );
    expect(screen).toMatchSnapshot()
  });


  test("Checks the component tree rendered correctly", async () => {
    const {  getByText } = render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <HomeScreen navigation={navigationMock} />
      </MockedProvider>
    );
    expect(getByText('Select Continent')).toBeTruthy();
  })

  it("should click the continent item to receive the list of countries in a continent", async()=>{
    const {  getByTestId, getByText, getByPlaceholderText } = render(
      <MockedProvider mocks={mock1} addTypename={false}>
        <HomeScreen navigation={navigationMock} />
      </MockedProvider>
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