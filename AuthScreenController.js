import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './src/Login'
import Register from './src/Register';
import Routes from './Routes';
import { useSelector } from 'react-redux'
import BottomNavigationScreen from './src/BottomNavigation';


export default function AuthScreenController() {
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
    let whichAuthScreen = useSelector(state => state.Landlord.WhichAuthScreen);
    // console.log(Landlord,whichAuthScreen);
    return (
        <>
            {Landlord.length > 0 ?
                <>
                    {/* <Routes /> */}
                    <BottomNavigationScreen/>
                    </>
                : whichAuthScreen[0] == "Login" ? <Login /> : <Register />}
        </>
  )
   
}

