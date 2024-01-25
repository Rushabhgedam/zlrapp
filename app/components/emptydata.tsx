import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Loader from './loader';
import { IContinent } from '../types';

const EmptyCountry = ({continent, loading, searchText}:{continent:IContinent, loading: boolean, searchText: string}) => {
    
        let content;
        if (continent.code !== "" && loading) {
          content = <Loader />;
        } else if (searchText.length > 0) {
          content = <Text>Not found results for {searchText}</Text>;
        } else {
          content = <Text>Select Continent</Text>;
        }
        return <>{content}</>;
}

export default EmptyCountry

const styles = StyleSheet.create({})