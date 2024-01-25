import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Loader from '../../components/loader';
import { IProps } from '../../types';


const SplashScreenView = (props: IProps) => {
    return (
        <View style={styles.container}>
            <Text>Welcome to Zeller</Text>
            <Loader />
        </View>
    )
}

export default SplashScreenView

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center", flex: 1
    }
})