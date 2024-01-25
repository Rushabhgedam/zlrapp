import React from 'react'
import { ActivityIndicator, StyleSheet } from 'react-native'

const Loader = (props:{}) => {
  return (
    <ActivityIndicator testID='loader' {...props} />
  )
}

export default Loader

const styles = StyleSheet.create({})