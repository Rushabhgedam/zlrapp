import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { selected, unselected } from '../assets'

const RadioButton = ({isSelected}:{isSelected:boolean}) => {
  return (
    <Image source={isSelected ? selected : unselected} style={styles.radioBtn} />
  )
}

export default RadioButton

const styles = StyleSheet.create({
    radioBtn: {
        tintColor: "skyblue",
        height: 20,
        width: 20,
        resizeMode: "contain"
    },
})