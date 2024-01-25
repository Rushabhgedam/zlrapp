import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ALL_COUNTRIES, GET_COUNTRIES_OF_CONTINENTS } from '../../graphql/queries'
import { ICountryItem, IProps } from '../../types/index'
import HomeScreenView from './home.view'


const HomeScreen = (props: IProps) => {
    const [continent, setContinent] = useState<{
        code: string;
        name: string;
    }>({
        code: "",
        name: ""
    })
    const [searchText, setSearchText] = useState<string>("")

    const { data: allCountriesList } = useQuery(GET_ALL_COUNTRIES);
    const { loading, data, refetch, } = useQuery(GET_COUNTRIES_OF_CONTINENTS, {
        variables: { code: continent.code },
    });
    const [countryList, setCountryList] = useState<{
        countries: ICountryItem[];
    }>({
        countries: []
    })

    useEffect(() => {
        if (data?.continent != undefined) {
            setCountryList(data.continent)
            return
        }
        if (allCountriesList) {
            setCountryList(allCountriesList)
        }
    }, [allCountriesList, data])

    return <HomeScreenView
        continent={continent}
        countryList={countryList}
        loading={loading}
        refetch={refetch}
        searchText={searchText}
        setContinent={setContinent}
        setSearchText={setSearchText}
        key={"homescreen"}
        {...props}

    />
}

export default HomeScreen