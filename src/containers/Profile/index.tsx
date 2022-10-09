import {useNavigation} from '@react-navigation/native';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {Feed} from '../../components/Feed';
import {Loader} from '../../components/loader';
import {PHOTO_DETAIL} from '../../navigation/routes';
import {RootState} from '../../store';
import {setPhotoShowed} from '../../store/photos';

export const Profile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {user, loading, photos} = useSelector((state: RootState) => state.user);
  if (loading) {
    return <Loader />;
  }

  const onPressItem = (photoId: number | string) => {
    dispatch(setPhotoShowed(photoId));
    navigation.navigate(PHOTO_DETAIL, {});
  };

  return (
    <View style={styles.container}>
      <Feed
        data={photos}
        onPress={onPressItem}
        header={() => (
          <>
            <View style={styles.profileContainer}>
              <Image
                style={styles.profileImage}
                source={{uri: user?.profile_image.medium}}
              />
              <View style={styles.profileNameContainer}>
                <Text style={styles.profileName}>{user?.name}</Text>
                <Text style={styles.profileDescription} numberOfLines={4}>
                  {user?.bio || 'No biography'}
                </Text>
              </View>
            </View>
            <View>
              <Text style={styles.title}>My Photos</Text>
            </View>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 42,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 30,
  },
  profileContainer: {
    paddingTop: 123,
    flexDirection: 'row',
  },
  profileImage: {
    width: 63,
    aspectRatio: 1 / 1,
    borderRadius: 63 / 2,
    marginRight: 8,
  },
  profileNameContainer: {
    flex: 1,
    paddingBottom: 20,
  },
  profileName: {
    fontSize: 22,
    color: 'black',
  },
  profileDescription: {
    fontSize: 12,
    color: '#030303',
  },
});
