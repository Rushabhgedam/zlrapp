import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { IProps } from '../../types';
import SplashScreenView from './splash.view';

const SplashScreen = (props: IProps) => {
    useEffect(() => {
        setTimeout(() => {
            props.navigation.navigate("homescreen")
        }, 3000);
    }, [])
    return <SplashScreenView {...props} />
}

export default SplashScreen

const styles = StyleSheet.create({})