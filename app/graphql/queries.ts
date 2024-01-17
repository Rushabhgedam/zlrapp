import { gql } from "@apollo/client";



export const GET_CONTININENTS = gql`query Continents {
    continents {
      name
      code
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