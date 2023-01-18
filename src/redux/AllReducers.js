import {combineReducers} from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from 'redux-persist';

import PropertyReducer from './PropertyReducer';
import TenantReducer from './TenanantsReducer';
import OwnerReducer from './OwnersReducer';
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};
const persistConfig1 = {
    key: 'root2',
    storage: AsyncStorage,
};
const persistConfig2 = {
    key: 'root3',
    storage: AsyncStorage,
};
  
export default combineReducers({
    Tenants: persistReducer(persistConfig, TenantReducer),
    Propertys: persistReducer(persistConfig1, PropertyReducer),
    Landlord: persistReducer(persistConfig2, OwnerReducer)
})