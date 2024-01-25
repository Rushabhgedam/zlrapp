import React, { useCallback } from 'react'
import { FlatList, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EmptyCountry from '../../components/emptydata'
import Input from '../../components/input'
import ListItemseparator from '../../components/listitemseparator'
import RadioButton from '../../components/radiobutton'
import { Seperator } from '../../components/separator'
import { continentsList } from '../../constants'
import { IContinent, ICountryItem, IProps } from '../../types/index'


interface HomeProps extends IProps {
    continent: IContinent,
    setContinent: Function
    loading: boolean,
    searchText: string
    setSearchText: Function
    countryList: { countries: ICountryItem[] }
    refetch: () => void
}


const HomeScreenView = ({ continent, setContinent, loading, searchText, setSearchText, countryList, refetch }: HomeProps) => {
    const renderContinentsList = useCallback(({ item, index }: { item: IContinent, index: number }) => {
        let isSelected = item.code === continent.code
        return <TouchableOpacity testID={'continent' + index} onPress={() => item.code !== continent.code && setContinent({ code: item.code, name: item.name })}
            style={[styles.continentItem, { backgroundColor: isSelected ? "#e8f2fb" : "white" }]}>
            <RadioButton isSelected={isSelected} />
            <Text style={styles.continentName}>{item.name}</Text>
        </TouchableOpacity>
    }, [continent.code])

    const renderCountriesList = useCallback(({ item }: { item: ICountryItem }) => {
        return <View style={styles.row}>
            <Text style={styles.flag}>{item.emoji}</Text>
            <View>
                <Text style={styles.countryName}> {item.name}</Text>
                <Text style={styles.continentName1}> {item.continent.name}</Text>
            </View>
        </View>
    }, [])

    return (
        <SafeAreaView style={{ flex: 1,}}>
            <StatusBar />
            <View style={styles.container}>
                <Seperator />
                <Input
                    searchText={searchText}
                    setSearchText={setSearchText}
                    testID='searchBar'
                    placeholder={continent.code === "" ? "Please select continent" : "Search Country here..."} />
                <Seperator />
                <View>
                    <FlatList
                        data={continentsList}
                        renderItem={renderContinentsList}
                        keyExtractor={(_, index) => index.toString()}
                        ItemSeparatorComponent={() => <ListItemseparator />}
                    />
                </View>
                <Seperator />
                <View style={{flex:1}}>
                    {continent.code.length > 0 && <Text style={{ alignSelf: "center", margin: 10 }}>{`Available Countries in ${continent.name} are`}</Text>}
                    <FlatList
                        ListEmptyComponent={<EmptyCountry continent={continent} loading={loading} searchText={searchText} />}
                        data={countryList?.countries?.filter((country: ICountryItem) => country.name.toLowerCase().includes(searchText.toLowerCase()))}
                        renderItem={renderCountriesList}
                        refreshControl={<RefreshControl
                            refreshing={loading}
                            onRefresh={refetch}
                        />}
                        ItemSeparatorComponent={() => <ListItemseparator />}
                        keyExtractor={(_, index) => index.toString()}
                        style={styles.countriesFlatList}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreenView

const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1 },
    continentItem: {
        flexDirection: "row",
        marginHorizontal: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    continentName: {
        color: "black"
    },
    continentName1: {
        color: '#b8b8b8'
    },
    row: {
        flexDirection: "row"
    },
    flag: {
        fontSize: 25,
        color: '#000'
    },
    countryName: {
        color: '#000',
        fontSize: 16
    },
    countriesFlatList: {
        marginHorizontal: 10
    }
})