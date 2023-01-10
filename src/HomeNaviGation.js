import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import AddRent from './AddRent';


const HomeNaviGation = () => {
  return (
    <NavigationContainer>
     <Stack.Navigator>
        <Stack.Screen name="addrent" component={AddRent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default HomeNaviGation

const styles = StyleSheet.create({})