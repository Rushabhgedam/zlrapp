import { gql } from "@apollo/client";



export const GET_ALL_COUNTRIES = gql`query Countries {
  countries {
    name
    continent {
      name
    }
    emoji
  }
}`


export const GET_COUNTRIES_OF_CONTINENTS = gql`query Query($code: ID!) {
    continent(code: $code) {
      countries {
        name
        emoji
        continent {
          name
        }
      }
    }
  }
`