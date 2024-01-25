import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

const Input = ({ searchText, setSearchText, placeholder, testID }: { searchText: string, setSearchText: Function,testID: string; placeholder: string }) => {
    return (
        <TextInput
            onChangeText={(t) => {
                setSearchText(t)
            }}
            testID={testID}
            value={searchText}
            style={[styles.searchBar]}
            placeholder={placeholder}
        />
    )
}

export default Input

const styles = StyleSheet.create({
    searchBar: { width: "95%", borderRadius: 8, padding: 10, borderWidth: 0.5, alignSelf: "center" },
})