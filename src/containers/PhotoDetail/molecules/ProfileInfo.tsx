import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {PROFILE_DELAY, TEXT_ANIMATION_DURATION} from '../config';

type Props = {
  activeAnimation: boolean;
  imageUri: string;
  name: string;
  onViewDetail: () => void;
};

export const ProfileInfo = ({
  activeAnimation,
  imageUri,
  name,
  onViewDetail,
}: Props) => (
  <Animatable.View
    animation={activeAnimation ? profileFadeIn : undefined}
    delay={PROFILE_DELAY}
    duration={TEXT_ANIMATION_DURATION}
    style={styles.profileContainer}>
    <Image style={styles.profileImage} source={{uri: imageUri}} />
    <View style={styles.profileNameContainer}>
      <Text style={styles.profileName}>{name}</Text>
      <TouchableOpacity onPress={onViewDetail}>
        <Text style={styles.profileActionText}>View profile</Text>
      </TouchableOpacity>
    </View>
  </Animatable.View>
);

const styles = StyleSheet.create({
  profileContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  profileImage: {
    width: 40,
    aspectRatio: 1 / 1,
    borderRadius: 37 / 2,
    marginRight: 8,
  },
  profileNameContainer: {
    flex: 1,
  },
  profileName: {
    color: 'white',
    fontSize: 14,
  },
  profileActionText: {
    fontSize: 12,
    opacity: 0.75,
    color: 'white',
    marginTop: 7,
  },
});

const profileFadeIn = {
  from: {
    top: 20,
    opacity: 0,
  },
  to: {
    top: 0,
    opacity: 1,
  },
};
