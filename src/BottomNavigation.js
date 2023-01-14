import { StyleSheet, Text, View , ActivityIndicator} from 'react-native'
import React from 'react'
import { BottomNavigation } from 'react-native-paper'
const AddTenant = React.lazy(() => import('./AddTenant'));
const AddRooms = React.lazy(() => import('./AddRooms'));
const AddProperty = React.lazy(() => import('./AddProperty'));
const Home = React.lazy(() => import('./Home'));

const BottomNavigationScreen = ({navigation}) => {
  
    const AddTenantRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddTenant navigation={navigation} />
        </React.Suspense>
    );
    const AddRoomsRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddRooms navigation={navigation} />
        </React.Suspense>
    );
    const HomeRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <Home navigation={navigation} />
        </React.Suspense>
    );
    const AddPropertyRoute = () => (
        <React.Suspense
          fallback={<ActivityIndicator color="#green" size="large" />}>
          <AddProperty navigation={navigation} />
        </React.Suspense>
      );
   


    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'Home', title: 'Home', focusedIcon: 'home', unfocusedIcon: 'heart-outline'},
      { key: 'AddTenant', title: 'Add Tenant', focusedIcon: 'human-queue' },
      { key: 'AddRooms', title: 'AddRooms', focusedIcon: 'hoop-house' },
        { key: 'AddProperty', title: 'AddProperty', focusedIcon: 'warehouse' },
       
    ]);
  
    const renderScene = BottomNavigation.SceneMap({
      Home: HomeRoute,
      AddTenant: AddTenantRoute,
      AddRooms: AddRoomsRoute,
      AddProperty: AddPropertyRoute,
    });

  return (
    <BottomNavigation
    navigationState={{ index, routes }}
    onIndexChange={setIndex}
    renderScene={renderScene}
  />
  )
}

export default BottomNavigationScreen

const styles = StyleSheet.create({})