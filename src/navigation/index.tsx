import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DiscoverPhotos} from '../containers/DiscoverPhotos';
import {PhotoDetail} from '../containers/PhotoDetail';
import {Profile} from '../containers/Profile';
import {DISCOVER_PHOTOS, PHOTO_DETAIL, PROFILE} from './routes';
import {HeaderDiscover} from './components/HeaderDiscover';
import {Text, View} from 'react-native';

const Stack = createNativeStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={DISCOVER_PHOTOS}>
        <Stack.Screen
          name={DISCOVER_PHOTOS}
          component={DiscoverPhotos}
          options={{
            title: 'Discover',
            headerShadowVisible: false,
            headerStyle: {
              backgroundColor: '#fff',
            },
            headerTitle: props => <HeaderDiscover {...props} />,
          }}
        />
        <Stack.Screen
          name={PHOTO_DETAIL}
          component={PhotoDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={PROFILE}
          component={Profile}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
