import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React from 'react'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const AddTenant = React.lazy(() => import('./AddTenant'));
const AddRooms = React.lazy(() => import('./AddRooms'));
const AddProperty = React.lazy(() => import('./AddProperty'));
const Home = React.lazy(() => import('./Home'));
import { StackActions } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Tab = createBottomTabNavigator();
const BottomNavigationScreen = () => {
 
 
    // const [routes] = React.useState([
    //     { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'heart-outline'},
    //     { key: 'AddTenant', title: 'Add Tenant', focusedIcon: 'human-queue' },
    //     { key: 'AddRooms', title: 'AddRooms', focusedIcon: 'hoop-house' },
    //       { key: 'AddProperty', title: 'AddProperty', focusedIcon: 'warehouse' },
         
    //   ]);

  
    

  return (
    <Tab.Navigator screenOptions={{
      headerShown:false
    }}>
      <Tab.Screen name="Home" component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Icon name ="home" size={25} color="black" />
          )
            
          
        }}
      />
      <Tab.Screen name="Tenants" component={AddTenant} />
      <Tab.Screen name="Rooms" component={AddRooms} />
      <Tab.Screen name="Property" component={AddProperty} />


    </Tab.Navigator>
  )
}

export default BottomNavigationScreen

const styles = StyleSheet.create({})