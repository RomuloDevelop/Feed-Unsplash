import {StyleSheet} from 'react-native';
import * as Animatable from 'react-native-animatable';

type Props = {imageUri: string};

export const ProfileImage = ({imageUri}: Props) => (
  <Animatable.Image
    animation={fadeInProfileImage}
    duration={400}
    easing="ease-out-circ"
    style={styles.profileImage}
    source={{uri: imageUri}}
  />
);

const styles = StyleSheet.create({
  profileImage: {
    width: 63,
    aspectRatio: 1 / 1,
    borderRadius: 63 / 2,
    marginRight: 8,
  },
});

const fadeInProfileImage = {
  from: {
    right: 20,
    opacity: 0,
  },
  to: {
    right: 0,
    opacity: 1,
  },
};
