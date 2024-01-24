import { useQuery } from '@apollo/client'
import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, Dimensions, FlatList, Image, InteractionManager, RefreshControl, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { selected, unselected } from './assets'
import { continentsList } from './constants'
import { GET_ALL_COUNTRIES, GET_COUNTRIES_OF_CONTINENTS } from './graphql/queries'
import { IContinent, ICountryItem, IProps } from './types/index'

const { width, height } = Dimensions.get("screen")

// const HomeScreen = (props: IProps) => {
//     const [continent, setContinent] = useState<{
//         code: string;
//         name: string;
//     }>({
//         code: "",
//         name: ""
//     })
//     const [searchText, setSearchText] = useState<string>('')

//     const { data: allCountriesList } = useQuery(GET_ALL_COUNTRIES);
//     const { loading, error, data, refetch, called } = useQuery(GET_COUNTRIES_OF_CONTINENTS, {
//         variables: { code: continent.code },
//     });
//     const [countryList, setCountryList] = useState<{
//         countries: ICountryItem[];
//     }>({
//         countries: []
//     })

//     useEffect(() => {
//         InteractionManager.runAfterInteractions(()=>{
//             if (data?.continent != undefined) {
//                 setCountryList(data.continent)
//                 return
//             }
//             if (allCountriesList) {
//                 setCountryList(allCountriesList)
//             }
//         })
//     }, [allCountriesList, data])

//     const renderContinentsList = useCallback(({ item, index }: { item: IContinent, index: number }) => {
//         let isSelected = item.code === continent.code
//         const handleContinentClick = () => {
//             InteractionManager.runAfterInteractions(() => {
//                 item.code !== continent.code && setContinent({ code: item.code, name: item.name })
//             })
//         }
//         return <TouchableOpacity testID={'continent' + index} onPress={handleContinentClick}
//             style={[styles.continentItem, { backgroundColor: isSelected ? "#e8f2fb" : "white" }]}>
//             <Image source={isSelected ? selected : unselected} style={styles.radioBtn} />
//             <Text style={styles.continentName}>
//                 {item.name}
//             </Text>
//         </TouchableOpacity>
//     },[continent.code])

//     const renderCountriesList = useCallback(({ item, index }: { item: ICountryItem, index: number }) => {
//         return <View style={styles.row}>
//             <Text style={styles.flag}>{item.emoji}</Text>
//             <View>
//                 <Text style={styles.countryName}> {item.name}</Text>
//                 <Text style={styles.continentName1}> {item.continent.name}</Text>
//             </View>
//         </View>
//     },[countryList])
//     const emptyCountry = () => <View>
//         {
//             continent.code != "" && loading ? <ActivityIndicator /> :
//                 searchText.length > 0 ? <Text>Not found results for {searchText}</Text> :
//                     <Text>Select Continent</Text>
//         }
//     </View>
//     const Seperator = () => <View style={{ marginTop: 10 }} />
//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//             <View style={styles.container}>
//                 <StatusBar />
//                 <Seperator />
//                 <TextInput
//                     onChangeText={(t) => {
//                         setSearchText(t)
//                     }}
//                     value={searchText}
//                     placeholder={continent.code === "" ? "Please select continent" : "Search Country here..."}
//                     style={styles.searchBar} />
//                 <Seperator />
//                 <View>
//                     <FlatList
//                         data={continentsList}
//                         keyExtractor={(_, index) => index.toString()}
//                         ItemSeparatorComponent={() => <View style={{ paddingVertical: 2 }} />}
//                         renderItem={renderContinentsList}
//                         removeClippedSubviews={true}
//                     />
//                 </View>
//                 <Seperator />
//                 <View>
//                     {continent.code && <Text style={{ alignSelf: "center", margin: 10 }}>{`Available Countries in ${continent.name} are`}</Text>}

//                     <FlatList
//                         ListEmptyComponent={emptyCountry}
//                         // data={data?.continent?.countries?.length === 0 ?allCountriesList?.countries : data?.continent?.countries.filter((country: ICountryItem) => country.name.toLowerCase().includes(searchText.toLowerCase()))}
//                         data={countryList?.countries?.filter((country: ICountryItem) => country.name.toLowerCase().includes(searchText.toLowerCase()))}
//                         renderItem={renderCountriesList}
//                         refreshControl={<RefreshControl
//                             refreshing={loading}
//                             onRefresh={refetch}
//                         />}
//                         initialNumToRender={15}
//                         maxToRenderPerBatch={10}
//                         removeClippedSubviews={true}
//                         keyExtractor={(_, index) => (index + 10).toString()}
//                         style={styles.countriesFlatList}
//                     />
//                 </View>
//             </View>
//         </SafeAreaView>
//     )
// }

