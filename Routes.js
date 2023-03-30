
import React from 'react';
import AddRent from './src/AddRent';
import AddTenant from './src/AddTenant';
import AddRooms from './src/AddRooms';
import AddProperty from './src/AddProperty';
import SingleTenant from './src/SingleTenant';
import PaymentsHistory from './src/PaymentsHistory';
import SingleTenantBalances from './src/SingleTenantBalances';
import Home from './src/Home';
import Login from './src/Login';
import Register from './src/Register';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
const Stack = createNativeStackNavigator();

const Routes = () => {
    let Landlord = useSelector(state => state.Landlord.Authenticated_landlord);
  return (     
     <Stack.Navigator initialRouteName={Landlord.length == 0 ? "Login" : "Home"}>
        <Stack.Screen name="addrent" component={AddRent} options={{ header: () => null }} />
        <Stack.Screen name="AddRooms" component={AddRooms} options={{header: () => null}} />
        <Stack.Screen name="AddTenant" component={AddTenant} options={{header: () => null}} />
        <Stack.Screen name="AddProperty" component={AddProperty} options={{ header: () => null }} />
        <Stack.Screen name="SingleTenant" component={SingleTenant} options={{ header: () => null }} />
        <Stack.Screen name="SingleTenantBalances" component={SingleTenantBalances} options={{ header: () => null }} />
        <Stack.Screen name="PaymentsHistory" component={PaymentsHistory} options={{ header: () => null }} />
        <Stack.Screen name="Home" component={Home} options={{ header: () => null }} />
        <Stack.Screen name="Register" component={Register} options={{ header: () => null }} />
        <Stack.Screen name="Login" component={Login} options={{ header: () => null }} />
      </Stack.Navigator>  
  );
};


export default Routes;
