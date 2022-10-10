import {StyleSheet, View} from 'react-native';
import {Basic} from 'unsplash-js/dist/methods/users/types';
import {Biography} from '../atoms/Biography';
import {ProfileImage} from '../atoms/Image';
import {Name} from '../atoms/Name';

type Props = {user: Basic};

export const ProfileContainer = ({user}: Props) => (
  <View style={styles.profileContainer}>
    <ProfileImage imageUri={user?.profile_image.medium} />
    <View style={styles.profileNameContainer}>
      <Name>{user?.name}</Name>
      <Biography>{user?.bio || 'No biography'}</Biography>
    </View>
  </View>
);

const styles = StyleSheet.create({
  profileContainer: {
    paddingTop: 123,
    flexDirection: 'row',
  },
  profileNameContainer: {
    flex: 1,
    paddingBottom: 20,
  },
});
