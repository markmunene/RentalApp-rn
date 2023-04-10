
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
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import thunk from 'redux-thunk';
// import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';



// import {createDrawerNavigator} from '@react-navigation/drawer';
import {applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import {persistStore} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';
import { createStore } from 'redux';
import AllReducers from './src/redux/AllReducers';

import AuthScreenController from './AuthScreenController';
const Stack = createNativeStackNavigator();

const App= () => {
  let store = createStore(AllReducers, applyMiddleware(thunk))
  GoogleSignin.configure();

  // AIzaSyAfub_XIHKI_-Crv9efEMWLFvND3F8y9cI
  
 
  
  let persistor = persistStore(store)
  let theme = {
    ...DefaultTheme,
    mode: 'exact',
    dark:false
  }


  return (  
    <NavigationContainer>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor} >
    <PaperProvider theme={theme}>
      <ToastProvider>
        <AuthScreenController />
      </ToastProvider>  
    </PaperProvider>
      </PersistGate>
    </Provider>
      </NavigationContainer>
  );
};


export default App;
