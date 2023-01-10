
import React from 'react';

import {
  SafeAreaView,
  Platform ,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { ToastProvider } from 'react-native-toast-notifications'
import { Provider as PaperProvider } from 'react-native-paper';
import AddRent from './src/AddRent';
import AddTenant from './src/AddTenant';
import AddRooms from './src/AddRooms';
import AddProperty from './src/AddProperty';
import SingleTenant from './src/SingleTenant';
import PaymentsHistory from './src/PaymentsHistory';
import SingleTenantBalances from './src/SingleTenantBalances';
import Home from './src/Home';


import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

const App= () => {
  const file = require('./src/file.pdf');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  let message ="am going to be grateful for the gift of life"
  const options1 = Platform.select({
    android: {
      activityItemSources: [
        {
          // For sharing text.
          placeholderItem: { type: 'text', content: message },
          item: {
            default: { type: 'text', content: message },
            message: null, // Specify no text to share via Messages app.
          },
          linkMetadata: {
            // For showing app icon on share preview.
            title: message,
          },
        },
      ]
    }
  })


  return (  
    <PaperProvider>
      <ToastProvider>
      <NavigationContainer>
     <Stack.Navigator initialRouteName='Home'>
            <Stack.Screen name="addrent" component={AddRent} options={{ header: () => null }} />
        <Stack.Screen name="AddRooms" component={AddRooms} options={{header: () => null}} />
        <Stack.Screen name="AddTenant" component={AddTenant} options={{header: () => null}} />
            <Stack.Screen name="AddProperty" component={AddProperty} options={{ header: () => null }} />
            <Stack.Screen name="SingleTenant" component={SingleTenant} options={{ header: () => null }} />
            <Stack.Screen name="SingleTenantBalances" component={SingleTenantBalances} options={{ header: () => null }} />
            <Stack.Screen name="PaymentsHistory" component={PaymentsHistory} options={{ header: () => null }} />
        <Stack.Screen name="Home" component={Home} options={{header: () => null}} />
            
            
        
            
        
      </Stack.Navigator>
    </NavigationContainer>
       
      </ToastProvider>  
    
    </PaperProvider>
  );
};


export default App;
