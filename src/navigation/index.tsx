import {View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {DiscoverPhotos} from '../containers/DiscoverPhotos';
import {PhotoDetail} from '../containers/PhotoDetail';
import {Profile} from '../containers/Profile';
import {DISCOVER_PHOTOS, PHOTO_DETAIL, PROFILE} from './routes';

const Stack = createNativeStackNavigator();

const HeaderDiscover = ({
  children,
  tintColor,
}: {
  children: string;
  tintColor?: string | undefined;
}) => {
  return (
    <View style={{flex: 1}}>
      <Animatable.Text
        duration={800}
        delay={500}
        animation={{
          from: {
            top: 20,
            opacity: 0,
          },
          to: {
            top: 0,
            opacity: 1,
          },
        }}
        style={{
          fontWeight: 'bold',
          textAlign: 'center',
          fontSize: 24,
          color: tintColor || '#000',
        }}>
        {children}
      </Animatable.Text>
    </View>
  );
};

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
          component={gestureHandlerRootHOC(PhotoDetail)}
          options={{
            headerShown: true,
            headerTransparent: true,
            title: '',
          }}
        />
        <Stack.Screen
          name={PROFILE}
          component={Profile}
          options={{
            headerShown: true,
            headerTransparent: true,
            title: '',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
