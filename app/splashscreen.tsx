import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { IProps } from './types';


const SplashScreen = (props: IProps) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate("homescreen")
        }, 3000);
    }, [])
    return (
        <View style={{justifyContent:"center", alignItems:"center", flex:1}}>
            <Text>Welcome to Zeller</Text>
            <ActivityIndicator />
        </View>
    )
}

export default SplashScreen

const styles = StyleSheet.create({})