const HomeScreen = (props: IProps) => {
    const [continent, setContinent] = useState({
        code: "",
        name: "",
    });
    const [searchText, setSearchText] = useState('');

    const { data: allCountriesList } = useQuery(GET_ALL_COUNTRIES);
    const { loading, error, data, refetch, called } = useQuery(
        GET_COUNTRIES_OF_CONTINENTS,
        {
            variables: { code: continent.code },
        }
    );
    const [countryList, setCountryList] = useState({countries: []});

    useEffect(() => {
        InteractionManager.runAfterInteractions(() => {
            if (data?.continent) {
                setCountryList(data.continent);
            } else if (allCountriesList) {
                setCountryList(allCountriesList);
            }
        });
    }, [allCountriesList, data]);

    const renderContinentsList = ({ item, index }: { item: IContinent, index: number }) => {
        const isSelected = item.code === continent.code;
        const handleContinentClick = () => {
            InteractionManager.runAfterInteractions(() =>
                item.code !== continent.code && setContinent({ code: item.code, name: item.name })
            );
        }
        return (
            <TouchableOpacity
                testID={'continent' + index}
                onPress={handleContinentClick}
                style={[styles.continentItem, { backgroundColor: isSelected ? "#e8f2fb" : "white" }]}
            >
                <Image source={isSelected ? selected : unselected} style={styles.radioBtn} />
                <Text style={styles.continentName}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const renderCountriesList = ({ item, index }: { item: ICountryItem, index: number }) => (
        <View style={styles.row}>
            <Text style={styles.flag}>{item.emoji}</Text>
            <View>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.continentName1}>{item.continent.name}</Text>
            </View>
        </View>
    );

    const emptyCountry = () => (
        <View>
            {continent.code !== '' && loading ? (
                <ActivityIndicator />
            ) : searchText.length > 0 ? (
                <Text>Not found results for {searchText}</Text>
            ) : (
                <Text>Select Continent</Text>
            )}
        </View>
    );

    const Seperator = () => <View style={{ marginTop: 10 }} />
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <StatusBar />
                <Seperator />
                <TextInput
                    onChangeText={(t) => {
                        setSearchText(t)
                    }}
                    value={searchText}
                    placeholder={continent.code === "" ? "Please select continent" : "Search Country here..."}
                    style={styles.searchBar} />
                <Seperator />
                <View>
                    <FlatList
                        data={continentsList}
                        keyExtractor={(_, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={{ paddingVertical: 2 }} />}
                        renderItem={renderContinentsList}
                        removeClippedSubviews={true}
                    />
                </View>
                <Seperator />
                <View>
                    {continent.code && <Text style={{ alignSelf: "center", margin: 10 }}>{`Available Countries in ${continent.name} are`}</Text>}

                    <FlatList
                        ListEmptyComponent={emptyCountry}
                        data={countryList?.countries?.filter((country: ICountryItem) => country.name.toLowerCase().includes(searchText.toLowerCase()))}
                        renderItem={renderCountriesList}
                        refreshControl={<RefreshControl
                            refreshing={loading}
                            onRefresh={refetch}
                        />}
                        initialNumToRender={15}
                        maxToRenderPerBatch={10}
                        removeClippedSubviews={true}
                        keyExtractor={(_, index) => (index + 10).toString()}
                        style={styles.countriesFlatList}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
};

export default HomeScreen

const styles = StyleSheet.create({
    container: { backgroundColor: "white", flex: 1 },
    continentItem: {
        flexDirection: "row",
        marginHorizontal: 6,
        paddingHorizontal: 6,
        borderRadius: 6,
    },
    radioBtn: {
        tintColor: "skyblue",
        height: 20,
        width: 20,
        resizeMode: "contain"
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
    searchBar: {
        width: "95%",
        borderRadius: 8,
        padding: 10,
        borderWidth: 0.5,
        alignSelf: "center"
    },
    countriesFlatList: {
        marginBottom: height * 0.4,
        marginHorizontal: 6
    }
})